import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { HttpErrorResponse } from '@angular/common/http';

import { PageEvent } from '@angular/material';

import { EapRule } from '../model/eaprule';
import { EapruleService } from '../api/eaprule.service';
import { EapMappingNewRulesComponent } from './eap-mapping-new-rules';
import { EapMappingAdvanceRulesComponent } from './eap-mapping-advance-rules';
import { ActivityHierarchyComponent } from './activity-hierarchy';
import { DialogService, MessageService, SprinterService } from '../services';
import { DialogInfo } from '../model';
import { UnsubscribeObservable, fetchingRuleMessage } from '../shared/util';
import { LogService } from '../api';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-eap-mapping-rules',
  templateUrl: './eap-mapping-rules.component.html',
  styleUrls: ['./eap-mapping-rules.component.css']
})

export class EapMappingRulesComponent implements OnInit {
  eapRuleForm: FormGroup;
  initialRuleSet: any;
  /*Class variables*/
  rules: EapRule[];
  pageRules: EapRule[];
  ruleBoxHeight: number = window.innerHeight - 354;
  pageIndex = 0;
  pageSize = 10;


  /*Class constructor*/
  constructor(
    private eapRuleService: EapruleService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private logService: LogService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.eapRuleForm.controls['search'].valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(searchTxt => {
        if (searchTxt.length > 0) {
          this.searchRule(searchTxt);
        } else if (searchTxt === '') {
          this.rules = [];
          this.initialRuleSet.forEach(rule => {
            this.rules.push(rule);
          });
          this.setPaginatedRules(this.pageIndex, this.pageSize);
        }
      });
  }

  /*Initialize the class*/
  ngOnInit() {
    this.paginateRules(this.pageIndex, this.pageSize);
  }

  createForm() {
    this.eapRuleForm = this.fb.group({
      search: ['']
    });
  }

  searchRule(searchText: string) {
    const ruleSet = this.initialRuleSet as EapRule[];
    this.rules = [];
    this.initialRuleSet.forEach(rule => {
      if (rule.name.toLowerCase().search(searchText.toLowerCase()) !== -1) {
        this.rules.push(rule);
      }
    });
    this.setPaginatedRules(this.pageIndex, this.pageSize);
  }

  /*Get Rule list using service*/
  paginateRules(pageIndex: number, pageSize: number): void {
    // this.startProcessing(FetchingRuleMessage);
    this.rules = [];
    this.eapRuleService.getEapRules().subscribe(
      data => {
        if (data) {
          this.initialRuleSet = data;
          const searchText = this.search.value;
          data.forEach(rule => {
            if (searchText !== '') {
              if (rule.name.toLowerCase().search(searchText.toLowerCase()) !== -1) {
                this.rules.push(rule);
              }
            } else {
              this.rules.push(rule);
            }
          });
          // set pagination
          this.setPaginatedRules(pageIndex, pageSize);
        } else {
          this.pageRules = [];
        }
      },
      (err: any) => {
        this.stopProcessingWithError(err, 'paginateRules');
      }
    );
  }

  setPaginatedRules(pageIndex: number, pageSize: number, searchText?: string) {
    const startIndex = pageIndex * pageSize;
    const endtIndex = (pageIndex * pageSize) + pageSize;
    if (this.rules && this.rules.length > 0) {
      this.pageRules = this.rules.slice(startIndex, endtIndex);
    } else {
      this.pageRules = [];
    }
  }

  /*Open new view of Guided rule*/
  openNewGuidedRule() {
    const option = { ruleType: 'GUIDED', viewMode: 'NEW', rule: {} };
    this.openRuleDialog(option);
  }
  /*Open rules(Guided or Advance) in edit/detail view */
  openRule(_rule: EapRule) {
    this.startProcessing(fetchingRuleMessage);
    this.eapRuleService.getEapRule(_rule.id).subscribe(
      data => {
        if (data) {
          const currentRule = data;
          const option = { ruleType: _rule.type, viewMode: 'EDIT', rule: currentRule };
          this.openRuleDialog(option);
          this.stopProcessing();
        }
      },
      (err: any) => {
        this.stopProcessingWithError(err, 'openRule');
      }
    );
  }

  /*  Common class to open rule view in a dialog */
  openRuleDialog(optionData: any) {
    if (!optionData) {
      return;
    }
    const ruleType = optionData.ruleType;
    let dialogInfo: DialogInfo;
    if (ruleType === 'GUIDED') {
      // Open dialog for Guided rule
      dialogInfo = { control: EapMappingNewRulesComponent, data: optionData, height: '90%', width: '95%' };
    } else {
      // Open dialog for Advance rule
      dialogInfo = { control: EapMappingAdvanceRulesComponent, data: optionData, height: '70%', width: '95%' };
    }
    this.dialogService.showDialogBox(dialogInfo);
    let afterDialogClosedSubscription: Subscription;
    afterDialogClosedSubscription = this.dialogService.afterDialogClosed$.subscribe(result => {
      try {
        // unsubcribe instance.
        UnsubscribeObservable(afterDialogClosedSubscription);

        if (result) {
          // re-populate rules.
          this.paginateRules(this.pageIndex, this.pageSize);
        }
      } catch (error) {
        // unsubcribe instance.
        UnsubscribeObservable(afterDialogClosedSubscription);

        this.stopProcessingWithError(error, 'deleteProcess');
      }
    });

    // // Open dialog for Guided rule
    // if (ruleType === 'GUIDED') {
    //   const options = {
    //     height: '90%',
    //     width: '95%',
    //     data: optionData
    //   };
    //   const dialogRef = this.dialog.open(EapMappingNewRulesComponent, options);
    //   /*  Capture the dialog close event */
    //   dialogRef.afterClosed().subscribe(result => {
    //     this.logService.log(`Dialog result: ${result}`);
    //   });
    // } else {// Open dialog for Advance rule
    //   const options = {
    //     height: '70%',
    //     width: '95%',
    //     data: optionData
    //   };
    //   const dialogRef = this.dialog.open(EapMappingAdvanceRulesComponent, options);
    //   /*  Capture the dialog close event */
    //   dialogRef.afterClosed().subscribe(result => {
    //     this.logService.log(`Dialog result: ${result}`);
    //   });
    // }
  }
  /*  New rule dialog ends here */

  setPaginator(event?: PageEvent): PageEvent {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize; // set pagesize
    this.setPaginatedRules(event.pageIndex, event.pageSize);

    return event;
  }

  // start processing
  startProcessing(message: string) {
    // show srpinter
    // this.sprinterService.showSprinter();
    // notify ui about progress.
    this.messageService.setProgressMessage(message);
  }

  // stop processing
  stopProcessing() {
    // hide srpinter
    // this.sprinterService.hideSprinter();
    this.messageService.hideMessageNotification();
  }

  // stop processing with error
  stopProcessingWithError(err: any, method: string) {
    // hide srpinter
    // this.sprinterService.hideSprinter();
    this.messageService.setErrorMessage(err);
    this.logService.logError(err, this.router.url, method);
  }

  get search() { return this.eapRuleForm.get('search'); }
}

