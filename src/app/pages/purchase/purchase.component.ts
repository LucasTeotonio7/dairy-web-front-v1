import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Price } from '../price/models/price';
import { PriceService } from './../price/services/price.service';
import { PriceProductSupplierService } from './../price/services/price-product-supplier.service';
import { PurchaseService } from './services/purchase.service';
import { WeeklyControl } from '../weekly-control/models/weekly-control';
import { WeeklyControlService } from './../weekly-control/services/weekly-control.service';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent {
  weeklyControlId : string | any = ''
  weeklyControl!: WeeklyControl;
  priceTables: Price[] = [];
  priceProductSupplierForm!: FormGroup;
  isDefaultTable: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private weeklyControlService: WeeklyControlService,
    private purchaseService: PurchaseService,
    private priceService: PriceService,
    private priceProductSupplierService: PriceProductSupplierService
  ) {
    this.priceProductSupplierForm = this.formBuilder.group({
      price: [''],
      supplier: ['']
    });
  }

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
          complete: () => {
            this.getPriceTables();
          }
        });
      }
    })
  }

  getPriceTables() {
    this.priceService.listAll().subscribe({
      next: (response) => {
        this.priceTables = response;
        console.log(this.priceTables)
      },
      error: (error) => {console.error(error);}
    })
  }

  setPriceTable() {
    let supplier = this.weeklyControl.suppliers![0].id
    const priceProductSupplierForm = this.priceProductSupplierForm.value;
    console.log(this.isDefaultTable)
    if (this.isDefaultTable) {
      console.log('TRUE')
      let price_product_supplier_id = this.weeklyControl.suppliers![0].price.price_product_supplier_id;
      if (price_product_supplier_id) {
        this.priceProductSupplierService.delete(price_product_supplier_id).subscribe({
          next: () => {},
          error: (error) => {console.error(error)}
        })
      }
    } else {
      console.log('FALSE')
      const formData = new FormData();
      formData.append('price', priceProductSupplierForm.price);
      formData.append('supplier', supplier);
      this.priceProductSupplierService.post(formData).subscribe({
        next: () => {console.log('ok')},
        error: (error) => {console.error(error)}
      })
    }
  }

  ChangingPriceValue($event: any){
    const selectedIndex = $event.target.selectedIndex;
    const selectedOption = $event.target.options[selectedIndex];
    this.isDefaultTable = selectedOption.getAttribute('default') === 'false' ? false : true;
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
        let initValue = input.dataset['initValue'];
        if(initValue !== input.value) {
          this.purchaseService.patch(input.id, formData).subscribe({
            next: (response) => {},
            error: (error) => {console.error(error)}
          });
        }
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
