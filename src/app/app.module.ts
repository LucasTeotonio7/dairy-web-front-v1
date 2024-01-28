import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductFormComponent } from './pages/product/forms/product-form/product-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DeleteModalComponent } from './shared/components/delete-modal/delete-modal.component';
import { ImageUploadComponent } from './shared/components/image-upload/image-upload.component';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { SupplierFormComponent } from './pages/supplier/supplier-form/supplier-form.component';
import { WeeklyControlComponent } from './pages/weekly-control/weekly-control.component';

registerLocaleData(ptBr)


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProductComponent,
    ProductFormComponent,
    DashboardComponent,
    DeleteModalComponent,
    ImageUploadComponent,
    PaginatorComponent,
    SupplierComponent,
    SupplierFormComponent,
    WeeklyControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-PT' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
