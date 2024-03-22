import { FormGroup } from "@angular/forms";
import { ElementRef, Renderer2 } from '@angular/core';

import { Observable } from "rxjs";


interface FormBase {
  setProperties<T>(serviceMethod: () => Observable<T[]>, property: keyof this): void;
}

export class FormBaseMixin implements FormBase {

  constructor(
    protected renderer: Renderer2,
    protected el: ElementRef
  ) {}

  setProperties<T>(serviceMethod: () => Observable<T[]>, property: keyof this): void {
    serviceMethod().subscribe({
      next: (data: T[]) => {
        (this[property] as any) = data;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  protected formDataFromFormGroup(formGroupValue: any): FormData {
    const formData = new FormData();
    for (const key of Object.keys(formGroupValue)) {
      const value = formGroupValue[key];
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    }
    return formData;
  }

  protected setInvalidFields(formGroup: FormGroup) {
    for (const controlName in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(controlName)) {
        const control = formGroup.get(controlName);
        if (control?.hasError('required')) {
          const inputElement = this.el.nativeElement.querySelector(`[formcontrolname="${controlName}"]`);
          this.renderer.addClass(inputElement, 'is-invalid');
        }
      }
    }
  }

  protected observeAllControlChanges(formGroup: FormGroup) {
    for (const controlName in formGroup.controls) {
        const control = formGroup.get(controlName);
        if (control) {
          control.valueChanges.subscribe(() => {
            const inputElement = this.el.nativeElement.querySelector(`[formcontrolname="${controlName}"].form-control`);
            this.renderer.removeClass(inputElement, 'is-invalid');
          });
        }
    }
  }

}
