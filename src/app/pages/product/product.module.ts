import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductFormComponent } from './forms/product-form/product-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'create', component: ProductFormComponent },
  { path: ':id/update', component: ProductFormComponent },
];

@NgModule({
  declarations: [
    ProductComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProductModule { }
