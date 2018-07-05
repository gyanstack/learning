import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewChild, OnDestroy, SimpleChanges } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { ValidateNumber } from '../../shared';
import { ProcessService, LogService } from '../../api';
import { ProcessNodeService, MessageService, DialogService } from '../../services';
import { MessageComponent } from '../../message/message.component';
import { Process, ProcessInfo, Message, MessageSource, DialogInfo } from '../../model';
import { AbstractControl } from '@angular/forms/src/model';
import {
  initialChildProcess, UnsubscribeObservable, savingDataMessage, processSavedMessage,
  processDeletedMessage, deletingProcessMessage, requiredFieldError, successResponseCode, deleteAction, saveAction, defaultError,
  isProcessAndChildsHasEAPRule, processWithEAPRuleDeleteMessage, processDeleteMessage, errorItemNotFound, ConvertToNumberOrBlank,
  setControlDirty
} from '../../shared/util';

@Component({
  selector: 'app-process-hierarchy-detail',
  templateUrl: './process-hierarchy-detail.component.html',
  styleUrls: ['./process-hierarchy-detail.component.css']
})

export class ProcessHierarchyDetailComponent implements OnInit, OnDestroy {

  processDetailForm: FormGroup;
  processId: number;
  selectedProcess: ProcessInfo;
  childs: Array<Process>;
  newId = 0;
  isProcessing = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private processNodeService: ProcessNodeService,
    private messageService: MessageService,
    private processService: ProcessService,
    private logService: LogService,
    private router: Router,
    private dialogService: DialogService) {
    this.createForm(); // initialize form group.
  }

  ngOnInit(): void {
    if (this.route.params) {
      this.route.params.subscribe(
        (params: ParamMap) => {
          this.processId = +params['id']; // +params.get('id');
          this.initializeForm();
        }
      );
    }
  }

  ngOnDestroy() {
    // clear selected process from process heirarchy tree.
    this.processNodeService.resetSelectedProcessHierarchy();
  }

  // initialize form group.
  createForm() {
    const process = Object.assign({}, initialChildProcess);
    const formGroup: FormGroup = this.createFormGroup(process.id);
    this.processDetailForm = this.fb.group({
      id: process.id,
      parentId: process.parentId,
      name: [process.name, Validators.required],
      lowSLA: [process.lowSLA, [Validators.required, ValidateNumber]],
      averageSLA: [process.averageSLA, [Validators.required, ValidateNumber]],
      highSLA: [process.highSLA, [Validators.required, ValidateNumber]],
      weight: [process.weight, [Validators.required, ValidateNumber]],
      childProcesses: this.fb.array([formGroup])
    });
  }

  // populate ui for selected node.
  initializeForm() {
    const initialProcess = Object.assign({}, initialChildProcess);
    initialProcess.id = --this.newId;
    if (this.processId && this.processId > 0) {
      // get process from service.
      this.processService.getProcess(this.processId).subscribe(
        resp => {
          if (resp && resp.responseCode === successResponseCode) {
            this.selectedProcess = new ProcessInfo(resp.data);
            if (this.selectedProcess) {
              if (this.childs && this.childs.length > 0) {
                this.childs.length = 0;
              }
              if (this.selectedProcess.children) {
                this.childs = this.selectedProcess.children.filter(child => child.isActive);
              }
              this.resetForm(this.selectedProcess);
              this.setChildProcess([initialProcess as ProcessInfo], this.selectedProcess.id);
            } else if (resp && resp.responseCode === errorItemNotFound) {
              // this.resetUI(initialProcess);
              this.router.navigate(['/processhierarchy']);
            }
          }
        },
        (err: any) => {
          this.router.navigate(['/processhierarchy']);
          this.messageService.setErrorMessage(err);
        }
      );
    } else {
      this.resetUI(initialProcess);
    }

  }

  // reset ui.
  resetUI(initialProcess: Process): void {
    if (this.childs && this.childs.length > 0) {
      this.childs.length = 0;
    }
    this.selectedProcess = new ProcessInfo(initialProcess);
    this.processId = initialProcess.id;
    this.resetForm(initialProcess);
    this.setChildProcess([initialProcess as ProcessInfo], initialProcess.id);
  }

  // reset UI.
  resetForm(process: Process) {
    // const formGroup: FormGroup = this.createFormGroup(process.id);
    this.processDetailForm.reset({
      id: process.id,
      parentId: process.parentId,
      name: process.name,
      lowSLA: process.lowSLA,
      averageSLA: process.averageSLA,
      highSLA: process.highSLA,
      weight: process.weight,
      childProcesses: this.fb.array([])
    });
    // this.addProcess(0);
  }

  // add child form group in UI.
  setChildProcess(processes: ProcessInfo[], parentId: number) {

    // Don't use this code as it causes UpdateOn error.
    // const processFGs = processes.map(process => this.createFormGroup(parentId));
    // const processFormArray = this.fb.array(processFGs);
    // this.processDetailForm.setControl('childProcesses', processFormArray);

    // Workaround of above issue.Explicitly set first child proccess values.
    if (this.childProcesses.controls && this.childProcesses.controls.length > 0) {
      const childCount = this.childProcesses.controls.length;
      for (let i = childCount - 1; i > 0; i--) {
        this.childProcesses.removeAt(i);
      }
      this.childProcesses.controls[0].get('id').setValue(--this.newId);
      this.childProcesses.controls[0].get('parentId').setValue(parentId);
    }
  }

  // add new child dynamically in form builder.
  addProcess(index: number) {
    const initialProcess: Process = Object.assign({}, initialChildProcess);
    initialProcess.id = --this.newId;
    const formGroup: FormGroup = this.createFormGroup(this.selectedProcess.id);
    // this.childProcesses.insert(index + 1, formGroup);
    this.childProcesses.push(formGroup);
    this.childProcesses.markAsTouched();
  }

  // create new form group.
  createFormGroup(pId: number): FormGroup {
    return this.fb.group({
      id: --this.newId,
      parentId: pId,
      name: ['', Validators.required],
      lowSLA: ['', [Validators.required, ValidateNumber]],
      averageSLA: ['', [Validators.required, ValidateNumber]],
      highSLA: ['', [Validators.required, ValidateNumber]],
      weight: ['', [Validators.required, ValidateNumber]]
    });
  }

  // remove selected child process.
  removeProcess(index: any) {
    this.childProcesses.removeAt(index);
    this.childProcesses.markAsTouched();
  }

  // discard changes.
  cancelUI(): void {
    this.initializeForm();
  }

  // save/update  changes in selected process and add new child if any.
  saveProcess(): void {
    try {
      // start processing.
      this.startProcessing(savingDataMessage);

      // validate UI
      const isPageValid = this.validateUI();

      if (isPageValid) {
        this.saveDataToDB();
      } else {
        this.stopProcessingWithError(requiredFieldError, 'saveProcess');
      }
    } catch (error) {
      this.stopProcessingWithError(error, 'saveProcess');
    }
  }

  // validate UI.
  validateUI(): boolean {
    let isPageValid = true;
    if (!this.name.value || !this.name.value.trim()) {
      isPageValid = false;
      setControlDirty(this.name);
    }

    Object.keys(this.childProcesses.controls).forEach(field => {
      let isNameEmpty = false;
      let anyOtherFieldIsFilled = false; // set false if any one field from -highsla, lowsal, avgsla & weight are filled.

      if (!this.childProcesses.controls[field].get('name').value || !this.childProcesses.controls[field].get('name').value.trim()) {
        isNameEmpty = true;
      }
      Object.keys(this.childProcesses.controls[field].controls).forEach(key => {
        if (key === 'id' || key === 'parentId') {
          return;
        }
        if (this.childProcesses.controls[field].get(key).value) {
          anyOtherFieldIsFilled = true; // value is not empty.
        }
      });
      if (isNameEmpty && anyOtherFieldIsFilled) {
        isPageValid = false; // mark page invalid only if User has not given the process name and other field values are not blank.
        setControlDirty(this.childProcesses.controls[field].get('name'));
      }
    });

    return isPageValid;
  }

  // Prepare process object to save changes.
  prepareProcess(): Process {
    const formModel = this.processDetailForm.value;

    const children: ProcessInfo[] = this.selectedProcess.children.map(
      (process: ProcessInfo) => Object.assign({}, process));

    // deep copy of form model
    const childProcesses: ProcessInfo[] = [];
    this.processDetailForm.value.childProcesses.forEach(
      (process: ProcessInfo) => {
        const node = Object.assign({}, process) as ProcessInfo;
        // Add child only if User has given the rule name otherwise ingnore childs.
        if (node.name) {
          node.name = node.name.trim(); // trim sapce
          node.lowSLA = ConvertToNumberOrBlank(node.lowSLA);
          node.averageSLA = ConvertToNumberOrBlank(node.averageSLA);
          node.highSLA = ConvertToNumberOrBlank(node.highSLA);
          node.weight = ConvertToNumberOrBlank(node.weight);
          node.isFieldExpanded = true;
          node.isSelected = true;
          node.isActive = true;
          node.createdOn = Date.now();
          node.children = [];

          children.push(node);
          childProcesses.push(node);
          return node;
        }
      }
    );

    // Not required- as after successfull save form will initialized again.
    // this.childs = children.map((process: ProcessInfo) => Object.assign({}, process)).filter(child => child.isActive);
    const processName = formModel.name as string;
    const saveProcess: Process = {
      id: formModel.id,
      parentId: formModel.parentId,
      name: processName.trim(),
      lowSLA: ConvertToNumberOrBlank(formModel.lowSLA),
      averageSLA: ConvertToNumberOrBlank(formModel.averageSLA),
      highSLA: ConvertToNumberOrBlank(formModel.highSLA),
      weight: ConvertToNumberOrBlank(formModel.weight),
      isFieldExpanded: true,
      isSelected: true,
      isActive: true,
      isEAPRuleAssociated: false,
      children: childProcesses,
      createdOn: this.selectedProcess.createdOn
    };

    return saveProcess;
  }

  // call service to save data.
  saveDataToDB(): void {
    const process = this.prepareProcess();
    this.logService.log(process, this, 'saveDataToDB');
    // this.logService.log(JSON.stringify(process));
    this.processService.saveProcess(process)
      .subscribe(rtn => {
        this.handleServiceResponse(rtn, saveAction);
      },
        (err: any) => {
          this.stopProcessingWithError(err, 'saveProcess');
        }
      );
  }

  // delete process.
  deleteProcess(): void {
    let alertMessage = processDeleteMessage;
    if (isProcessAndChildsHasEAPRule(this.selectedProcess)) {
      alertMessage = processWithEAPRuleDeleteMessage;
    }
    const message: Message = { message: alertMessage, severity: 1, source: MessageSource.DialogBox };
    const dialogInfo: DialogInfo = { control: MessageComponent, data: message, height: 'auto', width: '400px' };

    this.dialogService.showDialogBox(dialogInfo);
    let afterDialogClosedSubscription: Subscription;
    afterDialogClosedSubscription = this.dialogService.afterDialogClosed$.subscribe(result => {
      try {
        if (result === true) {
          // delete process.
          this.deleteSelectedProcess();
        }
        // unsubcribe instance.
        UnsubscribeObservable(afterDialogClosedSubscription);
      } catch (error) {
        // unsubcribe instance.
        UnsubscribeObservable(afterDialogClosedSubscription);
        this.stopProcessingWithError(error, 'deleteProcess');
      }
    });
  }

  // handle sevrice response.
  handleServiceResponse(res: any, actionType: string): void {
    if (res.responseCode === successResponseCode) {
      switch (actionType) {
        case deleteAction:
          {
            this.logService.log(res, this, 'deleteSelectedProcess response');
            // process delete response
            this.deleteProcessResponse();
          }
          break;
        case saveAction:
          {
            this.logService.log(res, this, 'saveDataToDB');
            // process save response
            this.saveProcessResponse(res);
          }
          break;

        default:
          {
            this.stopProcessing();
          }
          break;
      }
    } else if (res.errors && res.errors.length > 0) {
      this.stopProcessingWithError(res.errors[0], 'handleServiceResponse');
    } else {
      this.stopProcessingWithError(null, 'handleServiceResponse');
    }
  }

  // delete process.
  deleteSelectedProcess(): void {
    // notify ui about progress.
    this.startProcessing(deletingProcessMessage);

    this.processService.deleteProcess(this.selectedProcess.id)
      .subscribe(rtn => {
        this.handleServiceResponse(rtn, deleteAction);
      },
        (err: any) => {
          this.stopProcessingWithError(err, 'deleteProcess');
        });
  }

  // process save response
  saveProcessResponse(res: any): void {
    this.stopProcessing(processSavedMessage);
    // let processId = -99999; // fallback id.
    if (res && res.data) {
      this.processNodeService.refreshProcessHierarchy(res.data);
      this.initializeForm();
    }
  }

  // process delete response
  deleteProcessResponse(): void {
    this.stopProcessing(processDeletedMessage);
    this.processId = this.selectedProcess.parentId;
    const deletedProcess: ProcessInfo = new ProcessInfo();
    if (this.selectedProcess && this.selectedProcess.parentId > 0) {
      this.router.navigate([`/processhierarchy/${this.selectedProcess.parentId}`]);
    } else {
      this.router.navigate([`/processhierarchy`]);
    }
    this.processNodeService.deleteProcessHierarchy(this.selectedProcess);
    this.initializeForm();
  }

  // start processing
  startProcessing(message: string) {
    this.isProcessing = true;
    // show srpinter
    // this.sprinterService.showSprinter();
    // notify ui about progress.
    this.messageService.setProgressMessage(message);
  }

  // stop processing
  stopProcessing(message?: string) {
    this.isProcessing = false;
    // hide srpinter
    // this.sprinterService.hideSprinter()
    if (message) {
      this.messageService.setDisplayMessage(message);
    } else {
      this.messageService.hideMessageNotification();
    }
  }

  // stop processing with error
  stopProcessingWithError(err?: any, method?: string) {
    if (!err) {
      err = defaultError;
    }
    this.isProcessing = false;
    // hide srpinter
    // this.sprinterService.hideSprinter();
    this.messageService.setErrorMessage(err);
    this.logService.logError(err, this.router.url, method);
  }

  get childProcesses(): FormArray {
    return this.processDetailForm.get('childProcesses') as FormArray;
  }

  get id() { return this.processDetailForm.get('id'); }

  get parentId() { return this.processDetailForm.get('parentId'); }

  get name() { return this.processDetailForm.get('name'); }

  get lowSLA() { return this.processDetailForm.get('lowSLA'); }

  get averageSLA() { return this.processDetailForm.get('averageSLA'); }

  get highSLA() { return this.processDetailForm.get('highSLA'); }

  get weight() { return this.processDetailForm.get('weight'); }
}
