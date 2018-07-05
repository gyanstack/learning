import { Subscription } from 'rxjs/Subscription';

import { SprinterService } from '../services';
import { Process, } from '../model';
import { AbstractControl } from '@angular/forms';

export const successResponseCode = 200;
export const errorResponseCode = 400;
export const errorResponseCodeForLinkedRule = 401;
export const errorItemNotFound = 404;

export const fileSizeLimit = 5242880;
export const uiNotificationClosingSeconds = 3000;

export const deleteAction = 'Delete';
export const saveAction = 'Save';
export const boTypeDeal = 'Deal';
export const boTypeLoan = 'Loan';
export const defaultStringValue = '';
export const defaultNumberValue = 0;

export enum InputType {
    String,
    Number
}

export const fetchingRuleMessage = 'Fetching rule';
export const fetchingDataMessage = 'Fetching data';
export const resetChangesMessage = 'Resetting Changes';

export const savingDataMessage = 'Saving data';
export const deletingRuleMessage = 'Deleting rule';
export const deletingProcessMessage = 'Deleting process';
export const deletingCodeMessage = 'Deleting code';
export const savingCodesMessage = 'Saving codes';

export const eapRuleSavedMessage = 'EAP rule is saved successfully !';
export const boTypeRuleSavedMessage = 'Complexity rule is saved successfully !';
export const processSavedMessage = 'Process is saved successfully !';
export const codesSavedMessage = 'Codes has been saved successfully !';
export const codesValidationMessage = 'Please fill valid data in highlighted fields !';

export const eapRuleDeletedMessage = 'EAP rule is deleted successfully !';
export const boTypeRuleDeletedMessage = 'Complexity rule is deleted successfully !';
export const processDeletedMessage = 'Process is deleted successfully !';
export const codeDeletedMessage = 'Code deleted !';
export const processDeleteMessage = 'Are you sure you want to delete this item?';

// tslint:disable-next-line:max-line-length
export const processWithEAPRuleDeleteMessage = `Rule(s) exist for this item or subsequent childs. Deleting this would remove all defined rule(s).
 Are you sure you want to remove this item ?`;

export const fileSizeError = 'File size can not be greater than 5 mb.';
export const selectCodeError = 'Unable to select code';
export const requiredFieldError = 'Please fill required field.';
export const defaultError = 'Please contact your administrator';


export const CALENDER_FORMATS = {
    parse: {
        dateInput: 'MMMM YYYY',
    },
    display: {
        dateInput: 'MMMM YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

export const initialChildProcess: Process = {
    id: 0,
    parentId: null,
    name: '',
    lowSLA: null,
    averageSLA: null,
    highSLA: null,
    weight: null,
    children: [],
    isFieldExpanded: false,
    isSelected: false,
    isActive: true,
    isEAPRuleAssociated: false,
    createdOn: Date.now(),
};

export enum fileTransactionType {
    MANUAL_TRANSACTION = 'MANUAL_TRANSACTION',
    NON_TRANSACTION = 'NON_TRANSACTION',
    BUSINESS_BANKING_TRANSACTION = 'BUSINESS_BANKING_TRANSACTION'
}

export function UnsubscribeObservable(observble: Subscription): void {
    if (observble) {
        observble.unsubscribe();
    }
}

export function isProcessAndChildsHasEAPRule(process: Process): boolean {
    let isEAPRuleExists = false;

    if (process.isEAPRuleAssociated) {
        isEAPRuleExists = true;
    } else if (process.children && process.children.length > 0) {
        process.children.forEach(child => {
            if (child.isEAPRuleAssociated) {
                isEAPRuleExists = child.isEAPRuleAssociated;
                return;
            } else if (child.children && child.children.length > 0) {
                isEAPRuleExists = isProcessAndChildsHasEAPRule(child);
                return;
            }
        });
    }

    return isEAPRuleExists;
}

export function ConvertToNumberOrBlank(val: any): any {
    let returnVal: any;
    const numVal = Number(val); // convert text to number
    if (numVal.toString() === NaN.toString()) {
        returnVal = '';
    } else {
        returnVal = val;
    }
    return returnVal;
}

// set control as dirty.
export function setControlDirty(control: AbstractControl, isNotNumber?: boolean): void {
    if (control) {
        control.updateValueAndValidity();
        control.markAsDirty();
        if (isNotNumber) {
            control.setErrors({ 'NotNumber': true });
        }
        // control.markAsTouched();
        // control.setErrors({ 'InvalidRange': true });
    }
}
