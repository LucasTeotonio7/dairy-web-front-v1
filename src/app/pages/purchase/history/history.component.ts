import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Paginator } from 'src/app/shared/models/paginator';
import { WeeklyControlEvent } from '../../weekly-control/models/weekly-control-event';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  @Input() WeeklyControlEventPaginator!: Paginator<WeeklyControlEvent>;
  @Output() getMoreEvents = new EventEmitter<void>();

  onGetMoreEvents() {
    this.getMoreEvents.emit();
  }

  getDayOfWeek(dateString: string): string {
    const days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const date = new Date(dateString + 'T00:00:00Z');
    const dayOfWeek = days[date.getDay()];
    return dayOfWeek;
  }

  formatDateTime(dateTimeString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };

    const date = new Date(dateTimeString);
    const formattedDateTime = new Intl.DateTimeFormat('pt-BR', options).format(date);
    return formattedDateTime;
  }

}
