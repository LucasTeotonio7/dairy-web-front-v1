import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Paginator } from 'src/app/shared/models/paginator';
import { Price } from '../models/price';
import { PriceService } from '../services/price.service';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent {
  prices: Price[] = [];
  paginator!: Paginator<Price>;
  priceId!: string;
  product!: Product;
  isLoading = true;

  constructor(
    private priceService: PriceService,
    private productService: ProductService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.setProduct();
  }

  setProduct() {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.productService.get(productId).subscribe({
          next: (product: Product) => {
            this.product = product;
            this.route.queryParams.subscribe(params => {
              const page = params['page'] || 1;
              const filter = { 'product_id': this.product.id };
              this.loadPrices(page, filter);
            });
          },
          error: (error: any) => {
            console.error(error);
          }
        });
      }
    });
  }

  loadPrices(page: number, params: object) {
    this.priceService.list(page, params).subscribe((paginator: Paginator<Price>) => {
        this.paginator = paginator;
        this.prices = paginator.results;
        this.isLoading = false;
    });
  }

  setPriceId($event: Event): void {
    let button = $event.currentTarget as HTMLElement;
    this.priceId = button.id;
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
          this.ngOnInit();
        }
    });
  }
}
