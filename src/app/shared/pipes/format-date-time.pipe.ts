import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateTime'
})
export class FormatDateTimePipe implements PipeTransform {
  
  transform(dateTimeString: string): string {
    const date = new Date(dateTimeString);

    // Ajuste para o fuso horário local
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short'
    };

    const formattedDateTime = new Intl.DateTimeFormat('pt-BR', options).format(localDate);

    return formattedDateTime;
  }
}
