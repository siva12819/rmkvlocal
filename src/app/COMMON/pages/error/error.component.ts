import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '../../shared/local-storage';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(public _localStorage: LocalStorage, public _router: Router,) { }

  ngOnInit() {
  }
  
  public redirectToLauncher(menuPath: string): void {
    let urlParameters = btoa("Sales_Location_ID=" + this._localStorage.getGlobalSalesLocationId() +
      "&Company_ID=" + this._localStorage.getGlobalCompanyId() +
      "&Module_ID=" + this._localStorage.getModuleId() +
      "&User_ID=" + this._localStorage.intGlobalUserId() +
      "&Menu_Path=" + menuPath +
      "&User_Name=" + this._localStorage.getLoggedUserName() +
      "&Section_ID=" + this._localStorage.getGlobalSectionId() +
      "&Warehouse_ID=" + this._localStorage.getGlobalWarehouseId()
    )

    window.location.href = JSON.parse(this._localStorage.getEnvironment()).launcherUiUrl + "params=" + urlParameters +
      "&AuthToken=" + this._localStorage.getAuthToken();
  }

}
