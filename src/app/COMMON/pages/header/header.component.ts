import { Component, OnInit, HostBinding } from '@angular/core';
import { Menus, NavItem } from '../../models/common-model';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorage } from '../../shared/local-storage';
import { CommonService } from '../../services/common/common.service';
import { FormatInvalidInput } from '../../shared/directives/format-invalid-input';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName: string = "";
  navItems: NavItem[] = [];
  lockFlag: boolean = false;

  objGlobal = {
    Comapny_Name: this._localStorage.getcompanyName(),
    Section_Name: this._localStorage.getCompanySectionName(),
    User_Name: this._localStorage.getLoggedUserName(),
    Sales_Location_Name: this._localStorage.getSalesLocationName(),
    Warehouse_Name: this._localStorage.getwareHouseName()
  }

  constructor(
    public _overlayContainer: OverlayContainer,
    public _localStorage: LocalStorage,
    public _commonService: CommonService,
    public _router: Router, private _activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    private _format: FormatInvalidInput,
  ) { }

  @HostBinding("class")
  componentCssClass: any;

  public onSetTheme(theme: string): void {
    this.overLaySetTheme(theme);
    this.componentCssClass = theme;
    this._localStorage.setSelectedTheme(theme);
  }

  ngOnInit() {
    debugger;
    this._localStorage.setApiUrl('https://localhost:44314/');
    this._localStorage.setGlobalUserId(2757);
  }

  private overLaySetTheme(theme: string): void {
    this._overlayContainer.getContainerElement().classList.remove("default-theme", "red-theme", "pink-theme", "light-theme");
    theme = btoa(theme) === "null" ? "default-theme" : theme;
    this.componentCssClass = theme;
    this._overlayContainer.getContainerElement().classList.add(theme);
  }

  private getMenus(): void {

    let objMenu: Menus = {
      User_ID: this._localStorage.intGlobalUserId(),
      Company_ID: this._localStorage.getGlobalCompanyId(),
      Sales_Location_ID: this._localStorage.getGlobalSalesLocationId(),
      Module_ID: this._localStorage.getModuleId(),
      Section_ID: 1
    };
    this._commonService.getMenus(objMenu).subscribe((result: NavItem[]) => {
      this.navItems = result;
      this._localStorage.setMenuItems(this.navItems);
      this.getWorkingLocation();
    });
  }

  private getWorkingLocation(): void {

    this._commonService.getWorkingLocation().subscribe((result: any) => {

      if (result) {
        this._localStorage.setWorkingLocation(result);
        let locationList = result;
        let salseLocationName = locationList[locationList.findIndex((item: any) =>
          item.Sales_Location_ID === +this._localStorage.getGlobalSalesLocationId())].Sales_Location_Name;
        this._localStorage.setSalesLocationName(salseLocationName);
        this.objGlobal.Sales_Location_Name = this._localStorage.getSalesLocationName();
        this.getGlobalData();
      }
      this.getNonTradingDocumentRootPathAndUrl();
    });
  }

  private getGroupSection(): void {

    let obj = {
      Section: JSON.stringify([{
        sales_location_id: this._localStorage.getGlobalSalesLocationId(),
        warehouse_id: this._localStorage.getGlobalWarehouseId(),
      }])
    }
    this._commonService.getGroupSection(obj).subscribe((result: any) => {

      if (result) {
        this._localStorage.setGroupSection(JSON.parse(result));
        let groupSectionList = JSON.parse(result);
        let groupSectionName = groupSectionList[groupSectionList.findIndex((item: any) =>
          item.group_section_id === +this._localStorage.getGlobalGroupSectionId())].group_section_name;
        let companySectionName = groupSectionList[groupSectionList.findIndex((item: any) =>
          item.company_section_id === +this._localStorage.getGlobalSectionId())].company_section_name;
        let companySectionId = groupSectionList[groupSectionList.findIndex((item: any) =>
          item.company_section_id === +this._localStorage.getGlobalSectionId())].company_section_id;
        this._localStorage.setGroupSectionName(groupSectionName);
        this._localStorage.setCompanySectionName(companySectionName);
        this.objGlobal.Section_Name = this._localStorage.getCompanySectionName();
        this._localStorage.setCompanySectionId(companySectionId);
        this.getGlobalData();
      }
    });
  }

  private getGlobalData(): void {

    let obj = {
      GlobalParams: JSON.stringify([{
        company_section_id: this._format.replaceInvalidNumber(+this._localStorage.getCompanySectionId()),
        sales_location_id: +this._localStorage.getGlobalSalesLocationId(),
        warehouse_id: this._format.replaceInvalidNumber(+this._localStorage.getGlobalWarehouseId()),
      }])
    }
    this._commonService.getGlobalData(obj).subscribe((result: any) => {
      debugger;
      if (result && result !== 'null') {
        this._localStorage.setGlobalData(JSON.parse(result));
        let data = JSON.parse(result);
        let globalDataList = JSON.parse(data);
        // let whsectionid = globalDataList[0].wh_section_id;
        // let stateCode = globalDataList[0].state_code;
        // let companyName = globalDataList[0].company_name;
        let apiUrls = JSON.parse(JSON.stringify(globalDataList));
        let stateCode = globalDataList[0].state_code;
        // this._localStorage.setCompanyName(companyName);
        // this._localStorage.setStateCode(stateCode);
        // this._localStorage.setWhSectionId(whsectionid);
        this._localStorage.setStateCode(stateCode);
        this._localStorage.setGlobalApiUrls(JSON.stringify(apiUrls));
        // this.objGlobal.Comapny_Name = this._localStorage.getcompanyName();
      }
    });
  }

  private userProfile(): void {
    let objUserProfile = {
      UserProfile: this._localStorage.intGlobalUserId()
    };
    this._commonService.getUserProfile(objUserProfile).subscribe((result: any) => {
      debugger;
      this._localStorage.setUserProfile(JSON.parse(result)[0]);
    });
  }

  private getAllWorkingLocation(): void {
    let objAllWorkingLocation = {
      SalesLocation: JSON.stringify([{

      }])
    };
    this._commonService.getAllWorkingLocation(objAllWorkingLocation).subscribe((result: any) => {
      let salesLocation = result;
    });
  }

  private getNonTradingDocumentRootPathAndUrl(): void {

    let obj = {
      GetFilePath: JSON.stringify([{
        sales_location_id: +this._localStorage.getGlobalSalesLocationId(),
        module_id: +this._localStorage.getModuleId()
      }])
    }
    this._commonService.getDocumentPath(obj).subscribe((result: any) => {
      debugger
      if (result) {
        console.log(JSON.parse(result), 'data[0].base_path_url');
        let data = JSON.parse(result);
        this._localStorage.setNonTradingDocumentPath(data[0].base_path);
        this._localStorage.setNonTradingBasePathId(data[0].base_path_id);
        this._localStorage.setDocumentPath(data[0]);
        console.log(this._localStorage.getDocumentPath(), 'res')
        this._localStorage.setNonTradingDocumentURL(data[0].base_path_url);
        this.getDocumentPath();
      }
    });
  }

  private getDocumentPath(): void {

    let data = this._localStorage.getDocumentPath();
    let obj = {
      GetFilePath: JSON.stringify([{
        base_path_id: data.base_path_id
      }])
    }
    this._commonService.getDocumentPathView(obj).subscribe((result: any) => {
      debugger
      if (result) {
        this._localStorage.setDocumentPathView(result);
        this.getNonTradingDocumentSize();
        console.log(this._localStorage.getDocumentPathView(), 'result');
      }
    });
  }

  public redirectToLauncher(menuPath: string): void {
    let urlParameters = btoa("Sales_Location_ID=" + this._localStorage.getGlobalSalesLocationId() +
      "&Company_ID=" + this._localStorage.getGlobalCompanyId() +
      "&Module_ID=" + this._localStorage.getModuleId() +
      "&User_ID=" + this._localStorage.intGlobalUserId() +
      "&Menu_Path=" + menuPath +
      "&User_Name=" + this._localStorage.getLoggedUserName() +
      "&Section_ID=" + this._localStorage.getGlobalSectionId() +
      "&Warehouse_ID=" + this._localStorage.getGlobalWarehouseId() +
      "&Group_Section_ID=" + this._localStorage.getGlobalGroupSectionId()
    )

    window.location.href = JSON.parse(this._localStorage.getEnvironment()).launcherUiUrl + "params=" + urlParameters +
      "&AuthToken=" + this._localStorage.getAuthToken();
  }

  private getWarehouse(): void {

    let obj = {
      warehouse: JSON.stringify([{
        sales_location_id: this._localStorage.getGlobalSalesLocationId(),
        module_id: this._localStorage.getModuleId()
      }])
    }
    this._commonService.getWarehouse(obj).subscribe((result: any) => {

      if (result) {
        this._localStorage.setWarehouse(JSON.parse(result));
        let warehouse = JSON.parse(result);
        console.log(JSON.parse(result));
        let warhousename = warehouse[warehouse.findIndex((item: any) =>
          item.warehouse_id === +this._localStorage.getGlobalWarehouseId())].wh_name;
        this._localStorage.setWarehouseName(warhousename);
        this.objGlobal.Warehouse_Name = this._localStorage.getwareHouseName();
        let virtual = warehouse[warehouse.findIndex((item: any) =>
          item.warehouse_id === +this._localStorage.getGlobalWarehouseId())].virtual;
        this._localStorage.setVirtual(virtual);
      }
    });
  }

  public getMenu(menuPath: string): void {
    if (menuPath === 'login' || menuPath === 'Home')
      this.redirectToLauncher(menuPath);
  }

  private getNonTradingDocumentSize(): void {
    debugger;
    let objGRN = {
      DocumentSize: JSON.stringify([{
        sales_location_id: +this._localStorage.getGlobalSalesLocationId()
      }])
    }
    this._commonService.getNonTradingDocumentSize(objGRN).subscribe((result: any) => {
      debugger;
      if (result) {
        let tempArr = JSON.parse(result);
        this._localStorage.setNonTradingDocumentSize(tempArr[0].document_size);
        this.getGlobalData();
      }
    })
  }

}


