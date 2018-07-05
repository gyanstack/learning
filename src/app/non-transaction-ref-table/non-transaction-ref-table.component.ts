import { Component, ElementRef, ViewChild, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { CALENDER_FORMATS, fileTransactionType } from '../shared/util';

const moment = _moment;

@Component({
  selector: 'app-non-transaction-ref-table',
  templateUrl: './non-transaction-ref-table.component.html',
  styleUrls: ['./non-transaction-ref-table.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: CALENDER_FORMATS },
  ]
})
export class NonTransactionRefTableComponent implements AfterViewChecked {
  form: FormGroup;
  fileType = fileTransactionType.NON_TRANSACTION;

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    this.createForm();
  }

  ngAfterViewChecked() {
    // FIX for following error :- ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    // Previous value: 'ng-valid: true'. Current value: 'ng-valid: false'.
    this.cdRef.detectChanges();
  }

  createForm() {
    this.form = this.fb.group({
      fileUploadForm: this.fb.group({
        transactionDate: [new FormControl(moment()), Validators.required],
        avatar: null,
        fileUploadedMessage: '',
        isFileUploaded: null
      })
    });
  }
}
