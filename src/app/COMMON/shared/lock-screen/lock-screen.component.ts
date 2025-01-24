import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../services/common/common.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { LocalStorage } from '../local-storage';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent implements OnInit {

  model: any = [];
  userName: string = "";

  constructor(public thisDialogRef: MatDialogRef<LockScreenComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _localStorage : LocalStorage,
  private _confirmationDialogComponent : ConfirmationDialogComponent,
  public _commonService: CommonService) {
    this._localStorage.setLockStatus(true);
    thisDialogRef.disableClose = true;
    this.userName = this._localStorage.getLoggedUserName();
  }

  checkforunlock() {
    debugger
    let usr: UserLogin = new UserLogin();
    usr.User_Name = this.model.username;
    usr.Password = this.model.Password;
  }

  private validate():boolean{
    if (this.model.username === undefined || this.model.username.trim() === '') {
      this.model.username = '';
      document.getElementById('usr').focus();
      this._confirmationDialogComponent.openAlertDialog("Enter User Name", "Lock Screen");
      return false;
    }
    else if (this.model.username.trim() !== this.userName.trim()){
      this._confirmationDialogComponent.openAlertDialog("Enter Current Username", "Lock Screen");
      return false;
    }
    else if(this.model.password === undefined || this.model.password.trim() === ''){
      this.model.password = '';
      document.getElementById('pwd').focus();
      this._confirmationDialogComponent.openAlertDialog("Enter Password", "Lock Screen");
      return false;
    }
    else{
      return true;
    }
  }

  onNoClick(): void {
    if(this.validate() == true){
    let usr: UserLogin = new UserLogin();
    usr.User_Name = this.model.username;
    usr.Password = this.model.password;
    this._commonService.checkLockPassword(usr).subscribe((result: any) => {
      console.log(result);
      if(result === true){
        this._localStorage.setLockStatus(false);
        console.log(this._localStorage.getLockStatus(),'LockStatus');
        this.thisDialogRef.close();
      }
      else{
        this.model.password = '';
        document.getElementById('pwd').focus();
        this._confirmationDialogComponent.openAlertDialog("Wrong Password", "Lock Screen");
      }
    });
    }
  }

  ngOnInit() { }
  updateTokenExpiry() { }
}

export class UserLogin {
  User_Name: string;
  Password: string;
}
