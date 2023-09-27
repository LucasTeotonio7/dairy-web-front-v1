import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../../auth/services/token.service';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly apiUrl = "http://localhost:8100";

  constructor(
    private http: HttpClient, 
    private tokenService: TokenService
  ) { }

  get(): Observable<Product[]> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.tokenService.getToken()}`
    });
    const requestOptions = { headers: headers };
    return this.http.get<Product[]>(`${this.apiUrl}/api/product/`, requestOptions);
  }

}
