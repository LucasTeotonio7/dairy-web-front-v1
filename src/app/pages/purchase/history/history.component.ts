import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DateService } from 'src/app/shared/services/date.service';
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

  constructor(private dateService: DateService) {}

  onGetMoreEvents() {
    this.getMoreEvents.emit();
  }

  getDayOfWeek(dateString: string): string {
    const days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const date = new Date(dateString + 'T00:00:00Z');
    const dayOfWeek = days[date.getUTCDay()];
    return dayOfWeek;
  }

  formatDateTime(dateTimeString: string): string {
    return this.dateService.formatDateTime(dateTimeString);
  }

}
