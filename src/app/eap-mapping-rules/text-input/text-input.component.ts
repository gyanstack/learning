import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteModule, MatInputModule } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { EapruleService } from '../../api';
import { MessageService } from '../../services';
import { fetchingRuleMessage } from '../../shared/util';


@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {

  ruleText: string;
  ruleDetailForm: FormGroup;
  searchResult = [];
  selected: boolean;
  showPrevious: boolean;
  showNext: boolean;
  recordCount: 0;
  pageIndex = 0;
  pageSize = 10;
  showButton: boolean;
  toolTipPosition = 'right';
  minSearchTextLength = 2;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TextInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eapRuleService: EapruleService,
    private messageService: MessageService
  ) {
    this.createForm(); // initialize form group.
    this.ruleText = this.data.value;

    this.ruleDetailForm.controls['search'].valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(searchTxt => {
        if (searchTxt.length > this.minSearchTextLength) {
          this.pageIndex = 0;
          this.getPaginatedRecords();
        }
      });
  }

  ngOnInit() {
    this.poulateUI();
  }

  fetchNextRecords() {
    this.pageIndex++;
    this.getPaginatedRecords();
  }

  fetchPreviousRecords() {
    this.pageIndex--;
    this.getPaginatedRecords();
  }

  getPaginatedRecords() {
    this.startProcessing(fetchingRuleMessage);
    let startIndex = this.pageIndex * this.pageSize;
    const endIndex = (this.pageIndex * this.pageSize) + this.pageSize;
    if (this.pageIndex > 0) {
      startIndex++;
    }
    this.getRuleValue(startIndex, endIndex, this.search.value);
  }

  getRuleValue(startIndex: number, endIndex: number, searchTxt: string) {
    this.eapRuleService.getRuleValue(this.data.field, searchTxt, startIndex, endIndex).subscribe((result) => {
      this.searchResult = result.data;
      this.recordCount = result.count;
      this.updatePagination();
      this.stopProcessing();
    },
      (err: any) => {
        this.stopProcessingWithError(err, 'openRule');
      });
  }

  updatePagination() {
    this.showPrevious = this.pageIndex > 0;
    this.showNext = this.pageIndex === 0
      ? this.recordCount > this.pageSize
      : this.pageIndex < +(this.recordCount / this.pageSize).toFixed();
  }

  updateRule(rule: any) {
    this.selected = true;
    this.rule.setValue(rule);
    this.ruleText = rule;
    this.ruleDetailForm.markAsPristine();
  }

  // initialize form group.
  createForm() {
    this.ruleDetailForm = this.fb.group({
      rule: ['', Validators.required],
      search: ['']
    });
  }

  poulateUI(): void {
    this.resetForm(this.ruleText);
  }

  // reset UI.
  resetForm(ruleText: string) {
    this.ruleDetailForm.reset({
      rule: ruleText,
      search: ruleText
    });
    this.showButton = true;
  }

  onUpdateClick(): void {
    this.dialogRef.close(this.rule.value);
  }

  // close dialog.
  onCancelClick(): void {
    this.ruleText = this.data.value;
    this.dialogRef.close(this.ruleText);
  }

  // clear text.
  onClearClick(): void {
    this.rule.setValue('');
    this.search.setValue('');
    this.searchResult = [];
    this.recordCount = 0;
  }

  startProcessing(message: string) {
    this.showButton = false;
    this.messageService.setProgressMessage(message);
  }

  // stop processing
  stopProcessing() {
    this.showButton = true;
    this.messageService.hideMessageNotification();
  }

  // stop processing with error
  stopProcessingWithError(err: any, method: string) {
    this.showButton = true;
    this.messageService.setErrorMessage(err);
  }

  get rule() { return this.ruleDetailForm.get('rule'); }
  get search() { return this.ruleDetailForm.get('search'); }
}
