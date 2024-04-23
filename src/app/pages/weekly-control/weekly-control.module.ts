import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { PurchaseComponent } from '../purchase/purchase.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WeeklyControlComponent } from './weekly-control.component';
import { WeeklyControlFormComponent } from './forms/weekly-control-form/weekly-control-form.component';
import { WeeklyDetailComponent } from './weekly-detail/weekly-detail/weekly-detail.component';


const routes: Routes = [
  { path: '', component: WeeklyControlComponent },
  { path: 'create', component: WeeklyControlFormComponent },
  { path: ':id/update', component: WeeklyControlFormComponent },
  { path: ':id/detail', component: WeeklyDetailComponent },
  { path: ':id/supplier/:supplier-id/purchases', component: PurchaseComponent },
  { path: ':id/supplier/:supplier-id/payment', component: PurchaseComponent },
]


@NgModule({
  declarations: [
    WeeklyControlComponent,
    WeeklyControlFormComponent,
    WeeklyDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class WeeklyControlModule { }
