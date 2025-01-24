import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { LocalStorage } from '../local-storage';

@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.scss']
})
export class ReasonComponent implements OnInit {
  Reason: string = "";

  constructor(
    public _dialogRef: MatDialogRef<ReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    public _router: Router,
    public _confirmationDialog: ConfirmationDialogComponent,
    public _confirmDialogRef: MatDialogRef<ConfirmationDialogComponent>,
    public _localStorage: LocalStorage
  ) { }

  ngOnInit() {
  }

  public addReason(): any {
    if (this.beforesavevalidation()) {
      // localStorage.setItem('Reason', );
      this._dialogRef.close(this.Reason);
    }
  }

  private beforesavevalidation(): boolean {
    if ([null, undefined, ""].indexOf(this.Reason) !== -1 || !this.Reason.toString().trim()) {
      document.getElementById("remarks").focus();
      this._confirmationDialog.openAlertDialog('Enter Reason', 'Reason');
      return false;
    } else {
      return true;
    }
  }


  public dialogClosed() {
    this._dialogRef.close(null);
  }

}
