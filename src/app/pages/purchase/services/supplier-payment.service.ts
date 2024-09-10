import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CrudService } from 'src/app/shared/services/crud.service';
import { SupplierPayment } from '../models/supplier_payment';
import { TokenService } from '../../auth/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierPaymentService extends CrudService<SupplierPayment> {

  constructor(http: HttpClient, tokenService: TokenService) {
    super(http, tokenService, 'supplier-payment/');
  }

  getAnalysis(): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}analysis`, 
      this.getRequestOptions()
    );
  } 

}
