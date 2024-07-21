import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './pages/auth/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserFirstAccessFormComponent } from './pages/auth/forms/user-first-access-form/user-first-access-form.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)},
      { path: 'suppliers', loadChildren: () => import('./pages/supplier/supplier.module').then(m => m.SupplierModule)},
      { path: 'weekly-control', loadChildren: () => import('./pages/weekly-control/weekly-control.module').then(m => m.WeeklyControlModule)},
      { path: 'users', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)}
    ],
  },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'first-access', component: UserFirstAccessFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
