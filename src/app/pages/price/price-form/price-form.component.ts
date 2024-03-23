import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormBaseMixin } from 'src/app/shared/mixins/form-base.mixin';
import { Price } from '../models/price';
import { PriceService } from '../services/price.service';
import { Product } from '../../product/models/product';
import { WeeklyControlService } from '../../weekly-control/services/weekly-control.service';


@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.css']
})
export class PriceFormComponent extends FormBaseMixin {
  priceForm!: FormGroup;
  priceId: string | any = '';
  products: Product[] = [];

  constructor(
    private priceService: PriceService,
    private weeklyControlService: WeeklyControlService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    renderer: Renderer2,
    el: ElementRef
  ) {
    super(renderer, el);
    this.priceForm = this.formBuilder.group({
      description: ['', Validators.required],
      value: ['', Validators.required],
      default: [false],
      product: ['', Validators.required]
    });
    this.observeAllControlChanges(this.priceForm);
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

        this.priceService.save(priceForm, this.priceId).subscribe({
            error: (error: any) => {console.log(error)},
            complete: () => {this.router.navigate(['/prices'])}
        });

    } else {
        this.setInvalidFields(this.priceForm);
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
