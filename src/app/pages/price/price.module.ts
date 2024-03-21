import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { PriceComponent } from './price.component';
import { PriceFormComponent } from './price-form/price-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  { path: '', component: PriceComponent },
  { path: 'create', component: PriceFormComponent },
  { path: ':id/update', component: PriceFormComponent },
];

@NgModule({
  declarations: [
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
export class PriceModule { }
