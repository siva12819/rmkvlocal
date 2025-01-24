import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  public confirmMessage: string;
  public alertMessage: string;
  public componentName: string;

  constructor(
    public _dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public _data: any,
  ) {
    _dialogRef.disableClose = true;
  }

  ngOnInit() { }

  public openAlertDialog(value: string, componentName?: string) {
    this._dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 0 }
    });
    this._dialogRef.componentInstance.alertMessage = value;
    this._dialogRef.componentInstance.componentName = componentName;
    this._dialogRef.afterClosed().subscribe(result => {
      this._dialogRef = null;
    });
  }

  public openAlertDialogWithTimeout(value: string, componentName?: string) {
    const timeout = 500;
    this._dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 0 }
    });
    this._dialogRef.componentInstance.alertMessage = value;
    this._dialogRef.componentInstance.componentName = componentName;
    this._dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        this._dialogRef.close();
      }, timeout)
    });
  }
  public openConfirmationDialog(value: string): void {
    this._dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    this._dialogRef.componentInstance.confirmMessage = value;
    this._dialogRef.afterClosed().subscribe(result => {
      this._dialogRef = null;
    });
  }

  dialogRefClose(value: boolean): void {
    this._dialogRef.close(value);
  }

}
