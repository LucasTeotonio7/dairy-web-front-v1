import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DateService } from 'src/app/shared/services/date.service';
import { WeeklyControl } from '../../models/weekly-control';
import { WeeklyControlService } from '../../services/weekly-control.service';

@Component({
  selector: 'app-weekly-detail',
  templateUrl: './weekly-detail.component.html',
  styleUrls: ['./weekly-detail.component.css']
})
export class WeeklyDetailComponent {

  weeklyControl!: WeeklyControl;
  weekDays: string[] = [];

  constructor(
    private weeklyControlService: WeeklyControlService,
    private route: ActivatedRoute,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
    this.setWeeklyControl();
  }

  private setWeeklyControl(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.weeklyControlService.get(id).subscribe({
          next: (weeklyControl: WeeklyControl) => {
            this.weeklyControl = weeklyControl;
            this.weekDays = this.dateService.getWeekDays(this.weeklyControl.start_date);
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
