import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../../auth/services/token.service';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { Brand, Category, MeasureUnit } from '../models/general_models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly apiUrl = "http://localhost:8100";

  constructor(
    private http: HttpClient, 
    private tokenService: TokenService
  ) { }

  get(id: string): Observable<Product> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.tokenService.getToken()}`
    });
    const requestOptions = { headers: headers };
    return this.http.get<Product>(`${this.apiUrl}/api/product/${id}`, requestOptions);
  }

  list(): Observable<Product[]> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.tokenService.getToken()}`
    });
    const requestOptions = { headers: headers };
    return this.http.get<Product[]>(`${this.apiUrl}/api/product/`, requestOptions);
  }

  post(productForm: FormData): Observable<any> {
    console.log(productForm)
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.tokenService.getToken()}`
    });
    const requestOptions = { headers: headers };
    return this.http.post(`${this.apiUrl}/api/product/`, productForm, requestOptions);
  }

  put(id: string, productForm: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.tokenService.getToken()}`
    });
    const requestOptions = { headers: headers };
    return this.http.put(`${this.apiUrl}/api/product/${id}/`, productForm, requestOptions);
  }

  delete(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.tokenService.getToken()}`
    });
    const requestOptions = { headers: headers };
    return this.http.delete(`${this.apiUrl}/api/product/${id}/`, requestOptions);
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
    return this.http.get<MeasureUnit[]>(`${this.apiUrl}/api/measure_unit/`, requestOptions);
  }

}
