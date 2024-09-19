import { Component } from '@angular/core';
import { Product } from './models/product';
import { ProductService } from './services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Paginator } from 'src/app/shared/models/paginator';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  products: Product[] = [];
  productId!: string;
  paginator!: Paginator<Product>;
  isLoading = true;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        const page = params['page'] || 1;
        this.loadProducts(page);
    });
  }

  loadProducts(page: number) {
    this.productService.list(page).subscribe((paginator: Paginator<Product>) => {
        this.paginator = paginator;
        this.products = paginator.results;
        this.isLoading = false;
    });
  }

  setProductId($event: Event): void {
    let button = $event.currentTarget as HTMLElement;
    this.productId = button.id;
  }

  deleteProduct() {
    this.productService.delete(this.productId).subscribe({
      next: (response) => {
        this.toastService.showToastSuccess('Produto', 'Produto excluído com sucesso!');
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
