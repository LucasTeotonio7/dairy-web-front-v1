import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Paginator } from 'src/app/shared/models/paginator';
import { WeeklyControl } from './models/weekly-control';
import { WeeklyControlService } from './services/weekly-control.service';

@Component({
  selector: 'app-weekly-control',
  templateUrl: './weekly-control.component.html',
  styleUrls: ['./weekly-control.component.css']
})
export class WeeklyControlComponent {
    weeklyControls: WeeklyControl[] = [];
    weeklyControlId!: string;
    paginator!: Paginator<WeeklyControl>;

    constructor(private weeklyControlService: WeeklyControlService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const page = params['page'] || 1;
            this.loadWeeklyControls(page);
        });
    }

    loadWeeklyControls(page: number) {
        this.weeklyControlService.list(page).subscribe((paginator: Paginator<WeeklyControl>) => {
            this.paginator = paginator;
            this.weeklyControls = paginator.results;
        });
    }

    setWeeklyControlId($event: Event): void {
        let button = $event.currentTarget as HTMLElement;
        this.weeklyControlId = button.id;
    }

    deleteWeeklyControl() {
        this.weeklyControlService.delete(this.weeklyControlId).subscribe({
          next: (response) => {
            alert('Planilha excluída!');
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {
            this.ngOnInit();
          }
        });
    }
}
