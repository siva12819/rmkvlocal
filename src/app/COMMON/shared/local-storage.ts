import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class LocalStorage {

  private searchedItems: Array<any> = [];
  private key: string;
  private prop: string;
  private childrenPropName: string;
  private _jsonURL_dev = 'assets/settings.Development.json';
  private _jsonURL_prod = 'assets/settings.Production.json';

  private isUserLoggedIn: boolean;
  employeeFilterInfo: string = null;
  employeeHeaderColumnInfo: string = null;

  constructor(private http: HttpClient) {
    this.isUserLoggedIn = false;
  }

  public getJSON(): Observable<any> {
    debugger;
    console.log(environment.production, 'Production Status');
    if (environment.production)
      return this.http.get(this._jsonURL_prod);
    else if (!environment.production)
      return this.http.get(this._jsonURL_dev);
  }

  setGlobalSalesLocationId(value: number): void {
    sessionStorage.setItem("SalesLocationId", btoa(value.toString()));
  }

  getGlobalSalesLocationId(): number {
    return +atob(sessionStorage.getItem("SalesLocationId"));
  }

  setGlobalUserId(value: number): void {
    sessionStorage.setItem("UserId", btoa(value.toString()));
  }

  intGlobalUserId(): number {
    return +atob(sessionStorage.getItem("UserId"));
  }

  setGlobalMachineId(value: number): void {
    sessionStorage.setItem("MachineId", btoa(value.toString()));
  }

  intGlobalMachineId(): number {
    // return +atob(sessionStorage.getItem("MachineId"));
    return 1;
  }

  getGlobalCompanyId(): number {
    return +atob(sessionStorage.getItem("CompanyId"));
  }

  setGlobalCompanyId(value: number): void {
    sessionStorage.setItem("CompanyId", btoa(value.toString()));
  }

  public getGlobalSectionId(): number {
    return +atob(sessionStorage.getItem("SectionId"));
  }

  public setGlobalSectionId(value: number): void {
    sessionStorage.setItem("SectionId", btoa(value.toString()));
  }

  public getGlobalGroupSectionId(): number {
    return +atob(sessionStorage.getItem("GroupSectionId"));
  }

  public setGlobalGroupSectionId(value: number): void {
    sessionStorage.setItem("GroupSectionId", btoa(value.toString()));
  }

  public getGlobalWarehouseId(): number {
    return +atob(sessionStorage.getItem("WarehouseId"));
  }

  public setScreenURL(value: string): void {
    sessionStorage.setItem("ScreenURL", btoa(value.toString()));
  }

  public getScreenURL(): string {
    return atob(sessionStorage.getItem("ScreenURL"));
  }

  public setLockScreen(value: string): void {
    sessionStorage.setItem("LockScreen", btoa(value.toString()));
  }

  public getLockScreen(): string {
    return atob(sessionStorage.getItem("LockScreen"));
  }

  public setGlobalWarehouseId(value: number): void {
    sessionStorage.setItem("WarehouseId", btoa(value.toString()));
  }

  setSelectedTheme(theme: string): void {
    localStorage.setItem("selectedTheme", btoa(theme));
  }

  getSelectedTheme(): string {
    return atob(localStorage.getItem("selectedTheme"));
  }

  setLoggedUserName(value: string): void {
    sessionStorage.setItem("UserName", btoa(value));
  }

  getLoggedUserName(): string {
    return atob(sessionStorage.getItem("UserName"));
  }

  setApiUrl(value: string): void {
    sessionStorage.setItem("Api_Url", btoa(value));
  }

  getApiUrl(): string {
    return atob(sessionStorage.getItem("Api_Url"));
  }

  setEnvironment(value: string): void {
    sessionStorage.setItem("EnvironmentUrls", btoa(value));
  }

  getEnvironment(): string {
    return atob(sessionStorage.getItem("EnvironmentUrls"));
  }

  setTokenId(value: string): void {
    sessionStorage.setItem("Token_ID", btoa(value));
  }

  getTokenId(): string {
    return atob(sessionStorage.getItem("Token_ID"));
  }

  setToken(value: string): void {
    sessionStorage.setItem("Token", btoa(value));
  }

  getToken(): string {
    return atob(sessionStorage.getItem("Token"));
  }

  setAuthToken(value: string): void {
    sessionStorage.setItem("AuthToken", btoa(value));
  }

  getAuthToken(): string {
    return atob(sessionStorage.getItem("AuthToken"));
  }

  setRefreshToken(value: string): void {
    sessionStorage.setItem("RefreshToken", btoa(value));
  }

  getRefreshToken(): string {
    return atob(sessionStorage.getItem("RefreshToken"));
  }

  setWorkingLocation(value: any): void {
    sessionStorage.setItem("workingLocation", btoa(JSON.stringify(value)));
  }

  setGlobalData(value: any): void {
    sessionStorage.setItem("setGlobalData", btoa(JSON.stringify(value)));
  }

  setWarehouse(value: any): void {
    sessionStorage.setItem("warehouse", btoa(JSON.stringify(value)));
  }

  setGroupSection(value: any): void {
    sessionStorage.setItem("groupSection", btoa(JSON.stringify(value)));
  }

  setLockStatus(value: boolean): void {
    sessionStorage.setItem("LockStatus", btoa(value.toString()));
  }

  getLockStatus(): any {
    let status = sessionStorage.getItem("LockStatus");
    console.log(atob(sessionStorage.getItem("LockStatus")), 'localstatus')
    if (!status)
      return 'false';
    else
      return atob(sessionStorage.getItem("LockStatus"));
  }

  setWarehouseName(value: string): void {
    sessionStorage.setItem("warehouseName", btoa(value));
  }

  setVirtual(value: string): void {
    sessionStorage.setItem("virtual", btoa(value));
  }

  setSalesLocationName(value: string): void {
    sessionStorage.setItem("SalesLocationName", btoa(value));
  }

  getSalesLocationName(): string {
    let groupsection = sessionStorage.getItem("SalesLocationName");
    if (groupsection)
      groupsection = atob(sessionStorage.getItem("SalesLocationName"));
    return groupsection;
  }

  setGroupSectionName(value: string): void {
    sessionStorage.setItem("groupSectionName", btoa(value));
  }

  setCompanySectionName(value: string): void {
    sessionStorage.setItem("companySectionName", btoa(value));
  }

  setNonTradingBasePathId(value: number): void {
    sessionStorage.setItem("NonTradingDocumentBasePathId", btoa(value.toString().trim()));
  }

  getNonTradingBasePathId(): number {
    let basePathId: any = sessionStorage.getItem("NonTradingDocumentBasePathId");
    if (basePathId)
      basePathId = +atob(sessionStorage.getItem("NonTradingDocumentBasePathId"));
    return +basePathId;
  }

  setDocumentPath(value: any): void {
    sessionStorage.setItem("DocumentPath", btoa(JSON.stringify(value)));
  }

  setDocumentPathView(value: any): void {
    sessionStorage.setItem("DocumentPathView", btoa(JSON.stringify(value)));
  }

  getDocumentPath(): any {
    let DocumentPath = sessionStorage.getItem("DocumentPath");
    if (DocumentPath)
      DocumentPath = JSON.parse(atob(sessionStorage.getItem("DocumentPath")));
    return DocumentPath;
  }

  getDocumentPathView(): any {
    let DocumentPath = sessionStorage.getItem("DocumentPathView");
    if (DocumentPath)
      DocumentPath = JSON.parse(atob(sessionStorage.getItem("DocumentPathView")));
    return DocumentPath;
  }

  getWorkingLocation(): any {
    let workingLocation = sessionStorage.getItem("workingLocation");
    if (workingLocation)
      workingLocation = JSON.parse(atob(sessionStorage.getItem("workingLocation")));
    return workingLocation;
  }

  getGlobalData(): any {
    let workingLocation = sessionStorage.getItem("GlobalData");
    if (workingLocation)
      workingLocation = JSON.parse(atob(sessionStorage.getItem("GlobalData")));
    return workingLocation;
  }

  getGlobalApiUrls(): any {
    let groupsection = sessionStorage.getItem("globalApiUrls");
    if (groupsection)
      groupsection = atob(sessionStorage.getItem("globalApiUrls"));
    return groupsection;
  }
  
  setGlobalApiUrls(value: string): void {
    sessionStorage.setItem("globalApiUrls", btoa(value));
  }

  getWarehouse(): any {
    let wareHouse = sessionStorage.getItem("warehouse");
    if (wareHouse)
      wareHouse = JSON.parse(atob(sessionStorage.getItem("warehouse")));
    return wareHouse;
  }

  getwareHouseName(): string {
    debugger
    let wareHouse = sessionStorage.getItem("warehouseName");
    if (wareHouse)
      wareHouse = atob(sessionStorage.getItem("warehouseName"));
    return wareHouse;
  }

  getVirtual(): string {
    debugger
    let wareHouse = sessionStorage.getItem("virtual");
    if (wareHouse)
      wareHouse = atob(sessionStorage.getItem("virtual"));
    return wareHouse;
  }

  getGroupSection(): any {
    let groupsection = sessionStorage.getItem("groupSection");
    if (groupsection)
      groupsection = JSON.parse(atob(sessionStorage.getItem("groupSection")));
    return groupsection;
  }

  getGroupSectionName(): string {
    let groupsection = sessionStorage.getItem("groupSectionName");
    if (groupsection)
      groupsection = atob(sessionStorage.getItem("groupSectionName"));
    return groupsection;
  }
  getCompanySectionName(): string {
    let groupsection = sessionStorage.getItem("companySectionName");
    if (groupsection)
      groupsection = atob(sessionStorage.getItem("companySectionName"));
    return groupsection;
  }

  setWhSectionId(value: string): void {
    sessionStorage.setItem("WhSectionId", btoa(value));
  }

  setCompanyName(value: string): void {
    sessionStorage.setItem("companyName", btoa(value));
  }
  setStateCode(value: string): void {
    sessionStorage.setItem("StateCode", btoa(value));
  }

  getStateCode(): string {
    let groupsection = sessionStorage.getItem("StateCode");
    if (groupsection)
      groupsection = atob(sessionStorage.getItem("StateCode"));
    return groupsection;
  }

  getcompanyName(): string {
    let groupsection = sessionStorage.getItem("companyName");
    if (groupsection)
      groupsection = atob(sessionStorage.getItem("companyName"));
    return groupsection;
  }

  getWhSectionId(): string {
    let groupsection = sessionStorage.getItem("WhSectionId");
    if (groupsection)
      groupsection = atob(sessionStorage.getItem("WhSectionId"));
    return groupsection;
  }

  setModuleId(value: number): void {
    sessionStorage.setItem("ModuleId", btoa(value.toString()));
  }

  getModuleId(): number {
    return +atob(sessionStorage.getItem("ModuleId"));
  }

  setCompanySectionId(value: string): void {
    sessionStorage.setItem("companySectionId", btoa(value));
  }

  getCompanySectionId(): string {
    let groupsection = sessionStorage.getItem("companySectionId");
    if (groupsection)
      groupsection = atob(sessionStorage.getItem("companySectionId"));
    return groupsection;
  }

  setMenuPath(path: string): void {
    sessionStorage.setItem("MenuPath", btoa(path));
  }

  getMenuPath(): string {
    return atob(sessionStorage.getItem("MenuPath"));
  }

  setMenuItems(menus: any): void {
    sessionStorage.setItem("MenuItems", btoa(JSON.stringify(menus)));
  }

  getMenuItems(): any {
    let menus = sessionStorage.getItem("MenuItems");
    if (menus)
      menus = JSON.parse(atob(sessionStorage.getItem("MenuItems")));
    return menus;
  }

  setUserProfile(userProfile: any): void {
    sessionStorage.setItem("UserProfile", btoa(JSON.stringify(userProfile)));
  }

  getUserProfile(): any {
    let userProfile = sessionStorage.getItem("UserProfile");
    if (userProfile)
      userProfile = JSON.parse(atob(sessionStorage.getItem("UserProfile")));
    return userProfile;
  }

  setUserLoggedIn(logged: boolean): void {
    sessionStorage.setItem("UserLogged", String(logged));
  }

  getUserLoggedIn(): string {
    return sessionStorage.getItem("UserLogged");
  }

  setNonTradingDocumentPath(value: string): void {
    sessionStorage.setItem("NonTradingDocumentRootPath", btoa(value));
  }

  getNonTradingDocumentPath(): string {
    let documentPath = sessionStorage.getItem("NonTradingDocumentRootPath");
    if (documentPath)
      documentPath = atob(sessionStorage.getItem("NonTradingDocumentRootPath"));
    return documentPath;
  }

  setNonTradingDocumentURL(value: string): void {
    sessionStorage.setItem("NonTradingDocumentRootURL", btoa(value));
  }

  getNonTradingDocumentURL(): string {
    let documentRoot = sessionStorage.getItem("NonTradingDocumentRootURL");
    if (documentRoot)
      documentRoot = atob(sessionStorage.getItem("NonTradingDocumentRootURL"));
    return documentRoot;
  }

  setNonTradingDocumentSize(value: number): void {
    sessionStorage.setItem("documentSize", btoa(value.toString()));
  }

  getNonTradingDocumentSize(): number {
    return +atob(sessionStorage.getItem("documentSize"));
  }

  getMinDate(): string {
    return "01/00/2018";
  }

  getNonTradingFilePath() {
    return atob(sessionStorage.getItem("NonTradingfilePath"));
  }

  setLoggedInMachineId(value: number): void {
    sessionStorage.setItem("NonTradingLoggedInMachineId", btoa((+value).toString().trim()));
  }

  getLoggedInMachineId(): number {
    let machineId: any = sessionStorage.getItem("NonTradingLoggedInMachineId");
    if (machineId)
      machineId = +atob(sessionStorage.getItem("NonTradingLoggedInMachineId"));
    return +machineId;
  }

  setLoggedInMachineName(value: string): void {
    sessionStorage.setItem("NonTradingLoggedInMachineName", btoa(value));
  }

  getLoggedInMachineName(): string {
    let machineName = sessionStorage.getItem("NonTradingLoggedInMachineName");
    if (machineName)
      machineName = atob(sessionStorage.getItem("NonTradingLoggedInMachineName"));
    return machineName;
  }

  setLoggedInMachineDetails(value: string): void {
    sessionStorage.setItem("NonTradingLoggedInMachineDetails", btoa(JSON.stringify(value)));
  }

  getLoggedInMachineDetails(): string {
    debugger;
    let machineDetails: any = sessionStorage.getItem("NonTradingLoggedInMachineDetails");
    if (machineDetails)
      machineDetails = JSON.parse(atob(sessionStorage.getItem("NonTradingLoggedInMachineDetails")));
    return machineDetails;
  }

  setNonTradingMachineDetails(value: string): void {
    sessionStorage.setItem("NonTradingMachineDetails", btoa(JSON.stringify(value)));
  }

  getNonTradingMachineDetails(): string {
    debugger;
    let machineDetails: any = sessionStorage.getItem("NonTradingMachineDetails");
    if (machineDetails)
      machineDetails = JSON.parse(atob(sessionStorage.getItem("NonTradingMachineDetails")));
    return machineDetails;
  }

  transform(value: any, key?: any, prop?: any, childrenProp?: any): any {

    if (key != undefined) {
      this.searchedItems = [];
      this.key = key.toLowerCase();
      this.prop = prop;
      this.childrenPropName = childrenProp;
      let searchResult = this.searchRecursive(value);
      return searchResult;
    }
    return value;
  }

  searchRecursive(value) {
    for (var i = 0; i < value.length; i++) {
      let lowerCaseName = value[i][this.prop].toLowerCase();
      if (lowerCaseName.includes(this.key)) {
        this.searchedItems.push(value[i]);
      } else if (value[i][this.childrenPropName]) {
        if (value[i][this.childrenPropName].length > 0) {
          this.searchRecursive(value[i][this.childrenPropName]);
        }
      }
    }

    return this.searchedItems;
  }

  getMenuRights(SearchRoute: String): any {
    let menu = this.getMenuItems();
    return this.transform(menu, SearchRoute, "Route", "Children")[0].Rights;
  }

  setEInvoice_Credentials(value: any): void {
    sessionStorage.setItem("EInvoice_Credentials", btoa(JSON.stringify(value)));
  }

  getEInvoice_Credentials(): any {
    let data = sessionStorage.getItem("EInvoice_Credentials");
    if (data)
      data = atob(sessionStorage.getItem("EInvoice_Credentials"));
    return data;
  }

}
