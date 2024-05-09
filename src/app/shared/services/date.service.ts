import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  getWeekDays(startDate: string): string[] {
    const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const result: string[] = [];
    const startDateObj = new Date(startDate + 'T00:00:00Z');

    result.push(daysOfWeek[startDateObj.getUTCDay()]);

    for (let i = 1; i <= 6; i++) {
      const nextDate = new Date(startDateObj);
      nextDate.setUTCDate(startDateObj.getUTCDate() + i);
      result.push(daysOfWeek[nextDate.getUTCDay()]);
    }
    return result;
  }

}
