import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DateService } from 'src/app/shared/services/date.service';
import { Paginator } from 'src/app/shared/models/paginator';
import { Price } from '../price/models/price';
import { PriceService } from './../price/services/price.service';
import { PriceProductSupplierService } from './../price/services/price-product-supplier.service';
import { PurchaseService } from './services/purchase.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WeeklyControl } from '../weekly-control/models/weekly-control';
import { WeeklyControlService } from './../weekly-control/services/weekly-control.service';
import { WeeklyControlEvent } from '../weekly-control/models/weekly-control-event';
import { SupplierPaymentService } from './services/supplier-payment.service';
import { Weekday } from 'src/app/shared/models/date';


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
  path!: string;
  unit_price!:number;
  WeeklyControlEventPaginator!: Paginator<WeeklyControlEvent>;
  weekDays: Weekday[] = [];
  today!: string;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private weeklyControlService: WeeklyControlService,
    private purchaseService: PurchaseService,
    private supplierPaymentService: SupplierPaymentService,
    private priceService: PriceService,
    private priceProductSupplierService: PriceProductSupplierService,
    private toastService: ToastService,
    private dateService: DateService
  ) {
    this.priceProductSupplierForm = this.formBuilder.group({
      price: [''],
      supplier: ['']
    });
  }

  ngOnInit() {
    this.getPath();
    this.getWeeklyControl();
    this.today = this.dateService.formatDate(new Date(), false);
  }

  getPath() {
    this.route.url.subscribe(segments => {
      const segment = segments.map(segment => segment.path);
      if (segment.includes('purchases')) {
        this.path = 'purchases';
      } else if (segment.includes('payment')) {
        this.path = 'payment';
      }
    });
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
              this.weekDays = this.dateService.getWeekdays(this.weeklyControl.start_date);
              this.get_events(supplierId, this.weeklyControl.id)
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

  get_events(supplierId: string, weeklyControlId: string, page=1){
    let params = {
      "supplier_id" : supplierId,
      "weekly_control_id": weeklyControlId
    };
    this.weeklyControlService.get_events(page, params).subscribe({
      next: (response) => {
        if(page > 1) {
          let allResults = this.WeeklyControlEventPaginator.results;
          response.results = allResults.concat(response.results);
          this.WeeklyControlEventPaginator = response;
        } else {
          this.WeeklyControlEventPaginator = response;
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getPriceTables() {
    this.priceService.listAll().subscribe({
      next: (response) => {
        this.priceTables = response;
      },
      error: (error) => {console.error(error);}
    })
  }

  disableField(reference_day: string) {
    const isPaymentRoute = this.path === 'payment';
    const paidSupplier = this.weeklyControl.suppliers![0].paid_supplier;
    
    let reference_date = new Date(reference_day);
    let today_date = new Date(this.today);
    const futureDate = reference_date > today_date;

    return isPaymentRoute || paidSupplier || futureDate;
  }

  setPriceTable() {
    let supplier = this.weeklyControl.suppliers![0].id
    const priceProductSupplierForm = this.priceProductSupplierForm.value;
    if (this.isDefaultTable) {
      let price_product_supplier_id = this.weeklyControl.suppliers![0].price.price_product_supplier_id;
      if (price_product_supplier_id) {
        let params = {
          "new_value": this.unit_price,
          "weekly_control_id": this.weeklyControl.id
        };
        this.priceProductSupplierService.delete(price_product_supplier_id, params).subscribe({
          next: () => {},
          error: (error) => {console.error(error)}
        })
      }
    } else {
      const formData = new FormData();
      formData.append('price', priceProductSupplierForm.price);
      formData.append('supplier', supplier);
      formData.append('weekly_control_id', this.weeklyControl.id);
      this.priceProductSupplierService.post(formData).subscribe({
        next: () => {console.log('ok')},
        error: (error) => {console.error(error)}
      })
    }
    this.weeklyControl.suppliers![0].price.value = this.unit_price;
  }

  changePriceValue($event: any){
    const selectedIndex = $event.target.selectedIndex;
    const selectedOption = $event.target.options[selectedIndex];
    this.isDefaultTable = selectedOption.getAttribute('default') === 'false' ? false : true;
    this.unit_price = selectedOption.getAttribute('unit-price')
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

  hideZero(value: number): number {
    if (value.toString().startsWith('0')) {
      return parseFloat(value.toString());
    }
    return value;
  }

  updateTotal($event: any) {
    let value = $event.target.value;
    value = this.hideZero(value);
    $event.target.value = value;
    if (value < 0 || !value) {
      $event.target.value = 0;
    }
    var inputs = document.getElementsByClassName("purchase-quantity");
    var total_quantity = 0.00;
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i] as HTMLInputElement;
      total_quantity += parseFloat(input.value);
    }

    this.weeklyControl.suppliers![0].total_quantity = total_quantity;
  }

  getPriceTotal(): number {
    if (this.weeklyControl && this.weeklyControl.suppliers && this.weeklyControl.suppliers.length > 0) {
      const supplier = this.weeklyControl.suppliers[0];
      if (supplier.total_quantity && supplier.price && supplier.price.value) {
        return supplier.total_quantity * supplier.price.value;
      }
    }
    return 0;
  }

  save() {
    this.updatePurchaseValues();
    this.back();
  }

  pay() {
    if(this.weeklyControl.suppliers) {
      const supplier = this.weeklyControl.suppliers[0];
      const formData = new FormData();
      formData.append('quantity', supplier.total_quantity.toString());
      formData.append('unit_price', supplier.price.value.toString());
      formData.append('supplier', supplier.id);
      formData.append('weekly_control', this.weeklyControl.id);
      this.supplierPaymentService.post(formData).subscribe({
        next: (response) => {
          this.toastService.showToastSuccess('Pagamento', 'Fornecedor pago com sucesso!')
        },
        error: (error) => {
          this.toastService.showToastDanger('Pagamento', 'Ocorreu uma falha ao processar o pagamento')
        }
      });
    }
    this.back();
  }

  back() {
    this.router.navigate([`/weekly-control/${this.weeklyControlId}/detail`]);
  }
}
