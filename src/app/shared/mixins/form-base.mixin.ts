import { AbstractControl, FormGroup } from "@angular/forms";
import { ElementRef, Renderer2 } from '@angular/core';

import { Observable } from "rxjs";


interface FormBase {
  setProperties<T>(serviceMethod: () => Observable<T[]>, property: keyof this): void;
}

export class FormBaseMixin implements FormBase {

  constructor(
    protected renderer: Renderer2,
    protected el: ElementRef
  ) { }

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

  protected observeAllControlChanges(formGroup: FormGroup) {
    for (const controlName in formGroup.controls) {
      const control = formGroup.get(controlName);
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

  private handleControlValidation(control: AbstractControl | null, controlName: string): void {
    if (control?.hasError('required')) {
      const inputElement = this.el.nativeElement.querySelector(`[formcontrolname="${controlName}"]`);
      this.renderer.addClass(inputElement, 'is-invalid');
    }
  }

  private handleControlChange(control: AbstractControl | null, controlName: string): void {
    const inputElement = this.el.nativeElement.querySelector(`[formcontrolname="${controlName}"].form-control`);
    if (inputElement) {
      this.renderer.removeClass(inputElement, 'is-invalid');
    }
  }

}
