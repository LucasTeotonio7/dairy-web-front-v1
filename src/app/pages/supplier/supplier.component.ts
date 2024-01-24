import { SupplierService } from './services/supplier.service';
import { Component } from '@angular/core';
import { Supplier } from './models/supplier';
import { Paginator } from 'src/app/shared/models/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {

    suppliers: Supplier[] = [];
    supplierId!: string;
    paginator!: Paginator<Supplier>;

    constructor(private supplierService: SupplierService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const page = params['page'] || 1;
            this.loadSuppliers(page);
        });
    }

    loadSuppliers(page: number) {
        this.supplierService.list(page).subscribe((paginator: Paginator<Supplier>) => {
            this.paginator = paginator;
            this.suppliers = paginator.results;
        });
    }

    setSupplierId($event: Event): void {
        let button = $event.currentTarget as HTMLElement;
        this.supplierId = button.id;
    }

    deleteSupplier() {
        this.supplierService.delete(this.supplierId).subscribe({
          next: (response) => {
            alert('Fornecedor excluído!');
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
