import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { UserComponent } from './user/user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormComponent } from './forms/user-form/user-form.component';


const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'create', component: UserFormComponent },
  { path: ':id/update', component: UserFormComponent }
]

@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgMultiSelectDropDownModule
  ]
})
export class AuthModule { }
