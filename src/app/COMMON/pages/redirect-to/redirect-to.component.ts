import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../../shared/local-storage';

@Component({
  selector: 'app-redirect-to',
  templateUrl: './redirect-to.component.html',
  styleUrls: ['./redirect-to.component.scss']
})
export class RedirectToComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute,
    public _localStorage: LocalStorage, private _router: Router) { }

  ngOnInit() {
    debugger;
    this._localStorage.getJSON().subscribe(
      res=>{
        this._localStorage.setEnvironment(JSON.stringify(res));
        this._localStorage.setApiUrl(res.apiUrl);
        this._activatedRoute.queryParams.subscribe((queryParams: any) => {
          try {
            let params = atob(queryParams["params"]);

            this._localStorage.setGlobalSalesLocationId(+params.split("&")[0].split("=")[1]);
            this._localStorage.setGlobalCompanyId(+params.split("&")[1].split("=")[1]);
            this._localStorage.setModuleId(+params.split("&")[2].split("=")[1]);
            this._localStorage.setGlobalUserId(+params.split("&")[3].split("=")[1]);
            this._localStorage.setMenuPath(params.split("&")[4].split("=")[1]);
            this._localStorage.setLoggedUserName(params.split("&")[5].split("=")[1]);
            this._localStorage.setGlobalSectionId(+params.split("&")[6].split("=")[1]);
            this._localStorage.setGlobalWarehouseId(+params.split("&")[7].split("=")[1]);
            this._localStorage.setGlobalGroupSectionId(+params.split("&")[8].split("=")[1]);
            this._localStorage.setScreenURL(params.split("&")[9].split("=")[1]);
            this._localStorage.setLockScreen(params.split("&")[10].split("=")[1]);
            this._localStorage.setToken(queryParams["Token"]);
            this._localStorage.setAuthToken(queryParams["AuthToken"]);
            this._localStorage.setUserLoggedIn(true);
            this.reDirect();
          } catch (error) {
            this._router.navigate(["Error"]);
          }
        });
      },err => {
        console.log(err);
      });

  }
  reDirect(): void {
    if(this._localStorage.getScreenURL() == "empty" || this._localStorage.getScreenURL() == ""
      || this._localStorage.getScreenURL() == null || this._localStorage.getScreenURL() == undefined){
      this._router.navigate([this._localStorage.getMenuPath()]);
    }
    else{
      this._router.navigate([this._localStorage.getMenuPath() + "/" + this._localStorage.getScreenURL()])
    }
  }
}

