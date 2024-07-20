import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  { path: '', component: UserComponent }
]

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
