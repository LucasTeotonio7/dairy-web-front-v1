import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBaseMixin } from 'src/app/shared/mixins/form-base.mixin';
import { Supplier } from '../models/supplier';
import { SupplierService } from '../services/supplier.service';


@Component({
    selector: 'app-supplier-form',
    templateUrl: './supplier-form.component.html',
    styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent extends FormBaseMixin {

    supplierForm!: FormGroup;
    supplierId: string | any = '';

    constructor(
        private supplierService: SupplierService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        renderer: Renderer2,
        el: ElementRef
    ) {
        super(renderer, el);
        this.supplierForm = this.formBuilder.group({
            name: ['', Validators.required],
            address: this.formBuilder.group({
                street: ['', Validators.required],
                number: [''],
                zone: [''],
                city: ['', Validators.required],
                state: ['', Validators.required],
                postal_code: [''],
                complement: ['']
            }),
            cellphone: [''],
            active: [true]
        });

        this.observeAllControlChanges(this.supplierForm);

    }

    private setSupplier(): void {
        this.route.paramMap.subscribe(params => {
            this.supplierId = params.get('id');
            if (this.supplierId) {
                this.supplierService.get(this.supplierId).subscribe({
                    next: (supplier: Supplier) => {
                        this.supplierForm.setValue({
                            name: supplier.name,
                            address: {
                                street: supplier.address.street,
                                number: supplier.address.number,
                                zone: supplier.address.zone,
                                city: supplier.address.city,
                                state: supplier.address.state,
                                postal_code: supplier.address.postal_code,
                                complement: supplier.address.complement
                            },
                            cellphone: supplier.cellphone,
                            active: supplier.active
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

    setSupplierId($event: Event): void {
        let button = $event.currentTarget as HTMLElement;
        this.supplierId = button.id;
    }

    ngOnInit() {
        this.setSupplier();
    }

    save() {
        if (this.supplierForm.valid) {
            const supplierForm = this.supplierForm.value;
            this.supplierService.save(supplierForm, this.supplierId).subscribe({
                error: (error: any) => {console.error(error)},
                complete: () => {this.router.navigate(['/suppliers'])}
            });
        } else {
            this.setInvalidFields(this.supplierForm);
        }
    }

    back() {
        this.router.navigate(['/suppliers']);
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
                this.back();
            }
        });
    }
}
