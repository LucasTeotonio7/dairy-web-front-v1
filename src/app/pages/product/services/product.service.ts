import { CrudService } from '../../../shared/services/crud.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../../auth/services/token.service';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { Brand, Category, MeasureUnit } from '../models/general_models';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudService<Product> {

  readonly apiUrl = "http://localhost:8100";

  constructor(
    http: HttpClient, 
    tokenService: TokenService
  ) {
    super(http, tokenService, 'product/');
  }

  //TODO: refactor in new service -------------------------------------------------------------------------------------
  getBrands(): Observable<Brand[]> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.tokenService.getToken()}`
    });
    const requestOptions = { headers: headers };
    return this.http.get<Brand[]>(`${this.apiUrl}/api/brand/`, requestOptions);
  }

  getCategories(): Observable<Category[]> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.tokenService.getToken()}`
    });
    const requestOptions = { headers: headers };
    return this.http.get<Category[]>(`${this.apiUrl}/api/category/`, requestOptions);
  }

  getMeasureUnit(): Observable<MeasureUnit[]> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.tokenService.getToken()}`
    });
    const requestOptions = { headers: headers };
    return this.http.get<MeasureUnit[]>(`${this.apiUrl}/api/measure-unit/`, requestOptions);
  }

}
