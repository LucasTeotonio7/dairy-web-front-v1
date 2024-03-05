import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from '../../product/models/product';
import { PriceService } from '../services/price.service';
import { WeeklyControlService } from '../../weekly-control/services/weekly-control.service';
import { Price } from '../models/price';


@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.css']
})
export class PriceFormComponent {
  priceForm!: FormGroup;
  priceId: string | any = '';
  products: Product[] = [];

  constructor(
    private priceService: PriceService,
    private weeklyControlService: WeeklyControlService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.priceForm = this.formBuilder.group({
      description: ['', Validators.required],
      value: ['', Validators.required],
      default: [false],
      product: ['', Validators.required]
    });
    this.observeAllControlChanges();
  }

  setProducts(): void {
      this.weeklyControlService.getProducts().subscribe({
        next: (products: Product[]) => {
          this.products = products;
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => {}
      });
  }

  private setPrice(): void {
      this.route.paramMap.subscribe(params => {
          this.priceId = params.get('id');
          if (this.priceId) {
              this.priceService.get(this.priceId).subscribe({
                  next: (price: Price) => {
                      this.priceForm.setValue({
                        description: price.description,
                        value: price.value,
                        default: price.default,
                        product: price.product
                      });
                  },
                  error: (error: any) => {
                      console.error(error);
                  },
                  complete: () => { }
              });
          }
      });
  }

  setPriceId($event: Event): void {
      let button = $event.currentTarget as HTMLElement;
      this.priceId = button.id;
  }

  ngOnInit() {
      this.setProducts();
      this.setPrice();
  }

  save() {
      if (this.priceForm.valid) {
          const priceForm = this.priceForm.value;

          if (this.priceId) {
              this.priceService.put(this.priceId, priceForm).subscribe({
                  next: (response: any) => {
                      console.log(response);
                  },
                  error: (error: any) => {
                      console.log(error);
                  },
                  complete: () => {
                      this.router.navigate(['/prices']);
                  }
              });
          } else {
              this.priceService.post(priceForm).subscribe({
                  next: (response: any) => {
                      console.log(response);
                  },
                  error: (error: any) => {
                      console.log(error);
                  },
                  complete: () => {
                      this.router.navigate(['/prices']);
                  }
              });
          }
      } else {
          for (const controlName in this.priceForm.controls) {
              if (this.priceForm.controls.hasOwnProperty(controlName)) {
                  const control = this.priceForm.get(controlName);
          
                  if (control instanceof FormGroup) {
                      for (const nestedControlName in control.controls) {
                          if (control.controls.hasOwnProperty(nestedControlName)) {
                              const nestedControl = control.get(nestedControlName);
                              this.handleControlValidation(nestedControl, nestedControlName);
                          }
                      }
                  } else {
                      this.handleControlValidation(control, controlName);
                  }
              }
          }
      }
  }

  private handleControlValidation(control: AbstractControl | null, controlName: string): void {
      if (control?.hasError('required')) {
          const inputElement = this.el.nativeElement.querySelector(`[formcontrolname="${controlName}"]`);
          this.renderer.addClass(inputElement, 'is-invalid');
      }
  }


  private observeAllControlChanges() {

      for (const controlName in this.priceForm.controls) {
          const control = this.priceForm.get(controlName);
          if (control) {
            control.valueChanges.subscribe(() => {
              const inputElement = this.el.nativeElement.querySelector(`[formcontrolname="${controlName}"].form-control`);
              this.renderer.removeClass(inputElement, 'is-invalid');
            });
          }
      }
    }

  back() {
      this.router.navigate(['/prices']);
  }

  deletePrice() {
      this.priceService.delete(this.priceId).subscribe({
          next: (response) => {
              alert('preço excluída!');
          },
          error: (error) => {
              console.error(error);
          },
          complete: () => {
              this.back();
          }
      });
  }
}
