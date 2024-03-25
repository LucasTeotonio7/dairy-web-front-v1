import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBaseMixin } from 'src/app/shared/mixins/form-base.mixin';
import { Product } from 'src/app/pages/product/models/product';
import { WeeklyControl } from '../../models/weekly-control';
import { WeeklyControlService } from '../../services/weekly-control.service';


@Component({
  selector: 'app-weekly-control-form',
  templateUrl: './weekly-control-form.component.html',
  styleUrls: ['./weekly-control-form.component.css']
})
export class WeeklyControlFormComponent extends FormBaseMixin {
    weeklyControlForm!: FormGroup;
    weeklyControlId: string | any = '';
    products: Product[] = [];

    constructor(
        private weeklyControlService: WeeklyControlService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        renderer: Renderer2,
        el: ElementRef
    ) {
        super(renderer, el);
        this.weeklyControlForm = this.formBuilder.group({
            start_date: ['', Validators.required],
            end_date: ['', Validators.required],
            is_closed: [false],
            product: ['', Validators.required]
        });
        this.observeAllControlChanges(this.weeklyControlForm);
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
            this.weeklyControlService.save(weeklyControlForm, this.weeklyControlId).subscribe({
                error: (error: any) => {console.error(error)},
                complete: () => {this.router.navigate(['/weekly-control'])}
            });

        } else {
            this.setInvalidFields(this.weeklyControlForm);
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
