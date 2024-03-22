import { FormGroup } from "@angular/forms";
import { Component, ElementRef, Renderer2 } from '@angular/core';

export class FormBaseMixin {

  constructor(
    protected renderer: Renderer2,
    protected el: ElementRef
  ) {}

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
