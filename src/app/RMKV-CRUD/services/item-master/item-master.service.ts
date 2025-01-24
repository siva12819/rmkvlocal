import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorage } from 'src/app/COMMON/shared/local-storage';

@Injectable({
  providedIn: 'root'
})
export class ItemMasterService {

  constructor(private _httpClient: HttpClient, private _localStorage: LocalStorage) { }

  public saveItemMaster(objItemMaster: any) {
    debugger;
    return this._httpClient.post(this._localStorage.getApiUrl() + 'ItemMaster/SaveItemMaster', objItemMaster)
      .pipe(catchError(this.handleError));
  }

  public getItemMaster(objItemMaster) {
    return this._httpClient.get(this._localStorage.getApiUrl() + 'ItemMaster/ListItemMaster?active='+objItemMaster.active)
      .pipe(catchError(this.handleError));
  }

  public fetchItemMaster(element) {
    return this._httpClient.get(this._localStorage.getApiUrl() + 'ItemMaster/FetchItemMaster?item_code='+element)
      .pipe(catchError(this.handleError));
  }

  public cancelItemMaster(objItemMaster) {
    return this._httpClient.post(this._localStorage.getApiUrl() + 'ItemMaster/ItemMasterActiveUpdate', objItemMaster)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    return throwError(error);
  }
}
