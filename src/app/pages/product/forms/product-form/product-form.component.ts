import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Router, CanActivateFn, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { Brand, Category, MeasureUnit } from './../../models/general_models';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  productForm!: FormGroup;
  subscription!: Subscription;

  brands: Brand[] = [];
  categories: Category[] = [];
  measureUnits: MeasureUnit[] = [];

  product_id: string | any = '';
  labelValue: string = 'Un';
  image: string = '/assets/image-404.png';

  imageFile!: File;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.formBuilder.group({
      description: ['', Validators.required], 
      brand: ['', Validators.required],
      category: ['', Validators.required],
      image: [''],
      active: [true, Validators.required],
      measure_unit: ['', Validators.required],
      unit_quantity: [1, Validators.required],
    });

  }
  
  // TODO:  refactor methods to avoid code repetition => setBrands(), setCategories(), setMeasureUnits();
  setBrands(): void {
    this.productService.getBrands().subscribe({
      next: (response) => {
        this.brands = response
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {}
    });
  }

  setCategories(): void {
    this.productService.getCategories().subscribe({
      next: (response) => {
        this.categories = response
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {}
    });
  }

  setMeasureUnits(): void {
    this.productService.getMeasureUnit().subscribe({
      next: (response) => {
        this.measureUnits = response
      },
      error: (error) => {
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
      this.product_id = params.get('id');
      if (this.product_id) {

        this.productService.get(this.product_id).subscribe({
          next: (product) => {
            this.productForm.setValue({
              description: product.description,
              brand: product.brand.id,
              category: product.category.id,
              active: product.active,
              image: product.image ?? '',
              measure_unit: product.measure_unit.id,
              unit_quantity: product.unit_quantity,
            });
            this.setImageProduct(product)
          },
          error: (error) => {
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
      const productForm = this.productForm.value;
      const formData = new FormData();
      formData.append('description', productForm.description);
      formData.append('brand', productForm.brand);
      formData.append('category', productForm.category);
      if(this.imageFile){
        formData.append('image', this.imageFile);
      }
      formData.append('active', productForm.active);
      formData.append('measure_unit', productForm.measure_unit);
      formData.append('unit_quantity', productForm.unit_quantity);

      if(this.product_id){
        this.productService.put(this.product_id, formData).subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            this.router.navigate(['/products']);
          }
        });
      } 
      else{
        this.productService.post(formData).subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            this.router.navigate(['/products']);
          }
        });
      }
      
      
    } else {
      //TODO: implement msg error in front 
      alert('Formulário inválido');
    }
  }

  back() {
    this.router.navigate(['/products']);
  }

  displaySelectedImage(event: Event, elementId: string): void {
      const selectedImage = document.getElementById(elementId) as HTMLImageElement;
      const fileInput = event.target as HTMLInputElement;

      if (fileInput.files && fileInput.files[0]) {
          const reader = new FileReader();

          reader.onload = function (e: ProgressEvent<FileReader>): void {
              selectedImage.src = e.target?.result as string;
          };

          reader.readAsDataURL(fileInput.files[0]);
          this.imageFile = fileInput.files[0];
      }
  }
  
}
