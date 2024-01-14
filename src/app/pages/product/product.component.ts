import { Component } from '@angular/core';
import { Product } from './models/product';
import { ProductService } from './services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  products: Product[] = [];
  productId!: string;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.list().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  setProductId($event: Event): void {
    let button = $event.currentTarget as HTMLElement;
    this.productId = button.id;
  }

  deleteProduct() {
    this.productService.delete(this.productId).subscribe({
      next: (response) => {
        alert('produto excluído!');
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
