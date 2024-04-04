import { Component, Input, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { ToastService } from '../../services/toast.service';
import { ToastType, ToastEnum } from '../../models/toast';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnDestroy {
  @Input() title: string = 'Aviso';
  @Input() type: ToastType = ToastEnum.DEFAULT;
  @Input() subtitle?: string;
  @Input() description?: string;

  backgroundColor!: string;
  icon!: string;

  readonly TOAST_OPTIONS = {
    default: {
      icon: 'fa-solid fa-circle-exclamation',
      color: ''
    },
    success: {
      icon: 'fa-regular fa-circle-check',
      color: 'bg-success'
    },
    warning: {
      icon: 'fa-solid fa-triangle-exclamation',
      color: 'bg-warning'
    },
    danger: {
      icon: 'fa-regular fa-circle-xmark',
      color: 'bg-danger'
    }
  };

  private toastSubscription: Subscription;

  constructor(private toastService: ToastService) {
    this.toastSubscription = this.toastService.ToastType$.subscribe((toast) => {
      this.title = toast.title;
      this.description = toast.description;
      this.type = toast.type;

      this.backgroundColor = this.TOAST_OPTIONS[this.type].color;
      this.icon = this.TOAST_OPTIONS[this.type].icon;

      const toastElement = document.getElementsByClassName('toast')[0] as HTMLElement;
      toastElement.classList.add('show');

      setTimeout(() => {
        toastElement.classList.remove('show');
      }, 3000);
    });
  }

  ngOnDestroy() {
    this.toastSubscription.unsubscribe();
  }

}
