import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { HeaderComponent } from "./pages/header/header.component";

const CommonRoutes: Routes = [
    { path: "RMKV-CRUD", component: HeaderComponent },
    { path: "", redirectTo: "RMKV-CRUD", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(CommonRoutes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})

export class CommonRoute { }