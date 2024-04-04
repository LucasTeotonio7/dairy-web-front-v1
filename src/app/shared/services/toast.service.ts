import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastEnum, ToastType } from '../models/toast';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<any>();

  ToastType$ = this.toastSubject.asObservable();

  showToast(title: string, description: string, type: ToastType = ToastEnum.DEFAULT) {
    this.toastSubject.next({ title, description, type });
  }

  showToastSuccess(title: string, description: string) {
    this.showToast(title, description, ToastEnum.SUCCESS);
  }

  showToastWarning(title: string, description: string) {
    this.showToast(title, description, ToastEnum.WARNING);
  }

  showToastDanger(title: string, description: string) {
    this.showToast(title, description, ToastEnum.DANGER);
  }

}
