import { Component } from '@angular/core';
import { Product } from './models/product';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  products: Product[] = []; 

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.get().subscribe((products) => {
      this.products = products;
    });
  }

}
