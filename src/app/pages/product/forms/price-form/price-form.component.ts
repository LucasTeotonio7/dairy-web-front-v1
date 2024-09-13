import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormBaseMixin } from 'src/app/shared/mixins/form-base.mixin';
import { Price } from '../../models/price';
import { PriceService } from '../../services/price.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ToastService } from './../../../../shared/services/toast.service';


@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.css']
})
export class PriceFormComponent extends FormBaseMixin {
  priceForm!: FormGroup;
  priceId: string | any = '';
  product!: Product;
  price!: Price;

  constructor(
    private priceService: PriceService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
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
      product: ['']
    });
    this.observeAllControlChanges(this.priceForm);
  }

  setProduct() {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.productService.get(productId).subscribe({
          next: (product: Product) => {
            this.product = product;
            this.setPrice();
          },
          error: (error: any) => {
            console.error(error);
          }
        });
      }
    });
  }

  private setPrice(): void {
      this.route.paramMap.subscribe(params => {
          this.priceId = params.get('price-id');
          if (this.priceId) {
              this.priceService.get(this.priceId).subscribe({
                  next: (price: Price) => {
                      this.priceForm.setValue({
                        description: price.description,
                        value: price.value,
                        default: price.default,
                        product: price.product
                      });
                      this.price = price;
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
      this.setProduct();
  }

  save() {
    if (this.priceForm.valid) {
        const priceForm = this.priceForm.value;
        var formData = this.formDataFromFormGroup(priceForm);

        if (this.product.id) {
          formData.append('product', this.product.id.toString());
        }

        this.priceService.save(formData, this.priceId).subscribe({
            error: (error: any) => {console.error(error)},
            complete: () => {this.back()}
        });

    } else {
        this.setInvalidFields(this.priceForm);
    }
  }

  back() {
    this.router.navigate([`/products/${this.product.id}/prices`]);
  }

  deletePrice() {
      this.priceService.delete(this.priceId).subscribe({
          next: (response) => {
              this.toastService.showToastSuccess('Tabela de preço', 'preço excluída!');
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
