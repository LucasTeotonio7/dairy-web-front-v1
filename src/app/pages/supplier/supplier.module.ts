import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SupplierComponent } from './supplier.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  { path: '', component: SupplierComponent },
  { path: 'create', component: SupplierFormComponent },
  { path: ':id/update', component: SupplierFormComponent },
];


@NgModule({
  declarations: [
    SupplierComponent,
    SupplierFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SupplierModule { }
