import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import flatpickr from "flatpickr";
import { Options } from "flatpickr/dist/types/options"

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
    flatpickrOptions: Options = {};

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

    initFlatpickr(defaultDate?: any): void {
        let element = document.getElementById('range-date') as HTMLInputElement;
        this.flatpickrOptions = {
            mode: "range",
            altFormat: "l d/m",
            dateFormat: "Y-m-d",
            altInput: true,
            defaultDate: defaultDate
        }
        flatpickr(element, this.flatpickrOptions);
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

    dateRange(event: any): void {
        var dateRangeString = event.target.value;
        if(dateRangeString.includes('to')){
            var dates = dateRangeString.split(' to ');
            this.weeklyControlForm.patchValue({
                start_date: dates[0],
                end_date: dates[1]
            });
        }
    }

    private setWeeklyControl(): void {
        this.route.paramMap.subscribe(params => {
            this.weeklyControlId = params.get('id');
            if (this.weeklyControlId) {
                this.weeklyControlService.get(this.weeklyControlId).subscribe({
                    next: (weeklyControl: WeeklyControl) => {
                        let initialDate = [weeklyControl.start_date, weeklyControl.end_date]
                        this.initFlatpickr(initialDate);
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
            } else {
                this.initFlatpickr();
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
