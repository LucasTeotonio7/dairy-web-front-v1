import { ProductComponent } from './pages/product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './pages/auth/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login.component';
import { ProductFormComponent } from './pages/product/forms/product-form/product-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductComponent },
      { path: 'products/create', component: ProductFormComponent },
      { path: 'products/:id', component: ProductFormComponent }
    ],
  },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
