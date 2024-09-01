import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import flatpickr from "flatpickr";
import { Options } from "flatpickr/dist/types/options"
import { Portuguese } from "flatpickr/dist/l10n/pt.js"

import { FormBaseMixin } from 'src/app/shared/mixins/form-base.mixin';
import { Product } from 'src/app/pages/product/models/product';
import { ProductService } from 'src/app/pages/product/services/product.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { validateWeekWith7days } from '../../validators/date.validator';
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
    weeklyControl!: WeeklyControl;
    products: Product[] = [];
    flatpickrOptions: Options = {};

    constructor(
        private weeklyControlService: WeeklyControlService,
        private productService: ProductService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toastService: ToastService,
        renderer: Renderer2,
        el: ElementRef
    ) {
        super(renderer, el);
        this.weeklyControlForm = this.formBuilder.group({
            start_date: [''],
            end_date: [''],
            date_range: ['', [Validators.required, validateWeekWith7days()]],
            is_closed: [false],
            product: ['', Validators.required]
        });
        this.observeAllControlChanges(this.weeklyControlForm);
    }

    initFlatpickr(defaultDate?: any, noCalendar=false): void {
        let element = document.getElementById('range-date') as HTMLInputElement;
        this.removeFlatpickrTheme();
        const theme = document.documentElement.classList.contains('dark');
        if (theme) {
            this.loadFlatpickrDarkTheme();
        }
        this.flatpickrOptions = {
            mode: "range",
            altFormat: "l d/m",
            dateFormat: "Y-m-d",
            altInput: true,
            locale: Portuguese,
            defaultDate: defaultDate,
            noCalendar: noCalendar
        }
        flatpickr(element, this.flatpickrOptions);
    }

    loadFlatpickrDarkTheme(): void {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/dark.css';
        linkElement.id = 'flatpickr-theme';
        document.head.appendChild(linkElement);
    }

    removeFlatpickrTheme(): void {
        const existingTheme = document.getElementById('flatpickr-theme');
        if (existingTheme) {
            existingTheme.remove();
        }
    }

    setProducts(): void {
        let params = { default_table: true }
        this.productService.listAll(params).subscribe({
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
        if(dateRangeString.length > 20){
            var dates = dateRangeString.split(' até ');
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
                        this.weeklyControl = weeklyControl;
                        let initialDate = [weeklyControl.start_date, weeklyControl.end_date]
                        
                        this.weeklyControlForm.setValue({
                            start_date: weeklyControl.start_date,
                            end_date: weeklyControl.end_date,
                            date_range: initialDate,
                            is_closed: weeklyControl.is_closed,
                            product: weeklyControl.product
                        });

                        if (weeklyControl.purchase_exists) {
                            const dateRangeControl = this.weeklyControlForm.get('date_range');
                            const productControl = this.weeklyControlForm.get('product');
                            productControl!.disable();
                            dateRangeControl!.disable();
                            this.initFlatpickr(initialDate, true);
                        } else {
                            this.initFlatpickr(initialDate);
                        }
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
            this.weeklyControlService.save(weeklyControlForm, this.weeklyControlId, true).subscribe({
                next: (reponse: any) => {
                    this.toastService.showToastSuccess('Planilha', 'Planilha salva com sucesso!');
                },
                error: (error: any) => {
                    if(error.status == 403) {
                        this.toastService.showToastDanger('Planilha inválida', 'Você não tem permissão alterar essa planilha');
                    } else {
                        this.toastService.showToastDanger('Planilha inválida', 'Aconteceu um erro ao salvar a planilha');
                    }
                },
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
                this.toastService.showToastSuccess('Planilha', 'Planilha excluída!');
            },
            error: (error) => {
                if(error.status == 403) {
                    this.toastService.showToastDanger('Planilha inválida', 'Você não tem permissão excluir essa planilha');
                } else {
                    this.toastService.showToastDanger('Planilha inválida', 'Aconteceu um erro ao excluir a planilha');
                }
            },
            complete: () => {
                this.back();
            }
        });
    }
}
