import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

}
