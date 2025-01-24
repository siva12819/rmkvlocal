
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from "@angular/router";
import { Observable } from 'rxjs';
import { catchError } from "rxjs/operators";
import { NavItem, Menus } from "src/app/COMMON/models/common-model";
import { CommonService } from "src/app/COMMON/services/common/common.service";
import { LocalStorage } from "src/app/COMMON/shared/local-storage";

@Injectable({
  providedIn: "root"
})
export class MenusResolveGuard implements Resolve<NavItem[] | any> {
  constructor(
    private _commonService: CommonService, private _localStorage: LocalStorage,
    private _router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NavItem[] | any> {
    // let navItems = this._localStorage.getMenuItems();
    // if (!navItems) {
      let objMenu: Menus = {
        User_ID: this._localStorage.intGlobalUserId(),
        Company_ID: this._localStorage.getGlobalCompanyId(),
        Sales_Location_ID: this._localStorage.getGlobalSalesLocationId(),
        Module_ID: this._localStorage.getModuleId(),
        Section_ID: this._localStorage.getGlobalSectionId(),
        WareHouse_ID : this._localStorage.getGlobalWarehouseId() 
      };
      return this._commonService.getMenus(objMenu).pipe(catchError(err => {
        this._router.navigate(["Maintanance"]);
        console.log(err);
        throw err;
      }));
    // }
  }
}


@Injectable({
  providedIn: "root"
})
export class UserProfileResolveGuard implements Resolve<any> {
  constructor(
    private _commonService: CommonService, private _localStorage: LocalStorage,
    private _router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    // let navItems = this._localStorage.getMenuItems();
    // if (!navItems) {
    //   let objMenu: Menus = {
    //     User_ID: this._localStorage.intGlobalUserId(),
    //     Company_ID: this._localStorage.getGlobalCompanyId(),
    //     Sales_Location_ID: this._localStorage.getGlobalSalesLocationId(),
    //     Module_ID: this._localStorage.getModuleId(),
    //     Section_ID: 1
    //   };
    let objUserProfile = {
      UserProfile: this._localStorage.intGlobalUserId()
    };
    return this._commonService.getUserProfile(objUserProfile).pipe(catchError(err => {
      this._router.navigate(["Maintanance"]);
      console.log(err);
      throw err;
    }));
  }
  // }
}
