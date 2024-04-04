import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Brand, Category, MeasureUnit } from './../../models/general_models';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { FormBaseMixin } from 'src/app/shared/mixins/form-base.mixin';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent extends FormBaseMixin {
  productForm!: FormGroup;
  subscription!: Subscription;

  brands: Brand[] = [];
  categories: Category[] = [];
  measureUnits: MeasureUnit[] = [];

  productId: string | any = null;
  labelValue: string = 'Un';
  image: string = '/assets/image-404.png';

  imageFile: File | any = null;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    renderer: Renderer2,
    el: ElementRef 
  ) {
    super(renderer, el);
    this.productForm = this.formBuilder.group({
      description: ['', Validators.required], 
      brand: ['', Validators.required],
      category: ['', Validators.required],
      image: [''],
      active: [true, Validators.required],
      measure_unit: ['', Validators.required],
      unit_quantity: ['', Validators.required],
    });

    this.observeAllControlChanges(this.productForm);

  }

  setBrands(): void {
    this.setProperties(() => this.productService.getBrands(), 'brands');
  }

  setCategories(): void {
    this.setProperties(() => this.productService.getCategories(), 'categories');
  }

  setMeasureUnits(): void {
    this.setProperties(() => this.productService.getMeasureUnit(), 'measureUnits');
  }

  setImageProduct(product: Product) {
    if(product.image){
      this.image = product.image;
    }
  }

  setProduct() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {

        this.productService.get(this.productId).subscribe({
          next: (product: Product) => {
            this.productForm.setValue({
              description: product.description,
              brand: product.brand.id,
              category: product.category.id,
              active: product.active,
              image: null,
              measure_unit: product.measure_unit.id,
              unit_quantity: product.unit_quantity,
            });
            this.setImageProduct(product)
          },
          error: (error: any) => {
            console.error(error);
          },
          complete: () => {}
        });
      }
    });
  }

  onOptionChange(event: any) {
    let option = event.target.options[event.target.selectedIndex];
    console.log("Opção selecionada:", option.getAttribute('data-abbreviation'));
    this.labelValue = option.getAttribute('data-abbreviation')
  }

  ngOnInit() {
    this.setBrands();
    this.setCategories();
    this.setMeasureUnits();
    this.setProduct();
  }

  save() {
    if (this.productForm.valid) {
      const formData = this.formDataFromFormGroup(this.productForm.value);
      if(this.imageFile){
        formData.append('image', this.imageFile);
      }
      this.productService.save(formData, this.productId).subscribe({
        next: (response: any) => {
          this.toastService.showToastSuccess('Produto', 'Produto salvo com sucesso!');
        },
        error: (error: any) => {
          console.log(error), 
          this.toastService.showToastDanger('Produto', 'Ocorreu um erro ao salvar o produto');
        },
        complete: () => {this.router.navigate(['/products'])}
      });

    } else {
      this.setInvalidFields(this.productForm);
    }
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
        this.back();
      }
    });
  }

  back() {
    this.router.navigate(['/products']);
  }

  onImageFileChange(file: File): void {
    this.imageFile = file;
  }
  
}
