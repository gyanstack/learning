import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { MessageService } from '../../services';
import { EapruleService, LogService } from '../../api';
import { QueryBuilderConfig, Field } from '../query-builder';
import { ActivityHierarchyComponent } from '../activity-hierarchy';
import { Process, EapRule } from '../../model/index';
import { QueryBuilderConfiguration } from '../../settings/app-settings';
import {
  savingDataMessage, eapRuleSavedMessage, requiredFieldError, deletingRuleMessage, eapRuleDeletedMessage, successResponseCode,
  deleteAction, saveAction
} from '../../shared/util';

@Component({
  selector: 'app-eap-mapping-new-rules',
  templateUrl: './eap-mapping-new-rules.component.html',
  styleUrls: ['./eap-mapping-new-rules.component.css']
})
export class EapMappingNewRulesComponent implements OnInit {
  /*Class variables*/
  isProcessing = false;
  query = { condition: 'and', rules: [] };
  config: QueryBuilderConfig;
  ruleName: string; heading: string; viewMode: string;
  isFormValid = true; isRuleStarted = false; isRuleCompleted = false;
  // Activity related variables
  activityId: number; isActivityValid = true;
  activityRequiredMsg = 'Please select Activity.';
  activity = { id: this.activityId, activityName: '', isValid: this.isActivityValid, requiredMsg: this.activityRequiredMsg };

  /*Class constructor*/
  constructor(
    public dialogRef: MatDialogRef<EapMappingNewRulesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eapRuleService: EapruleService,
    private messageService: MessageService,
    private logService: LogService,
    private router: Router
  ) { }

  /*Initialize the class*/
  ngOnInit() {
    if (!this.data) {
      this.messageService.setErrorMessage('Unable to load rule.');
    } else {
      /*  Set default/saved rules definition of rule  */
      if (this.data.rule && this.data.rule.guided) { this.query = this.data.rule.guided; }
      this.activity.id = this.data.rule.activityId;
      this.logService.log('activityId is: ' + this.activity.id, this, 'ngOnInit');
      this.heading = (this.data.ruleType === 'GUIDED') ? 'GUIDED RULE' : 'ADVANCE RULE';
      this.ruleName = this.data.rule.name;
      this.viewMode = this.data.viewMode;
      this.isRuleStarted = this.data.rule.isStarted;
      this.isRuleCompleted = this.data.rule.isCompleted;

      this.config = <QueryBuilderConfig>QueryBuilderConfiguration;
      /*Get Query Config from service*/
      // this.getQueryConfig();
      // this.getQueryConfig_old();
    }
  }

  // /* Get default configuration of rules */
  // getQueryConfig(): void {
  //   const _config = this.eapRuleService.getRuleQueryConfig();
  //   this.config = <QueryBuilderConfig>_config;
  // }

  // getQueryConfig_old(): void {
  //   const obj: QueryBuilderConfig = { fields: {} };
  //   this.eapRuleService.getRuleQueryConfig_old().subscribe(config => {
  //     Object.getOwnPropertyNames(config).forEach(element => {
  //       obj.fields[element] = config[element];
  //     });
  //     this.logService.log(this.config);
  //     this.logService.log(obj);
  //   });
  // }
  /*  Rules settings ends here*/

  onActivitySelected(process: Process) {
    if (process) {
      this.activity.id = process.id;
      this.activity.activityName = process.name;
      this.activityId = process.id;
    } else {
      this.activity.id = undefined;
      this.activity.activityName = '';
      this.activityId = undefined;
    }
  }

  saveRule(ruleSet: any): void {
    // notify ui
    this.startProcessing(savingDataMessage);

    // Call function to validate the form
    this.isFormValid = this.validateForm(ruleSet);
    if (this.isFormValid) {
      const newRule = this.getRuleData(ruleSet);
      this.eapRuleService.saveRule(newRule)
        .subscribe(rtn => {
          // handle sevrice response.
          this.handleServiceResponse(rtn, saveAction);
        },
          (err: any) => {
            this.stopProcessingWithError(err, 'saveRule');
          });
    } else {
      this.stopProcessingWithError(requiredFieldError, 'saveRule');
    }
  }

  /* Get Rule data to be saved */
  getRuleData(ruleSet: any): any {
    const newRule: EapRule = {
      id: (this.data.rule.id) ? this.data.rule.id : -1,
      name: this.ruleName.trim(),
      type: 'GUIDED',
      guided: ruleSet,
      advance: '',
      activityId: this.activity.id,
      activityName: this.activity.activityName,
      isStarted: this.isRuleStarted || false,
      isCompleted: this.isRuleCompleted || false
    };
    return newRule;
  }

  /* Delete the rules based on Rule Id */
  deleteRule(rule: any): void {
    // notify ui
    this.startProcessing(deletingRuleMessage);
    if (rule && rule.id) {
      /* Delete only when type is "Guided" */
      const ruleId = rule.id;
      if (rule.type === 'GUIDED') {
        this.eapRuleService.deleteRule(ruleId)
          .subscribe(rtn => {
            // handle sevrice response.
            this.handleServiceResponse(rtn, deleteAction);
          },
            (err: any) => {
              this.stopProcessingWithError(err, 'deleteRule');
            });
      }
    } else {
      this.stopProcessingWithError('Rule\'s Id is not provided!', 'deleteRule');
    }
  }

  // handle sevrice response.
  handleServiceResponse(res: any, actionType: string): void {
    if (res.responseCode === successResponseCode) {
      switch (actionType) {
        case deleteAction:
          {
            this.logService.log(res, this, 'deleteRule');
            this.stopProcessing(eapRuleDeletedMessage);
            if (this.dialogRef) {
              this.dialogRef.close(true);
            }
          }
          break;
        case saveAction:
          {
            this.logService.log(res, this, 'saveRule');
            // notify ui
            this.stopProcessing(eapRuleSavedMessage);
            if (this.dialogRef) {
              this.dialogRef.close(true);
            }
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
    }
  }

  /* Validate Rule Save or Update*/
  validateForm(ruleSet: any): boolean {
    let isValid = true;
    /* Validate Activity selection */
    if (this.activity.id === undefined || this.activity.id <= 0) {
      this.activity.isValid = false;
    }
    if (!this.isRuleStarted && !this.isRuleCompleted) {
      isValid = false;
    }
    /* Validate Rules */
    this.setDirtyRules(ruleSet);
    /* Validate Rule name */
    if (!this.ruleName || !this.ruleName.trim()) {
      isValid = false;
      return isValid;
    }
    if (!this.isRulesValid(ruleSet)) {
      isValid = false;
      return isValid;
    }
    if (!this.activity.isValid) {
      isValid = false;
      return isValid;
    }
    return isValid;

    /* End of validate rules and rule group */
  }

  setDirtyRules(ruleSet: any): void {
    /* Start validate rules and rule group */
    if (ruleSet.rules && ruleSet.rules.length > 0) {
      for (const rule of ruleSet.rules) {
        rule.isValid = true;
        if (rule.rules) {
          this.setDirtyRules(rule);
        } else {
          if ((!rule.value || rule.value.trim() === '')) {
            rule.isValid = false;
          }
        }
      }
    }
    /* End of validate rules and rule group */
  }

  isRulesValid(ruleSet: any): boolean {
    let isValid = true;
    /* Start validate rules and rule group */
    if (ruleSet.rules && ruleSet.rules.length > 0) {
      for (const rule of ruleSet.rules) {
        if (rule.rules) {
          isValid = this.isRulesValid(rule);
          if (!isValid) {
            return isValid;
          }
        } else {
          if (!rule.isValid) {
            isValid = false;
            return isValid;
          }
        }
      }
    } else {
      isValid = false;
    }
    return isValid;
    /* End of validate rules and rule group */
  }

  closeRule(): void {
    if (this.dialogRef) {
      this.dialogRef.close(false);
    }
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
  stopProcessingWithError(err: any, method: string) {
    this.isProcessing = false;
    // hide srpinter
    // this.sprinterService.hideSprinter();
    this.messageService.setErrorMessage(err);
    this.logService.logError(err, this.router.url, method);
  }
}
