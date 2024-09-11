import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID, isDevMode } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HistoryComponent } from './pages/purchase/history/history.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { UserFirstAccessFormComponent } from './pages/auth/forms/user-first-access-form/user-first-access-form.component';

import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxEchartsModule } from 'ngx-echarts';


registerLocaleData(ptBr)


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    PurchaseComponent,
    HistoryComponent,
    UserFirstAccessFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-PT' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
