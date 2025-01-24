import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorage } from 'src/app/COMMON/shared/local-storage';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(private _httpClient: HttpClient, private _localStorage: LocalStorage) { }

  public savePurchaseOrder(objPurchaseOrder: any) {
    debugger;
    return this._httpClient.post(this._localStorage.getApiUrl() + 'PurchaseOrder/SavePurchaseOrder', objPurchaseOrder)
      .pipe(catchError(this.handleError));
  }

  public getPurchaseOrder(objPurchaseOrder: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + 'PurchaseOrder/ListPurchaseOrder', objPurchaseOrder)
      .pipe(catchError(this.handleError));
  }

  public fetchPurchaseOrder(poNo: any) {
    debugger;
    return this._httpClient.get(this._localStorage.getApiUrl() + 'PurchaseOrder/FetchPurchaseOrder?po_no='+ poNo)
      .pipe(catchError(this.handleError));
  }

  public cancelPurchaseOrder(objPurchaseOrder: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + 'PurchaseOrder/PurchaseOrderActiveUpdate', objPurchaseOrder)
      .pipe(catchError(this.handleError));
  }

  public getLookupDetailsByCode(objLookup: any) {
    return this._httpClient.post(this._localStorage.getApiUrl() + 'PurchaseOrder/GetLookupDetails', objLookup)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    return throwError(error);
  }
}
