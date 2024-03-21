import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './pages/auth/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { SupplierFormComponent } from './pages/supplier/supplier-form/supplier-form.component';
import { WeeklyControlComponent } from './pages/weekly-control/weekly-control.component';
import { WeeklyControlFormComponent } from './pages/weekly-control/forms/weekly-control-form/weekly-control-form.component';
import { WeeklyDetailComponent } from './pages/weekly-control/weekly-detail/weekly-detail/weekly-detail.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { PriceComponent } from './pages/price/price.component';
import { PriceFormComponent } from './pages/price/price-form/price-form.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)},
      { path: 'suppliers', loadChildren: () => import('./pages/supplier/supplier.module').then(m => m.SupplierModule)},
      // { path: 'suppliers', component: SupplierComponent },
      // { path: 'suppliers/create', component: SupplierFormComponent },
      // { path: 'suppliers/:id/update', component: SupplierFormComponent },
      { path: 'weekly-control', component: WeeklyControlComponent },
      { path: 'weekly-control/create', component: WeeklyControlFormComponent },
      { path: 'weekly-control/:id/update', component: WeeklyControlFormComponent },
      { path: 'weekly-control/:id/detail', component: WeeklyDetailComponent },
      { path: 'weekly-control/:id/supplier/:supplier-id/purchases', component: PurchaseComponent },
      { path: 'prices', component: PriceComponent },
      { path: 'prices/create', component: PriceFormComponent },
      { path: 'prices/:id/update', component: PriceFormComponent },
    ],
  },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
