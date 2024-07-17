import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { UserLogin } from '../models/user';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly apiUrl = "http://localhost:8100";

  constructor(
    private http: HttpClient, 
    private tokenService: TokenService
  ) { }

  authenticate(user: UserLogin): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/api-token-auth/`, user).pipe(
      catchError((error) => {
        console.error('Erro na autenticação:', error);
        return throwError(() => error);
      })
    );
  }

  is_authenticated(): boolean  {
    let token = this.tokenService.getToken();
    return Boolean(token);
  }
  
  logout(): void {
    this.tokenService.removeToken();
  }
}
