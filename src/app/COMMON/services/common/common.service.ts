import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorage } from '../../shared/local-storage';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Modules, Menus, RemoveToken } from '../../models/common-model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private _httpClient: HttpClient, private _localStorage: LocalStorage) {
    this.currentUserSubject = new BehaviorSubject<any>(_localStorage.getToken());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public getMenus(objMenu: Menus) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Menus/GetMenus", objMenu)
      .pipe(catchError(this.handleError));
  }

  public getCompany(objCompanyFil: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetCompanies", objCompanyFil);
  }

  public getWorkingLocation() {
    let data = {
      Sales_Location_Id: +this._localStorage.getGlobalSalesLocationId(),
      User_Id: +this._localStorage.intGlobalUserId()
    }
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetSalesLocations", data)
      .pipe(catchError(this.handleError));
  }

  public checkLockPassword(objUserProfile: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/CheckLockPassword", objUserProfile)
      .pipe(catchError(this.handleError));
  }

  public getAllWorkingLocation(objAllWorkingLocation: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetAllSalesLocations", objAllWorkingLocation);
  }

  public getNonTradingDocumentRootPathAndUrl() {
    return this._httpClient.get(this._localStorage.getApiUrl() + "Shared/GetGRNDocumentRootPathAndUrl/" + this._localStorage.getGlobalSalesLocationId())
      .pipe(catchError(this.handleError));
  }

  public getHRConfiguration() {
    return this._httpClient.get(this._localStorage.getApiUrl() + 'Shared/GetHRConfiguration/' + this._localStorage.getGlobalSalesLocationId())
      .pipe(catchError(this.handleError));
  }

  public getUserProfile(objUserProfile: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetUserProfile", objUserProfile)
      .pipe(catchError(this.handleError));
  }

  // getGRNSections(objSections: any) {
  //   return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetGRNSectionsByWarehouseId", objSections)
  //     .pipe(catchError(this.handleError));
  // }

  public getCommonWarehouseSections(objSections: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetCommonSectionsDetails", objSections)
      .pipe(catchError(this.handleError));
  }

  public uploadTempFile(formData: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/UploadNonTradingTempFile", formData)
      .pipe(catchError(this.handleError));
  }

  public getLRList(formData: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetLRLookup", formData)
      .pipe(catchError(this.handleError));
  }

  public getStates() {
    return this._httpClient.get(this._localStorage.getApiUrl() + "Shared/GetStates")
      .pipe(catchError(this.handleError));
  }

  public getGroupSection(objgroupsection: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetSection", objgroupsection)
      .pipe(catchError(this.handleError));
  }

  public getGroupSections() {
    return this._httpClient.get(this._localStorage.getApiUrl() + "Shared/GetGroupSections")
      .pipe(catchError(this.handleError));
  }

  public getByNoDetails(data: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetByNoDetails", data)
      .pipe(catchError(this.handleError));
  }

  public checkBynoByScreen(data: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetByNoDetails", data)
      .pipe(catchError(this.handleError));
  }

  public getWarehouse(objWarehouse: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetWarehouse", objWarehouse)
      .pipe(catchError(this.handleError));
  }

  public getGlobalData(objWarehouse: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetGlobalParams", objWarehouse)
      .pipe(catchError(this.handleError));
  }

  public getWarehouseBasedCompanySection(obj: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetCompanySectionDetails", obj)
      .pipe(catchError(this.handleError));
  }

  public getDocumentPath(obj: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetDocumentPath", obj)
      .pipe(catchError(this.handleError));
  }

  public getDocumentPathView(obj: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetDocumentPathView", obj)
      .pipe(catchError(this.handleError));
  }

  public getMaterialLookup(obj: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + 'Shared/GetMaterialLookup', obj)
      .pipe(catchError(this.handleError));
  }

  public getMaterialProductLookup(obj: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + 'Shared/GetMaterialProductLookup', obj)
      .pipe(catchError(this.handleError));
  }

  public getLoggedInMachineName(): Observable<any> {
    debugger;
    return this._httpClient.get('http://localhost:4321/MachineDetails/GetMachineName')
      .pipe(catchError(this.handleError));
  }

  public getLoggedInMachineDetails(obj: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + 'Shared/GetLoggedInMachineDetails', obj)
      .pipe(catchError(this.handleError));
  }

  public imageAsBytes(selectPrintingList: any): Observable<any> {
    debugger;
    return this._httpClient.post(this._localStorage.getApiUrl() + 'Shared/GetDynamicDocumentStream', selectPrintingList)
      .pipe(catchError(this.handleError));
  }

  public getPaymentMachines(objMachines: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + 'Shared/GetPaymentMachines', objMachines)
      .pipe(catchError(this.handleError));
  }

  public checkPaymentMachine(objMachines: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + 'Shared/CheckPaymentMachine', objMachines)
      .pipe(catchError(this.handleError));
  }

  public getPaymentModes() {
    return this._httpClient.get(this._localStorage.getApiUrl() + 'Shared/GetPaymentModes')
      .pipe(catchError(this.handleError));
  }

  public getCustomerDetailsById(objCheck: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + 'Shared/GetCustomerDetailsById', objCheck)
      .pipe(catchError(this.handleError));
  }

  public getValidCustomerId(objCheck: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + 'Shared/GetCustomerId', objCheck)
      .pipe(catchError(this.handleError));
  }

  public getAllCompany(objCheck: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + 'Shared/GetAllCompany', objCheck)
      .pipe(catchError(this.handleError));
  }

  public getSectionSelect(objCheck: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + 'Shared/GetSectionSelect', objCheck)
      .pipe(catchError(this.handleError));
  }

  public getFloorLocation(objFloor: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + 'Shared/GetFloorLocation', objFloor)
      .pipe(catchError(this.handleError));
  }

  public getAllSections() {
    return this._httpClient.get(this._localStorage.getApiUrl() + 'Shared/GetAllSections')
      .pipe(catchError(this.handleError));
  }

  public fileAsBytes(selectPrintingList: any): Observable<any> {
    debugger;
    return this._httpClient.post(this._localStorage.getApiUrl() + 'Shared/GetDocumentAsFileStream', selectPrintingList)
      .pipe(catchError(this.handleError));
  }

  public getNonTradingDocumentSize(objGRN: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetDocumentSize", objGRN)
      .pipe(catchError(this.handleError));
  }

  // public getCompanies(objGet: any, apiName: string) {
  //   debugger;
  //   let apiUrl: string = (JSON.parse(this._localStorage.getGlobalApiUrls()).filter(x => x.api_name.toString().trim().toLowerCase() === apiName.toString().trim().toLowerCase()))[0].api_url;
  //   return this._httpClient.post(apiUrl + "/" + "Shared/GetCompaniesByLocation", objGet) //"http://localhost:65148/"
  //     .pipe(catchError(this.handleError));
  // }

  public getAPIWithParams(objGet: any, apiName: string, controllerName: string, serviceName: string) {
    let apiUrl: string = (JSON.parse(this._localStorage.getGlobalApiUrls()).filter(x => x.api_name.toString().trim().toLowerCase() === apiName.toString().trim().toLowerCase()))[0].api_url;
    return this._httpClient.post(apiUrl + "/" + controllerName + "/" + serviceName + "/", objGet) //"http://localhost:65148/"
      .pipe(catchError(this.handleError));
  }

  public getAPI(apiName: string, controllerName: string, serviceName: string) {
    let apiUrl: string = (JSON.parse(this._localStorage.getGlobalApiUrls()).filter(x => x.api_name.toString().trim().toLowerCase() === apiName.toString().trim().toLowerCase()))[0].api_url;
    return this._httpClient.get(apiUrl + "/" + controllerName + "/" + serviceName + "/") //"http://localhost:65148/"
      .pipe(catchError(this.handleError));
  }

  // public getSections(apiName: string) {
  //   debugger;
  //   let apiUrl: string = (JSON.parse(this._localStorage.getGlobalApiUrls()).filter(x => x.api_name.toString().trim().toLowerCase() === apiName.toString().trim().toLowerCase()))[0].api_url;
  //   return this._httpClient.get(apiUrl + "/" + "Sections/GetSection") //"http://localhost:50626/"
  //     .pipe(catchError(this.handleError));
  // }

  public getAllWarehouse(objWarehouse: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + "Shared/GetAllWareHouse", objWarehouse)
      .pipe(catchError(this.handleError));
  }

  public logout() {
    localStorage.removeItem('userInfo');
  }

  private handleError(error: Response) {
    return throwError(error);
  }

  private handleError1(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log("Client Side Error =" + error.message);
    } else {
      console.log("Server Side Error=" + error.message);
    }
    return throwError(error);
  }

}
