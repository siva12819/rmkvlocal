import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { WebcamModule } from "ngx-webcam";
import { ToastrModule } from 'ngx-toastr';
import { RMKVCRUDRoute } from "./rmkv-crud.routing";
import { ItemMasterComponent } from './pages/item-master/item-master.component';
import { SupplierMasterComponent } from './pages/supplier-master/supplier-master.component';
import { PurchaseOrderComponent } from './pages/purchase-order/purchase-order.component';
import { ItemCodeLookupComponent } from './shared/item-code-lookup/item-code-lookup.component';
import { SupplierLookupComponent } from './shared/supplier-lookup/supplier-lookup.component';
import { CloneDirective, FixedHeaderDirective } from "../COMMON/shared/clone-thead";
import { ConfirmationDeleteComponent } from "../COMMON/shared/confirmation-delete/confirmation-delete.component";
import { MinMaxDate } from "../COMMON/shared/directives/max-min-date";
import { OnlynumberDirective } from "../COMMON/shared/directives/Only-number-Directive";
import { TimeFormat } from "../COMMON/shared/directives/TimeFormat";
import { MultipleFileAttachmentComponent } from "../COMMON/shared/multiple-file-attachment/multiple-file-attachment.component";
import { ToastrComponent } from "../COMMON/shared/toastr/toastr.component";

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    RMKVCRUDRoute,
    BrowserModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    NgSelectModule,
    NgxChartsModule,
    PerfectScrollbarModule,
    ScrollingModule,
    WebcamModule,
    ToastrModule,
  ],

  declarations: [
    CloneDirective,
    FixedHeaderDirective,
    TimeFormat,
    OnlynumberDirective,
    ItemMasterComponent,
    SupplierMasterComponent,
    PurchaseOrderComponent,
    ItemCodeLookupComponent,
    SupplierLookupComponent,
  ],

  exports: [],

  providers: [
    MinMaxDate,
    ConfirmationDeleteComponent,
    ToastrComponent,
  ],

  entryComponents: [
    ConfirmationDeleteComponent,
    MultipleFileAttachmentComponent,
    ItemCodeLookupComponent,
    SupplierLookupComponent,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class RMKVCRUDModule { }
