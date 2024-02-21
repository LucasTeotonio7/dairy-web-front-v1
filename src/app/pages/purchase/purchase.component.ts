import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent {
  weeklyControlId : string | any = ''

  constructor(
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getWeeklyControl();
  }

  getWeeklyControl() {
    this.route.paramMap.subscribe(params => {
      this.weeklyControlId = params.get('id')
      console.log(params.get('id'))
    })
  }

  back() {
    this.router.navigate([`/weekly-control/${this.weeklyControlId}/detail`]);
  }
}
