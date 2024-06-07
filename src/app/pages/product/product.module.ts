import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFormComponent } from './forms/product-form/product-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PriceComponent } from './price-list/price.component';
import { PriceFormComponent } from './forms/price-form/price-form.component';


const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'create', component: ProductFormComponent },
  { path: ':id/detail', component: ProductDetailComponent },
  { path: ':id/update', component: ProductFormComponent },
  { path: ':id/prices', component: PriceComponent },
  { path: ':id/prices/create', component: PriceFormComponent },
  { path: ':id/prices/:price-id/update', component: PriceFormComponent },
];

@NgModule({
  declarations: [
    ProductComponent,
    ProductFormComponent,
    ProductDetailComponent,
    PriceComponent,
    PriceFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProductModule { }
