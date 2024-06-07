import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TokenService } from '../../auth/services/token.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { ProductProductSupplier } from '../models/price-product-supplier';


@Injectable({
  providedIn: 'root'
})
export class PriceProductSupplierService extends CrudService<ProductProductSupplier> {

  constructor(http: HttpClient, tokenService: TokenService) {
    super(http, tokenService, 'price-product-supplier/');
  }
}
