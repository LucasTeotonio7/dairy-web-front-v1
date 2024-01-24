import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../../auth/services/token.service';
import { Supplier } from '../models/supplier';
import { CrudService } from 'src/app/shared/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends CrudService<Supplier>{

    constructor(http: HttpClient, tokenService: TokenService) {
        super(http, tokenService, 'supplier/');
    }
}
