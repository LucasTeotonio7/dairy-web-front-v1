import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CrudService } from 'src/app/shared/services/crud.service';
import { TokenService } from '../../auth/services/token.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User>{

  constructor(http: HttpClient, tokenService: TokenService) {
    super(http, tokenService, 'user/');
  }

  getUserNoValidate(params?: object): Observable<User> {
    return this.http.get<User>(
      `${this.BASE_URL}get-user-no-validate/`, 
      this.getRequestOptions(params)
    );
  }

  setPassword(formData: FormData, user_id: string): Observable<User> {
    return this.http.post<User>(
      `${this.BASE_URL}${user_id}/set-password/`, 
      formData, 
      this.getRequestOptions()
    );
  }

  getLoggedUser(): Observable<User> {
      return this.http.get<User>(
        `${this.BASE_URL}get-logged-user`, 
        this.getRequestOptions()
      );
  }

}
