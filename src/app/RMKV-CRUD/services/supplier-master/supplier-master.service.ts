import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SupplierMaster } from '../../model/supplier-master-model';
import { LocalStorage } from 'src/app/COMMON/shared/local-storage';

@Injectable({
  providedIn: 'root'
})
export class SupplierMasterService {

  constructor(private _httpClient: HttpClient, private _localStorage: LocalStorage) { }

  getSupplierMaster(obj) {
    return this._httpClient.get(this._localStorage.getApiUrl() + 'Supplier/ListSupplier?active='+obj.active)
      .pipe(catchError(this.handleError));
  }

  addSupplierMaster(objSupplier: SupplierMaster) {
    return this._httpClient.post(this._localStorage.getApiUrl() + 'Supplier/SaveSupplier', objSupplier)
      .pipe(catchError(this.handleError));
  }

  fetchSupplierMaster(element) {
    debugger;
    return this._httpClient.get(this._localStorage.getApiUrl() + 'Supplier/FetchSupplier?supplier_code='+element)
      .pipe(catchError(this.handleError));
  }

  cancelSupplierMaster(objCancel) {
    debugger;
    return this._httpClient.post(this._localStorage.getApiUrl() + 'Supplier/SupplierActiveUpdate', objCancel)
      .pipe(catchError(this.handleError));
  }

  handleError(error: Response) {
    return throwError(error);
  }
}
