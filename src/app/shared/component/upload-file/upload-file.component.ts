import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FileInfo, ServiceError } from '../../../model';
import * as _moment from 'moment';
import { EventsUploadService } from '../../../api/events-upload.service';
import { LogService } from '../../../api/log.service';
import { MessageService, SprinterService } from '../../../services';
import { Router } from '@angular/router';
import {
  savingDataMessage, CALENDER_FORMATS,
  fileTransactionType, successResponseCode, defaultError, fileSizeError, fileSizeLimit
} from '../../util';
import { PageEvent, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
const moment = _moment;

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  @Input()
  public fileUploadForm: FormGroup;

  @Input()
  public enableTransactionDate: boolean;

  @Input()
  public fileType: fileTransactionType;

  isProcessing = false;
  fileInfo: FileInfo;
  serviceErrors: ServiceError;
  errors: string[];
  pageIndex = 0;
  pageSize = 10;
  @ViewChild('fileInput') fileInput: ElementRef;

  lastDayOfMonthFilter(d: Date): boolean {
    const lDay = +moment(d).endOf('month').format('D');
    const cDay = +moment(d).format('D');
    // Prevent Saturday and Sunday from being selected.
    return lDay === cDay;
  }

  constructor(private fb: FormBuilder, private eventsUploadService: EventsUploadService, private logService: LogService,
    private messageService: MessageService, private sprinterService: SprinterService, private router: Router) {

  }

  ngOnInit() {
    this.transactionDate.setValue(moment(new Date()).endOf('month'));
    this.serviceErrors = { id: 1, errors: [] };
  }

  onFileChange(event) {
    // reset ui after select any new file.
    this.resetFileUploadMessage();

    // const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.avatar.setValue(file);
      this.fileInfo = { name: '', fileObject: null, transactionDate: '' };
      this.fileInfo.name = file.name;
      this.fileInfo.fileObject = file;
    }
  }

  // submit file.
  onSubmit() {
    try {
      if (this.fileInfo.fileObject.size > fileSizeLimit) {
        this.messageService.setErrorMessage(fileSizeError);
      } else {
        // post data.
        this.submitData();
      }
    } catch (error) {
    }
  }

  // submit data to service
  submitData() {
    // start processing
    this.startProcessing(savingDataMessage);

    if (!this.fileInfo || !this.fileInfo.fileObject) {
      this.messageService.setErrorMessage('No file is selected for upload !');
      return;
    }

    if (!this.fileType) {
      this.messageService.setErrorMessage('Unable to intialize service !');
      return;
    }

    const formData = new FormData();
    // formData.append('name', this.fileInfo.name);
    formData.append('file', this.fileInfo.fileObject);
    formData.append('date', moment(this.transactionDate.value).format('MM/DD/YYYY'));

    this.eventsUploadService.uploadEvents(formData, this.fileType).subscribe(res => {
      this.handleServiceResponse(res, this.fileInfo.name);
    },
      (err: any) => {
        // stop processing
        this.stopProcessingWithError(err, 'submitData');
      }
    );
  }

  // handle sevrice response.
  handleServiceResponse(res: any, fileName: string): void {
    this.serviceErrors = { id: 1, errors: [] }; // reset service errors.
    if (res.responseCode === successResponseCode) {
      this.clearFile();
      this.isFileUploaded.setValue(true);
      this.stopProcessing();
      this.fileUploadedMessage.setValue(`File name ${fileName} has been uploaded successfully !`);
    } else {
      this.isFileUploaded.setValue(false);
      this.fileUploadedMessage.setValue(`File name ${fileName} has not been uploaded successfully !`);
      if (!res.errors || res.errors.length === 0) {
        this.stopProcessingWithError(defaultError, 'submitData');
      } else {
        res.errors.forEach(error => {
          this.serviceErrors.errors.push(`${error}`);
        });
        // set pagination
        this.setPaginatedErrors(this.pageIndex, this.pageSize);
        this.stopProcessing();
      }
    }
  }

  // reset ui.
  resetUI() {
    this.clearFile();
    this.resetFileUploadMessage();
  }

  // reset file uploaad message.
  resetFileUploadMessage() {
    this.fileUploadedMessage.setValue('');
    this.isFileUploaded.setValue(null);
    this.serviceErrors = { id: 1, errors: [] };
    this.errors = [];
  }

  // clear file from ui.
  clearFile() {
    this.avatar.setValue(null);
    this.fileInput.nativeElement.value = '';
    this.fileInfo = { name: '', fileObject: null, transactionDate: '' };
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
    // this.sprinterService.hideSprinter();
    if (!message) {
      this.messageService.hideMessageNotification();
    } else {
      this.messageService.setDisplayMessage(message);
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

  setPaginator(event?: PageEvent): PageEvent {
    this.pageSize = event.pageSize; // set pagesize
    this.setPaginatedErrors(event.pageIndex, event.pageSize);

    return event;
  }

  setPaginatedErrors(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endtIndex = (pageIndex * pageSize) + pageSize;
    if (this.serviceErrors && this.serviceErrors.errors) {
      this.errors = this.serviceErrors.errors.slice(startIndex, endtIndex);
    } else {
      this.errors = [];
    }
  }

  get avatar() { return this.fileUploadForm.get('avatar'); }

  get fileUploadedMessage() { return this.fileUploadForm.get('fileUploadedMessage'); }

  get transactionDate() { return this.fileUploadForm.get('transactionDate'); }

  get isFileUploaded() { return this.fileUploadForm.get('isFileUploaded'); }
}
