import { Injectable } from '@angular/core';

import { Weekday } from '../models/date';


const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];


@Injectable({
  providedIn: 'root'
})
export class DateService {

  getWeekday(startDate: string): Weekday {
    const startDateObj = new Date(startDate + 'T00:00:00Z');
    const UTCDay = startDateObj.getUTCDay();
    return {
      name: daysOfWeek[UTCDay],
      date: startDateObj,
      day: this.formatDate(startDateObj)
    };
  }

  getWeekdays(startDate: string): Weekday[] {
    
    const result: Weekday[] = [];
    const startDateObj = new Date(startDate + 'T00:00:00Z');

    const firstDayOfWeek = startDateObj.getUTCDay();
    result.push({
      name: daysOfWeek[firstDayOfWeek],
      date: startDateObj,
      day: this.formatDate(startDateObj)
    });

    for (let i = 1; i <= 6; i++) {
      const nextDate = new Date(startDateObj);
      nextDate.setUTCDate(startDateObj.getUTCDate() + i);
      result.push({
        name: daysOfWeek[nextDate.getUTCDay()],
        date: startDateObj,
        day: this.formatDate(nextDate)
      });
    }
    return result;
  }

  formatDate(date: Date, utc = true): string {
    const year = utc ? date.getUTCFullYear() : date.getFullYear();
    const month = utc ? date.getUTCMonth() + 1 : date.getMonth() + 1;
    const day = utc ? date.getUTCDate() : date.getDate();
  
    const formattedMonth = (month < 10) ? `0${month}` : month;
    const formattedDay = (day < 10) ? `0${day}` : day;
  
    return `${year}-${formattedMonth}-${formattedDay}`;
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
