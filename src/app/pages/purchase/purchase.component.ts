import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PurchaseService } from './services/purchase.service';
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
    private weeklyControlService: WeeklyControlService,
    private purchaseService: PurchaseService
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


  updatePurchaseValues() {
    var inputs = document.getElementsByClassName("purchase-quantity");
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i] as HTMLInputElement;
      let quantity = parseFloat(input.value);
      let referenceDay = input.dataset['referenceDay'];
      const formData = new FormData();
      formData.append('quantity', input.value);
      
      if(input.id) {
        this.purchaseService.patch(input.id, formData).subscribe({
          next: (response) => {},
          error: (error) => {console.error(error)}
        });
      } 
      else if (quantity > 0) {

        formData.append('reference_day', referenceDay ? referenceDay: '');
        formData.append('product', this.weeklyControl.product);
        formData.append('supplier', this.weeklyControl.suppliers![0].id);
        formData.append('weekly_control', this.weeklyControlId);

        this.purchaseService.post(formData).subscribe({
          next: (response) => {},
          error: (error) => {console.error(error)}
        });
      }

    }
  
  }

  save() {
    this.updatePurchaseValues();
    this.back();
  }

  back() {
    this.router.navigate([`/weekly-control/${this.weeklyControlId}/detail`]);
  }
}
