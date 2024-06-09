import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../../auth/services/token.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { WeeklyControl } from '../models/weekly-control';
import { Observable } from 'rxjs';
import { Product } from '../../product/models/product';
import { environment } from 'src/environments/environment';
import { WeeklyControlEvent } from '../models/weekly-control-event';
import { Paginator } from 'src/app/shared/models/paginator';

@Injectable({
  providedIn: 'root'
})
export class WeeklyControlService extends CrudService<WeeklyControl>  {

    constructor(http: HttpClient, tokenService: TokenService) {
        super(http, tokenService, 'weekly-control/');
    }

    create_event(formData: FormData): Observable<any> {
      return this.http.post(`${this.BASE_URL}weekly-control-event/`, formData, this.getRequestOptions());
    }

    get_events(page: number, params?: object): Observable<Paginator<WeeklyControlEvent>> {
      const BASE_URL = environment.API;
      let param = { page : page, ...params };
      return this.http.get<Paginator<WeeklyControlEvent>>(`${BASE_URL}weekly-control-event/`, this.getRequestOptions(param));
    }
}
