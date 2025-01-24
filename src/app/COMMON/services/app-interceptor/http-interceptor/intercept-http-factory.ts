import { HttpLoader } from "../http-client-interceptor/http-interceptor.service";
import { XHRBackend, Http, RequestOptions } from "@angular/http";
import { InterceptHttpService } from "./intercept-http.service";

export function httpFactory(
  xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  _httpLoader: HttpLoader
): Http {
  return new InterceptHttpService(xhrBackend, requestOptions, _httpLoader);
}
