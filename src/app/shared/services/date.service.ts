import { Injectable } from '@angular/core';

import { Weekday } from '../models/date';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  getWeekdays(startDate: string): Weekday[] {
    const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const result: Weekday[] = [];
    const startDateObj = new Date(startDate + 'T00:00:00Z');

    const firstDayOfWeek = startDateObj.getUTCDay();
    result.push({
      name: daysOfWeek[firstDayOfWeek],
      date: startDateObj
    });

    for (let i = 1; i <= 6; i++) {
      const nextDate = new Date(startDateObj);
      nextDate.setUTCDate(startDateObj.getUTCDate() + i);
      result.push({
        name: daysOfWeek[nextDate.getUTCDay()],
        date: startDateObj
      });
    }
    return result;
  }

}
