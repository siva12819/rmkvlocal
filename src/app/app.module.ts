import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Http, XHRBackend, RequestOptions, HttpModule } from "@angular/http";
import { ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { RMKVCRUDModule } from './RMKV-CRUD/rmkv-crud.module';
import { RMKVCRUDRoute } from './RMKV-CRUD/rmkv-crud.routing';
import { CommonViewModule } from './COMMON/common.module';
import { CommonRoute } from './COMMON/common.routing';
import { HttpInterceptorService, HttpLoader } from './COMMON/services/app-interceptor/http-client-interceptor/http-interceptor.service';
import { AuthendicationGuard } from './COMMON/services/authendication/guard/authendication-guard.guard';
import { AppDateAdapter, APP_DATE_FORMATS } from './COMMON/shared/directives/date-picker';
import { httpFactory } from './COMMON/services/app-interceptor/http-interceptor/intercept-http-factory';

const httpClientLoaderService = [HttpInterceptorService, HttpLoader];
const httpLoaderService = [httpFactory, HttpLoader];

@NgModule({

  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    RMKVCRUDModule,
    CommonViewModule,
    RMKVCRUDRoute,
    CommonRoute,
    PerfectScrollbarModule,
    CommonModule,
    ToastrModule.forRoot(),
  ],

  providers: [
    AuthendicationGuard,
    httpClientLoaderService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: MAT_DATE_LOCALE, useValue: "en-IN" },
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, HttpLoader]
    },
    {
      provide: APP_BASE_HREF,
      useValue: environment.baseUrl
    }
  ],

  bootstrap: [AppComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})


export class AppModule { }
