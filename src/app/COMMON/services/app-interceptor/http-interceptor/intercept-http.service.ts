
import { finalize, tap } from 'rxjs/operators';
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ConnectionBackend,
  RequestOptions,
  Request,
  RequestOptionsArgs,
  Response,
  Http
} from "@angular/http";
import { Observable, throwError } from "rxjs";
import { HttpLoader } from "../http-client-interceptor/http-interceptor.service";

@Injectable({
  providedIn: "root"
})
export class InterceptHttpService extends Http {
  
  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private _httpLoader: HttpLoader
  ) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    this._httpLoader.setLoaderView(true);
    return super.request(url, options).pipe(
      tap((res: Response) => {
        this._httpLoader.setLoaderView(false);
      }, error => {
        this._httpLoader.setLoaderView(false);
      }),
      finalize(() => {
        this._httpLoader.setLoaderView(false);
      }));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this._httpLoader.setLoaderView(true);
    return super.get(url, options).pipe(
      tap((res: Response) => {
        this._httpLoader.setLoaderView(false);
      }, error => {
        console.log(url, true);
        this._httpLoader.setLoaderView(false);
      }),
      finalize(() => {
        console.log(url, true);
        this._httpLoader.setLoaderView(false);
      }));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    this._httpLoader.setLoaderView(true);
    return super.post(url, body, options).pipe(
      tap((res: Response) => {
        this._httpLoader.setLoaderView(false);
      }, error => {
        this._httpLoader.setLoaderView(false);
      }),
      finalize(() => {
        this._httpLoader.setLoaderView(false);
      }));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    this._httpLoader.setLoaderView(true);
    return super.put(url, body, options).pipe(
      tap((res: Response) => {
        this._httpLoader.setLoaderView(false);
      }, error => {
        this._httpLoader.setLoaderView(false);
      }),
      finalize(() => {
        this._httpLoader.setLoaderView(false);
      }));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this._httpLoader.setLoaderView(true);
    return super.delete(url, options).pipe(
      tap((res: Response) => {
        this._httpLoader.setLoaderView(false);
      }, error => {
        this._httpLoader.setLoaderView(false);
      }),
      finalize(() => {
        this._httpLoader.setLoaderView(false);
      }));
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }
}
