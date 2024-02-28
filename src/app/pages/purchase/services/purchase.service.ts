import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudService } from 'src/app/shared/services/crud.service';
import { Purchase } from '../models/purchase';
import { TokenService } from '../../auth/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends CrudService<Purchase>{

  constructor(http: HttpClient, tokenService: TokenService) {
    super(http, tokenService, 'purchase/');
  }

}
