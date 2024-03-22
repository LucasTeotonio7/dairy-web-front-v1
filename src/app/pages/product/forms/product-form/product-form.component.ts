import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { Brand, Category, MeasureUnit } from './../../models/general_models';
import { FormBaseMixin } from 'src/app/shared/mixins/form-base.mixin';

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
  
  // TODO:  refactor methods to avoid code repetition => setBrands(), setCategories(), setMeasureUnits();
  setBrands(): void {
    this.productService.getBrands().subscribe({
      next: (brands: Brand[]) => {
        this.brands = brands
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {}
    });
  }

  setCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {}
    });
  }

  setMeasureUnits(): void {
    this.productService.getMeasureUnit().subscribe({
      next: (measureUnits: MeasureUnit[]) => {
        this.measureUnits = measureUnits
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {}
    });
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
        next: (response: any) => {},
        error: (error: any) => {console.log(error)},
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
