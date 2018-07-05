import { Component, OnInit } from '@angular/core';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { NgZone, Renderer, ElementRef, ViewChild } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material';

import { MessageComponent } from './message/message.component';
import { MessageService, DialogService, SprinterService } from './services';
import { Message, MessageSource, DialogInfo } from './model';
import { uiNotificationClosingSeconds } from './shared/util';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  snackBarRef: MatSnackBarRef<MessageComponent>;
  @ViewChild('spinnerElement')
  spinnerElement: ElementRef;

  constructor(public snackBar: MatSnackBar,
    private messageService: MessageService,
    private dialogService: DialogService,
    private sprinterService: SprinterService,
    private dialog: MatDialog,
    private router: Router,
    private ngZone: NgZone,
    private renderer: Renderer) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }


  ngOnInit(): void {
    // register for UI snackbar notification
    this.registerForUINotification();

    // register for dialog notification
    this.registerForDialogNotification();

    // register for hide/show sprinter
    this.registerForSprinterNotification();
  }

  // register for UI notification
  registerForUINotification() {

    // register to notify message to user.
    this.messageService.displayMessage$.subscribe(
      message => {
        this.notifyUI(message);
      }
    );

    // register to display message about processing progress.
    this.messageService.progressMessage$.subscribe(
      message => {
        this.showProgressMessage(message);
      }
    );

    // register to display error message .
    this.messageService.errorMessage$.subscribe(
      message => {
        this.showErrorMessage(message);
      }
    );

    // register to hide message .
    this.messageService.hideMessage$.subscribe(
      message => {
        this.hideMessageNotification();
      }
    );
  }

  // register for dialog notification
  registerForDialogNotification() {
    this.dialogService.showDialog$.subscribe(
      dialogInfo => {
        this.openDialog(dialogInfo);
      }
    );
  }

  // open dialog ui.
  openDialog(dialogInfo: DialogInfo) {
    const dialogRef = this.dialog.open(dialogInfo.control, {
      width: dialogInfo.width,
      height: dialogInfo.height,
      data: dialogInfo.data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      // notify caller about closed dialog
      this.dialogService.dialogClosed(result);
    });
  }

  // set message for UI notification.
  notifyUI(displayMessage: string) {
    // Close other instances of sanckbar, If any.
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }

    const message: Message = { message: displayMessage, severity: 1, source: MessageSource.SnackBar };
    this.snackBar.openFromComponent(MessageComponent, {
      data: message,
      duration: uiNotificationClosingSeconds,
      extraClasses: 'infoSnackBar'
    });
  }

  // set process progress for UI notification.
  // NEVER INVOKE/OPEN SNACKBAR in INIT as it will cause error :- ExpressionChangedAfterItHasBeenCheckedError: Expression has
  // changed after it was checked.Previous value: 'ng-valid: true'. Current value: 'ng-valid: false'.
  showProgressMessage(displayMessage: string) {
    // Close other instances of sanckbar, If any.
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }

    const message: Message = { message: displayMessage, severity: 0, source: MessageSource.SnackBar };
    this.snackBarRef = this.snackBar.openFromComponent(MessageComponent, {
      data: message,
      extraClasses: 'progressSnackBar'
    });
  }

  // set warning message.
  showWarningMessage(warningMessage: string) {
    // Close other instances of sanckbar, If any.
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }

    const message: Message = { message: warningMessage, severity: 2, source: MessageSource.SnackBar };
    this.snackBarRef = this.snackBar.openFromComponent(MessageComponent, {
      data: message,
      duration: uiNotificationClosingSeconds,
      extraClasses: 'warnSnackBar',
      verticalPosition: 'top'
    });
  }

  // set error message.
  showErrorMessage(errorMessage: string) {
    // Close other instances of sanckbar, If any.
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }

    const message: Message = { message: errorMessage, severity: 3, source: MessageSource.SnackBar };
    this.snackBarRef = this.snackBar.openFromComponent(MessageComponent, {
      data: message,
      duration: uiNotificationClosingSeconds,
      extraClasses: 'errorSnackBar',
      verticalPosition: 'top'
    });
  }

  // set error message.
  hideMessageNotification() {
    // Close other instances of sanckbar, If any.
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }

  registerForSprinterNotification(): any {

    // register to notify ui to show sprinter.
    this.sprinterService.showSprinter$.subscribe(
      message => {
        this.showSpinner();
      }
    );

    // register to notify ui to hide sprinter.
    this.sprinterService.hideSprinter$.subscribe(
      message => {
        this.hideSpinner();
      }
    );

  }


  // Shows and hides the loading spinner during RouterEvent changes
  private navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showSpinner();
    }
    if (event instanceof NavigationEnd) {
      this.hideSpinner();
    }
    // Set loading state to false in both of the below events to
    // hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.hideSpinner();
    }
    if (event instanceof NavigationError) {
      this.hideSpinner();
    }
  }

  private hideSpinner(): void {
    // We wanna run this function outside of Angular's zone to
    // bypass change detection,
    this.ngZone.runOutsideAngular(() => {
      // For simplicity we are going to turn opacity on / off
      // you could add/remove a class for more advanced styling
      // and enter/leave animation of the spinner
      this.renderer.setElementStyle(
        this.spinnerElement.nativeElement,
        'opacity',
        '0'
      );
    });
  }

  private showSpinner(): void {
    // We wanna run this function outside of Angular's zone to
    // bypass change detection,
    this.ngZone.runOutsideAngular(() => {
      // For simplicity we are going to turn opacity on / off
      // you could add/remove a class for more advanced styling
      // and enter/leave animation of the spinner
      this.renderer.setElementStyle(
        this.spinnerElement.nativeElement,
        'opacity',
        '1'
      );
    });
  }
}
