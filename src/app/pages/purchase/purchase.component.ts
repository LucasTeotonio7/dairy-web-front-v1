import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WeeklyControlService } from './../weekly-control/services/weekly-control.service';
import { WeeklyControl } from '../weekly-control/models/weekly-control';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent {
  weeklyControlId : string | any = ''
  weeklyControl!: WeeklyControl;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private weeklyControlService: WeeklyControlService
  ) {}

  ngOnInit() {
    this.getWeeklyControl();
  }

  getWeeklyControl() {
    this.route.paramMap.subscribe(params => {
      this.weeklyControlId = params.get('id');
      let supplierId = params.get('supplier-id');
      if (supplierId) {
        let queryParam = { "supplier_id" : supplierId };
        this.weeklyControlService.get(this.weeklyControlId, queryParam).subscribe({
          next: (response) => {
              this.weeklyControl = response;
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {}
        });
      }
    })
  }


  getInputValues() {

    var purchases = [];
    var inputs = document.getElementsByClassName("purchase-quantity");
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i] as HTMLInputElement;;
      purchases.push({
        reference_day: input.dataset['referenceDay'],
        quantity: parseFloat(input.value)
      });
    }

    console.log(purchases)

    //TODO - send to API
  }

  save() {
    this.back();
    this.getInputValues();
  }

  back() {
    this.router.navigate([`/weekly-control/${this.weeklyControlId}/detail`]);
  }
}
