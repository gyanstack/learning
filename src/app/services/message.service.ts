import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Process } from '../model';
import { defaultError } from '../shared/util';

@Injectable()
export class MessageService {

  constructor() { }

  private displayMessageSource = new Subject<string>();
  private progressMessageSource = new Subject<string>();
  private errorMessageSource = new Subject<string>();
  private warningMessageSource = new Subject<string>();
  private hideMessageSource = new Subject();

  displayMessage$ = this.displayMessageSource.asObservable();
  progressMessage$ = this.progressMessageSource.asObservable();
  errorMessage$ = this.errorMessageSource.asObservable();
  warningMessage$ = this.warningMessageSource.asObservable();
  hideMessage$ = this.hideMessageSource.asObservable();

  // set display message
  setDisplayMessage(message: string) {
    this.displayMessageSource.next(message);
  }

  // set progress message
  setProgressMessage(message: string) {
    this.progressMessageSource.next(message);
  }

  // set error message
  setErrorMessage(error?: any) {
    if (typeof error === 'string') {
      this.errorMessageSource.next(error);
    } else if (error && error.error && error.error.message) {
      this.errorMessageSource.next(error.error.message);
    } else {
      this.errorMessageSource.next(defaultError);
    }
  }

  // set warning message
  setWarningMessage(message: string) {
    this.warningMessageSource.next(message);
  }

  // hide snackbar
  hideMessageNotification() {
    this.hideMessageSource.next();
  }
}
