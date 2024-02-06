import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeeklyControlService } from '../../services/weekly-control.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WeeklyControl } from '../../models/weekly-control';
import { Product } from 'src/app/pages/product/models/product';

@Component({
  selector: 'app-weekly-control-form',
  templateUrl: './weekly-control-form.component.html',
  styleUrls: ['./weekly-control-form.component.css']
})
export class WeeklyControlFormComponent {
    weeklyControlForm!: FormGroup;
    weeklyControlId: string | any = '';
    products: Product[] = [];

    constructor(
        private weeklyControlService: WeeklyControlService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private renderer: Renderer2,
        private el: ElementRef
    ) {
        this.weeklyControlForm = this.formBuilder.group({
            start_date: ['', Validators.required],
            end_date: ['', Validators.required],
            is_closed: [false],
            product: ['', Validators.required]
        });
        this.observeAllControlChanges();
    }

    setProducts(): void {
        this.weeklyControlService.getProducts().subscribe({
          next: (products: Product[]) => {
            this.products = products;
          },
          error: (error: any) => {
            console.error(error);
          },
          complete: () => {}
        });
    }

    formatDate(data: string): string {
        const splitDate = data.split('-');
        return splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0];
    }

    private setWeeklyControl(): void {
        this.route.paramMap.subscribe(params => {
            this.weeklyControlId = params.get('id');
            if (this.weeklyControlId) {
                this.weeklyControlService.get(this.weeklyControlId).subscribe({
                    next: (weeklyControl: WeeklyControl) => {
                        this.weeklyControlForm.setValue({
                            start_date: weeklyControl.start_date,
                            end_date: weeklyControl.end_date,
                            is_closed: weeklyControl.is_closed,
                            product: weeklyControl.product
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

    setWeeklyControlId($event: Event): void {
        let button = $event.currentTarget as HTMLElement;
        this.weeklyControlId = button.id;
    }

    ngOnInit() {
        this.setProducts();
        this.setWeeklyControl();
    }

    save() {
        if (this.weeklyControlForm.valid) {
            const weeklyControlForm = this.weeklyControlForm.value;
    
            if (this.weeklyControlId) {
                this.weeklyControlService.put(this.weeklyControlId, weeklyControlForm).subscribe({
                    next: (response: any) => {
                        console.log(response);
                    },
                    error: (error: any) => {
                        console.log(error);
                    },
                    complete: () => {
                        this.router.navigate(['/weekly-control']);
                    }
                });
            } else {
                this.weeklyControlService.post(weeklyControlForm).subscribe({
                    next: (response: any) => {
                        console.log(response);
                    },
                    error: (error: any) => {
                        console.log(error);
                    },
                    complete: () => {
                        this.router.navigate(['/weekly-control']);
                    }
                });
            }
        } else {
            for (const controlName in this.weeklyControlForm.controls) {
                if (this.weeklyControlForm.controls.hasOwnProperty(controlName)) {
                    const control = this.weeklyControlForm.get(controlName);
            
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

        for (const controlName in this.weeklyControlForm.controls) {
            const control = this.weeklyControlForm.get(controlName);
            if (control) {
              control.valueChanges.subscribe(() => {
                const inputElement = this.el.nativeElement.querySelector(`[formcontrolname="${controlName}"].form-control`);
                this.renderer.removeClass(inputElement, 'is-invalid');
              });
            }
        }
      }

    back() {
        this.router.navigate(['/weekly-control']);
    }

    deleteWeeklyControl() {
        this.weeklyControlService.delete(this.weeklyControlId).subscribe({
            next: (response) => {
                alert('Planilha excluída!');
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
