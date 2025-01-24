import { tap, catchError, finalize, switchMap, filter, take } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpUserEvent
} from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { CommonService } from '../../common/common.service';
import { ConfirmationDialogComponent } from "src/app/COMMON/shared/confirmation-dialog/confirmation-dialog.component";
import { LocalStorage } from "src/app/COMMON/shared/local-storage";
import { ToastrComponent } from "src/app/COMMON/shared/toastr/toastr.component";

@Injectable({
  providedIn: "root"
})
export class HttpLoader {
  public loaderView: BehaviorSubject<boolean>;

  constructor() {
    this.loaderView = new BehaviorSubject(false);
  }

  setLoaderView(value: boolean): void {
    this.loaderView.next(value);
  }

  getLoaderView(): Observable<boolean> {
    return this.loaderView.asObservable();
  }
}

@Injectable({
  providedIn: "root"
})
export class HttpInterceptorService implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private _confirmationDialogComponent: ConfirmationDialogComponent,
    private _httpLoader: HttpLoader,
    private _router: Router,
    private _localStorage: LocalStorage,
    private _commonService: CommonService,
    private toastr: ToastrComponent

  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse
    | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {
    this._httpLoader.setLoaderView(true);
    return next.handle(this.addTokenToRequest(req, this._localStorage.getToken())).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this._httpLoader.setLoaderView(false);
        }
      }), catchError((error: HttpErrorResponse) => {
        this._httpLoader.setLoaderView(false);
        this.errorCode(error);
        return throwError(error);
      }), finalize(() => {
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token.length > 10) {
      return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    return request;
  }

  errorCode(error: HttpErrorResponse): void {
    switch (error.status) {
      case 0:
        if (error.url == 'http://localhost:4321/MachineDetails/GetMachineName')
          this._confirmationDialogComponent.openAlertDialog('Local service not found', "Error");
        else
          this._router.navigate(["Maintanance"]);
        break;

      case 401:
        this._localStorage.setUserLoggedIn(false);
        this.isRefreshingToken = false;
        break;

      case 500:
        this._confirmationDialogComponent.openAlertDialog(error.error, "Error");
        break;

      default:
        this._confirmationDialogComponent.openAlertDialog(error.message, "Error");
    }
  }

  // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  //   if (!this.isRefreshingToken) {
  //     this.isRefreshingToken = true;
  //     this.tokenSubject.next(null);
  //     return this._commonService.refreshToken()
  //       .pipe(switchMap((user: any) => {
  //         if (user) {
  //           this.tokenSubject.next(user.Token);
  //           return next.handle(this.addTokenToRequest(request, user.Token));
  //         }
  //         return <any>this._commonService.logout();
  //       }), catchError(err => {
  //         return <any>this._commonService.logout();
  //       }), finalize(() => {
  //         this.isRefreshingToken = false;
  //       }));
  //   } else {
  //     this.isRefreshingToken = false;
  //     return this.tokenSubject.pipe(filter(token => token != null), take(1), switchMap(token => {
  //       return next.handle(this.addTokenToRequest(request, token));
  //     }));
  //   }
  // }
}
