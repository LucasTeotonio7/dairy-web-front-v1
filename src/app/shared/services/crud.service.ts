import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { TokenService } from '../../pages/auth/services/token.service';
import { Paginator } from '../models/paginator';

@Injectable({
  providedIn: 'root'
})
export class CrudService<Type> {
  readonly BASE_URL = environment.API;

  constructor(
    protected http: HttpClient,
    protected tokenService: TokenService,
    protected path: String,
  ) {
    this.tokenService = tokenService;
    this.BASE_URL += path;
  }

  get(id: string): Observable<Type> {
      return this.http.get<Type>(`${this.BASE_URL}${id}`, this.getRequestOptions());
  }

  list(page: number): Observable<Paginator<Type>> {
    return this.http.get<Paginator<Type>>(`${this.BASE_URL}`, this.getRequestOptions(page));
  }

  post(formData: FormData): Observable<any> {
    return this.http.post(`${this.BASE_URL}`, formData, this.getRequestOptions());
  }

  put(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.BASE_URL}${id}/`, formData, this.getRequestOptions());
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}${id}/`, this.getRequestOptions());
  }

  private getRequestOptions(page?: number): { headers: HttpHeaders; params?: HttpParams} {

    let params: HttpParams | undefined;
    if (page !== undefined) {
        params = new HttpParams().set('page', page.toString());
    }
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.tokenService.getToken()}`
    });
    return { headers, params };
  }

}
