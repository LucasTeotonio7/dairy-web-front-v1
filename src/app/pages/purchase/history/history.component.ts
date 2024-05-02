import { Component, Input } from '@angular/core';
import { WeeklyControlEvent } from '../../weekly-control/models/weekly-control-event';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  @Input() weeklyControlEvents!: WeeklyControlEvent[];


  format_history_event(weeklyControlEvent: WeeklyControlEvent) {
    let description = ''
    let newValue = weeklyControlEvent.new_value;
    let oldValue = weeklyControlEvent.old_value;
    let unit = weeklyControlEvent.measure_unit;
    let dayOfWeek = this.getDayOfWeek(weeklyControlEvent.reference_day);

    switch (weeklyControlEvent.type) {

      case 'RECORD':
          if (!oldValue) {
            description =` registrou ${newValue} ${unit} para ${dayOfWeek}`;
          } else {
            description =` atualizou o registro de ${dayOfWeek} de ${oldValue} ${unit} para ${newValue} ${unit}`;
          }
          break;
      case 'PRICE':
        description =` atualizou a tabela de preço de R$ ${oldValue} para R$ ${newValue}`;
        break;
      case 'PAYMENT':
          description =` fez o pagamento ao fornecedor no valor de R$ ${newValue}`;
          break;
      case 'MANUAL':
          description = `Adicionou um nota: ${weeklyControlEvent.description}`;
          break;
      default:
          console.error("Event not recognized");
    }

    return description;
  }

  getDayOfWeek(dateString: string): string {
    const days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const date = new Date(dateString);
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
