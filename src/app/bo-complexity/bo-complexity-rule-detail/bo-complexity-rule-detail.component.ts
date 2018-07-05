import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService, SprinterService } from '../../services';
import { BoComplexityRulesService, LogService } from '../../api';
import { BOType, BORule } from '../../model/index';
import { deletingRuleMessage, boTypeRuleDeletedMessage, savingDataMessage, boTypeRuleSavedMessage } from '../../shared/util';

@Component({
  selector: 'app-bo-complexity-rule-detail',
  templateUrl: './bo-complexity-rule-detail.component.html',
  styleUrls: ['./bo-complexity-rule-detail.component.css']
})
export class BoComplexityRuleDetailComponent implements OnInit {

  boRule: BORule;
  ruleDetailForm: FormGroup;
  isProcessing = false;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<BoComplexityRuleDetailComponent>,
    private messageService: MessageService, private sprinterService: SprinterService,
    private boComplexityRulesService: BoComplexityRulesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private logService: LogService, private router: Router
  ) {
    this.createForm(); // initialize form group.
    this.boRule = this.data.item;
  }

  ngOnInit() {
    // populate ui.
    this.poulateUI();
  }

  // initialize form group.
  createForm() {
    this.ruleDetailForm = this.fb.group({
      ruleId: -1,
      typeId: -1,
      ruleType: '',
      rule: ['', Validators.required],
    });
  }

  poulateUI(): void {
    this.resetForm(this.boRule);
  }

  // reset UI.
  resetForm(boRule: BORule) {
    this.ruleDetailForm.reset({
      ruleId: boRule.ruleId,
      typeId: boRule.typeId,
      ruleType: boRule.type,
      rule: boRule.rule,
    });
  }

  onDeleteClick(): void {

    // start processing
    this.startProcessing(deletingRuleMessage);

    this.boComplexityRulesService.deleteBOComplexityRule(this.ruleId.value)
      .subscribe(rtn => {
        this.dialogRef.close(true);
        this.stopProcessing(boTypeRuleDeletedMessage);
      },
        (err: any) => {
          // stop processing
          this.stopProcessingWithError(err);
        });
  }

  onSaveClick(): void {
    try {
      // save rule
      this.saveProcess();
    } catch (error) {
      // stop processing
      this.stopProcessingWithError(error);
      this.logService.logError(error, this.router.url, 'saveProcess');
    }
  }

  // save/update  changes in selected rule.
  saveProcess(): void {
    // start processing
    this.startProcessing(savingDataMessage);
    // const isPageValid = this.validateUI();

    // if (isPageValid) {
    this.logService.log(this.boRule, this, 'saveProcess');
    this.boRule = this.prepareBORule();
    this.boComplexityRulesService.saveBOComplexityRule(this.boRule)
      .subscribe(rtn => {
        this.dialogRef.close(true);
        // stop processing
        this.stopProcessing(boTypeRuleSavedMessage);
      },
        (err: any) => {
          // stop processing
          this.stopProcessingWithError(err);
        }
      );
    // }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  // Prepare borule object.
  prepareBORule(): BORule {
    const formModel = this.ruleDetailForm.value;

    const boRuleFromUI: BORule = {
      ruleId: formModel.ruleId,
      typeId: formModel.typeId,
      type: formModel.ruleType as string,
      rule: formModel.rule as string
    };
    return boRuleFromUI;
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
  stopProcessing(message: string) {
    this.isProcessing = false;
    // hide srpinter
    // this.sprinterService.hideSprinter();
    this.messageService.setDisplayMessage(message);
  }

  // stop processing with error
  stopProcessingWithError(err: any) {
    this.isProcessing = false;
    // hide srpinter
    // this.sprinterService.hideSprinter();
    this.messageService.setErrorMessage(err);
  }

  get ruleId() { return this.ruleDetailForm.get('ruleId'); }

  get typeId() { return this.ruleDetailForm.get('typeId'); }

  get ruleType() { return this.ruleDetailForm.get('ruleType'); }

  get rule() { return this.ruleDetailForm.get('rule'); }
}
