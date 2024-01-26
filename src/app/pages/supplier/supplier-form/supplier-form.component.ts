import { Component, ElementRef, Renderer2 } from '@angular/core';
import { SupplierService } from '../services/supplier.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from '../models/supplier';

@Component({
    selector: 'app-supplier-form',
    templateUrl: './supplier-form.component.html',
    styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent {

    supplierForm!: FormGroup;
    supplierId: string | any = '';

    constructor(
        private supplierService: SupplierService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private renderer: Renderer2,
        private el: ElementRef
    ) {
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

        this.observeAllControlChanges();

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
    
            if (this.supplierId) {
                this.supplierService.put(this.supplierId, supplierForm).subscribe({
                    next: (response: any) => {
                        console.log(response);
                    },
                    error: (error: any) => {
                        console.log(error);
                    },
                    complete: () => {
                        this.router.navigate(['/suppliers']);
                    }
                });
            } else {
                this.supplierService.post(supplierForm).subscribe({
                    next: (response: any) => {
                        console.log(response);
                    },
                    error: (error: any) => {
                        console.log(error);
                    },
                    complete: () => {
                        this.router.navigate(['/suppliers']);
                    }
                });
            }
        } else {
            for (const controlName in this.supplierForm.controls) {
                if (this.supplierForm.controls.hasOwnProperty(controlName)) {
                    const control = this.supplierForm.get(controlName);
            
                    if (control instanceof FormGroup) {
                        for (const nestedControlName in control.controls) {
                            if (control.controls.hasOwnProperty(nestedControlName)) {
                                const nestedControl = control.get(nestedControlName);
                                this.handleControlValidation(nestedControl, nestedControlName);
                            }
                        }
                    } else {
                        this.handleControlValidation(control, controlName);
                    }
                }
            }
        }
    }

    private handleControlValidation(control: AbstractControl | null, controlName: string): void {
        if (control?.hasError('required')) {
            const inputElement = this.el.nativeElement.querySelector(`[formcontrolname="${controlName}"]`);
            this.renderer.addClass(inputElement, 'is-invalid');
        }
    }
    

    private observeAllControlChanges() {
        for (const controlName in this.supplierForm.controls) {
            const control = this.supplierForm.get(controlName);
            if (control) {
                control.valueChanges.subscribe(() => {
                    if (control instanceof FormGroup) {
                        for (const nestedControlName in control.controls) {
                            if (control.controls.hasOwnProperty(nestedControlName)) {
                                const nestedControl = control.get(nestedControlName);
                                this.handleControlChange(nestedControl, nestedControlName);
                            }
                        }
                    } else {
                        this.handleControlChange(control, controlName);
                    }
                });
            }
        }
    }
    
    private handleControlChange(control: AbstractControl | null, controlName: string): void {
        const inputElement = this.el.nativeElement.querySelector(`[formcontrolname="${controlName}"].form-control`);
        if (inputElement) {
            this.renderer.removeClass(inputElement, 'is-invalid');
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
