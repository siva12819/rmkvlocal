import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { NavItem } from "src/app/COMMON/models/common-model";
import { LocalStorage } from "src/app/COMMON/shared/local-storage";

@Injectable({
  providedIn: "root"
})
export class AuthendicationGuard implements CanActivate {
  userId: number;
  menuItems: NavItem[] = [];
  path = "";
  canEnter = false;

  constructor(private _router: Router, private _localStorage: LocalStorage) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    try {
      this.userId = +atob(sessionStorage.getItem("UserId"));
      this.menuItems = this._localStorage.getMenuItems();
    } catch (error) {
     
      this._router.navigate(["login"]);
      return false;
    }
    if (!!this.userId) {
      if (!!this.menuItems) {
        debugger;
        this.path = next.url[0].path;
        debugger;
        this.authendicateNavigation(this.menuItems);
        if (this.canEnter) {
          return true;
        } else {
         
          this._router.navigate(["login"]);
          return false;
        }
      }
    } else {
     
      this._router.navigate(["login"]);
      return false;
    }
  }

  authendicateNavigation(menus: NavItem[]): void {
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].Children.length === 0) {
        if (menus[i].Route.endsWith(this.path)) {
          this.canEnter = true;
        }
      } else {
        this.authendicateNavigation(menus[i].Children);
      }
    }
  }
}

@Injectable({
  providedIn: "root"
})
export class basicAuthendication implements CanActivate {
  constructor(private _localStorage: LocalStorage, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(route.url[0].path);
    if (this._localStorage.getUserLoggedIn()) {
      if (this._localStorage.getUserLoggedIn() === "true") {
        if (route.url[0].path.toLowerCase() === "NonTrading") {
          return true;
        } else {
          if (
            route.url[0].path.toLowerCase() ===
            this._localStorage.getMenuPath().toLowerCase()
          ) {
            return true;
          } else {
            this._router.navigate(["Home"]);
            return false;
          }
        }
      } else {
       
        this._router.navigate(["login"]);
        return false;
      }
    } else {
     
      this._router.navigate(["login"]);
      return false;
    }
  }
}
