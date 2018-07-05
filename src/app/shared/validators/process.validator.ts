import { AbstractControl, FormGroup, FormControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';


// export function ValidateNumber(): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } => {
//         if(!control || !control.value)
//             return null;
//         const isNotNumber = Number.isNaN(control.value);
//         this.logService.log("test value " + control.value);
//         return isNotNumber ? { 'NotNumber': { value: control.value } } : null;
//     };
// }

// vaildate value for valid number.
export function ValidateNumber(control: AbstractControl): { [key: string]: any } {
    const isNotNumber = Number(control.value); // convert text to number
    if (isNotNumber.toString() === NaN.toString()) {
        return {
            'NotNumber': { value: control.value }
        };
    }
    return null;
}

// export function ValidateNumber(): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } => {
//         const text = control.value;
//         const isNotNumber = Number(control.value);
//         if (isNotNumber.toString() == NaN.toString()) {
//             return {
//                 'NotNumber': { value: control.value }
//             }
//         }
//         return null;
//     };
// }
