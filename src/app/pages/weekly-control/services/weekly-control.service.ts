import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../../auth/services/token.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { WeeklyControl } from '../models/weekly-control';
import { Observable } from 'rxjs';
import { Product } from '../../product/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeeklyControlService extends CrudService<WeeklyControl>  {

    constructor(http: HttpClient, tokenService: TokenService) {
        super(http, tokenService, 'weekly-control/');
    }

    getProducts(): Observable<Product[]> {
        const headers = new HttpHeaders({
          'Authorization': `Token ${this.tokenService.getToken()}`
        });
        const BASE_URL = environment.API;
        const requestOptions = { headers: headers };
        return this.http.get<Product[]>(`${BASE_URL}product/?no_paginate=1`, requestOptions);
    }
}
