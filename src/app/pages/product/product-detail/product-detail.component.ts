import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../models/product';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  product!: Product;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.setProduct();
  }

  setProduct() {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.productService.get(productId).subscribe({
          next: (product: Product) => {
            this.product = product;
          },
          error: (error: any) => {
            console.error(error);
          }
        });
      }
    });
  }

}
