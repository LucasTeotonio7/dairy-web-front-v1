import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DateService } from 'src/app/shared/services/date.service';
import { WeeklyControl } from '../../models/weekly-control';
import { WeeklyControlService } from '../../services/weekly-control.service';
import { Weekday } from 'src/app/shared/models/date';

@Component({
  selector: 'app-weekly-detail',
  templateUrl: './weekly-detail.component.html',
  styleUrls: ['./weekly-detail.component.css']
})
export class WeeklyDetailComponent {

  weeklyControl!: WeeklyControl;
  weekdays: Weekday[] = [];

  constructor(
    private weeklyControlService: WeeklyControlService,
    private route: ActivatedRoute,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
    this.setWeeklyControl();
  }

  getWeekday(day: string): Weekday {
    return this.dateService.getWeekday(day);
  }

  private setWeeklyControl(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.weeklyControlService.get(id).subscribe({
          next: (weeklyControl: WeeklyControl) => {
            this.weeklyControl = weeklyControl;
            this.weekdays = this.dateService.getWeekdays(this.weeklyControl.start_date);
          },
          error: (error: any) => {
            console.error(error);
          },
          complete: () => { }
        });
      }
    });
  }
}
