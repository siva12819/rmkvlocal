import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HeaderComponent } from './pages/header/header.component';
import { ErrorComponent } from './pages/error/error.component';
import { ServerDownComponent } from './pages/server-down/server-down.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { LockScreenComponent } from './shared/lock-screen/lock-screen.component';
import { LocalStorage } from './shared/local-storage';
import { ChildMenuItemsComponent } from './pages/child-menu-items/child-menu-items.component';
import { CommonService } from './services/common/common.service';
import { CommonRoute } from './common.routing';
import { RedirectToComponent } from './pages/redirect-to/redirect-to.component';
import { MenusResolveGuard, UserProfileResolveGuard } from './pages/resolve-guards/menus-resolve-guard/menus-resolve-guard';
import { OnlyNumber } from './shared/directives/only-number';
import { FocusOnInitDirective } from './shared/directives/focus-oninit';
import { ExcelService } from './shared/directives/excel-service';
import { ConfirmationDeleteComponent } from './shared/confirmation-delete/confirmation-delete.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { ReasonComponent } from './shared/reason/reason.component';
import { ToastrComponent } from './shared/toastr/toastr.component';
import { SamplePageComponent } from './pages/sample-page/sample-page.component';
import { BlockCopyPasteDirective } from "./shared/directives/block-copy-paste";
import { CloneSharedDirective } from "./shared/clone-thead-shared";
@NgModule({
    imports: [
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CommonRoute,
        NgxChartsModule,
        PerfectScrollbarModule,
    ],
    declarations: [
        CloneSharedDirective,
        RedirectToComponent,
        HeaderComponent,
        ErrorComponent,
        ServerDownComponent,
        ConfirmationDialogComponent,
        LockScreenComponent,
        ChildMenuItemsComponent,
        OnlyNumber,
        FocusOnInitDirective,
        ConfirmationDeleteComponent,
        FullScreenComponent,
        ReasonComponent,
        ToastrComponent,
        SamplePageComponent,
        BlockCopyPasteDirective,
    ],
    exports: [],
    providers: [
        MenusResolveGuard,
        UserProfileResolveGuard,
        LocalStorage,
        CommonService,
        ConfirmationDialogComponent,
        ExcelService,
    ],
    entryComponents: [
        ConfirmationDialogComponent,
        LockScreenComponent,
        ReasonComponent,
        ToastrComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CommonViewModule { }
