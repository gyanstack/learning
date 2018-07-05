import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Message, MessageSource } from '../model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  snackBarIcon = 'info';
  inputData: Message;

  constructor( @Inject(MAT_SNACK_BAR_DATA) public snackInputData: Message,
    public snackbarRef: MatSnackBarRef<Message>, public dialogRef: MatDialogRef<Message>,
    @Inject(MAT_DIALOG_DATA) public dialogInputdata: Message) {
  }

  ngOnInit() {
    // initialize data
    if (this.snackInputData && this.snackInputData.source ) {
      this.inputData = this.snackInputData;
    } else if (this.dialogInputdata && this.dialogInputdata.source ) {
      this.inputData = this.dialogInputdata;
    }

    this.changeIcon();
  }

  // change notification image for different message type.
  changeIcon() {
    if (this.inputData.severity === 2) {
      this.snackBarIcon = 'warning';
    } else if (this.inputData.severity === 3) {
      this.snackBarIcon = 'error';
    } else {
      this.snackBarIcon = 'info';
    }
  }

  onOkClick(): void {
    if (this.inputData.source === MessageSource.SnackBar) {
      this.snackbarRef.dismiss();
    } else if (this.inputData.source === MessageSource.DialogBox) {
      this.dialogRef.close(true);
    }
  }

  onCancelClick(): void {
    if (this.inputData.source === MessageSource.SnackBar) {
      this.snackbarRef.dismiss();
    } else if (this.inputData.source === MessageSource.DialogBox) {
      this.dialogRef.close(false);
    }
  }
}
