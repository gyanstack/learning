import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DialogInfo } from '../model';

@Injectable()
export class DialogService {

  private showDialogSource = new Subject<DialogInfo>();
  private afterDialogClosedSource = new Subject<any>();

  showDialog$ = this.showDialogSource.asObservable();
  afterDialogClosed$ = this.afterDialogClosedSource.asObservable();

  constructor() { }

  // set display message
  showDialogBox(dialogInfo: DialogInfo) {
    this.showDialogSource.next(dialogInfo);
  }

  // notify about dialog clode event
  dialogClosed(result: any) {
    this.afterDialogClosedSource.next(result);
  }
}
