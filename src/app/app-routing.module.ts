import { ProductComponent } from './pages/product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './pages/auth/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login.component';
import { ProductFormComponent } from './pages/product/forms/product-form/product-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { SupplierFormComponent } from './pages/supplier/supplier-form/supplier-form.component';
import { WeeklyControlComponent } from './pages/weekly-control/weekly-control.component';
import { WeeklyControlFormComponent } from './pages/weekly-control/forms/weekly-control-form/weekly-control-form.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductComponent },
      { path: 'products/create', component: ProductFormComponent },
      { path: 'products/:id', component: ProductFormComponent },
      { path: 'suppliers', component: SupplierComponent },
      { path: 'suppliers/create', component: SupplierFormComponent },
      { path: 'suppliers/:id', component: SupplierFormComponent },
      { path: 'weekly-control', component: WeeklyControlComponent },
      { path: 'weekly-control/create', component: WeeklyControlFormComponent },
      { path: 'weekly-control/:id', component: WeeklyControlFormComponent }
    ],
  },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
