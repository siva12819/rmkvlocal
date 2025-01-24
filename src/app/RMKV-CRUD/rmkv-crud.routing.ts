import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ItemMasterComponent } from './pages/item-master/item-master.component';
import { SupplierMasterComponent } from './pages/supplier-master/supplier-master.component';
import { PurchaseOrderComponent } from './pages/purchase-order/purchase-order.component';
import { HeaderComponent } from "../COMMON/pages/header/header.component";

const RMKVCRUDRoutes: Routes = [
  {
    path: "RMKV-CRUD",
    component: HeaderComponent,
    children: [  
      {
        path: "ItemMaster",
        component: ItemMasterComponent,
      },  
      {
        path: "SupplierMaster",
        component: SupplierMasterComponent,
      },     
      {
        path: "PurchaseOrder",
        component: PurchaseOrderComponent,
      },  
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(RMKVCRUDRoutes)],
  exports: [RouterModule]
})

export class RMKVCRUDRoute { }