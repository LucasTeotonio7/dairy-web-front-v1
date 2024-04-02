import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @Input() title: string = 'Aviso';
  @Input() subtitle?: string;
  @Input() description?: string;

  showToast() {
    const toastElement = document.getElementsByClassName('toast')[0] as HTMLElement;
    toastElement.classList.add('show');
    setTimeout(() => {
      toastElement.classList.remove('show');
    }, 3000);
  }

}
