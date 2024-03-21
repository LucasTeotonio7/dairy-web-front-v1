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
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { PriceComponent } from './pages/price/price.component';
import { PriceFormComponent } from './pages/price/price-form/price-form.component';


import { SharedModule } from './shared/shared.module';


registerLocaleData(ptBr)


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    PurchaseComponent,
    PriceComponent,
    PriceFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-PT' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
