import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../../auth/services/token.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { WeeklyControl } from '../models/weekly-control';

@Injectable({
  providedIn: 'root'
})
export class WeeklyControlService extends CrudService<WeeklyControl>  {

    constructor(http: HttpClient, tokenService: TokenService) {
        super(http, tokenService, 'weekly-control/');
    }
}
