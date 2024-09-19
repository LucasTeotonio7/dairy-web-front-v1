import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

import { Paginator } from 'src/app/shared/models/paginator';
import { SupplierService } from './services/supplier.service';
import { Supplier } from './models/supplier';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {

    suppliers: Supplier[] = [];
    supplierId!: string;
    paginator!: Paginator<Supplier>;
    isLoading = true;

    constructor(
      private supplierService: SupplierService, 
      private route: ActivatedRoute,
      private toastService: ToastService
    ) { }

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
            this.isLoading = true;
        });
    }

    setSupplierId($event: Event): void {
        let button = $event.currentTarget as HTMLElement;
        this.supplierId = button.id;
    }

    deleteSupplier() {
        this.supplierService.delete(this.supplierId).subscribe({
          next: (response) => {
            this.toastService.showToastSuccess('Fornecedor', 'Fornecedor excluído com sucesso!');
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
