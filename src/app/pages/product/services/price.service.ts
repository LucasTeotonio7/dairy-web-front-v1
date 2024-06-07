import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudService } from 'src/app/shared/services/crud.service';
import { Price } from '../models/price'
import { TokenService } from '../../auth/services/token.service';


@Injectable({
  providedIn: 'root'
})
export class PriceService extends CrudService<Price> {

  constructor(http: HttpClient, tokenService: TokenService) {
    super(http, tokenService, 'price/');
  }
}
