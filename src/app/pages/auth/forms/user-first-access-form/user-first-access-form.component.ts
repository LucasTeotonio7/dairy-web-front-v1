import { Component, ElementRef, Renderer2 } from '@angular/core';

import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { FormBaseMixin } from 'src/app/shared/mixins/form-base.mixin';
import { User } from '../../models/user';
import { PasswordMatchValidator } from '../../validators/user.validator';

@Component({
  selector: 'app-user-first-access-form',
  templateUrl: './user-first-access-form.component.html',
  styleUrl: './user-first-access-form.component.css'
})
export class UserFirstAccessFormComponent extends FormBaseMixin {

  userForm!: FormGroup;
  passwordForm!: FormGroup;
  user!: User;
  passwordMismatch: boolean = false;
  passwordDone: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    renderer: Renderer2,
    el: ElementRef 
  ) {
    super(renderer, el);
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    }, { validator: PasswordMatchValidator });
  }

  getUser() {
    if (this.userForm.valid) {
      const formData = this.formDataFromFormGroup(this.userForm.value);

      const PARAMS = {
        username: formData.get('username')
      }

      this.userService.getUserNoValidate(PARAMS).subscribe({
        next: (user: User) => {
          this.user = user;
        },
        error: (error: any) => {
          if(error.status === 404) {
            this.toastService.showToastDanger('Usuário', 'Usuário não encontrado');
          } else {
            this.toastService.showToastDanger('Usuário', 'Ocorreu um erro ao buscar o usuário');
          }
        },
        complete: () => {}
      });

    } else {
      this.setInvalidFields(this.userForm);
    }
  }

  setPassword() {
    if (this.passwordForm.valid) {
      const formData = this.formDataFromFormGroup(this.passwordForm.value);

      this.userService.setPassword(formData, this.user.id).subscribe({
        next: () => {
          this.passwordDone = true;
        },
        error: (error: any) => {
          this.toastService.showToastDanger('Usuário', 'Ouve um erro');
        },
        complete: () => {}
      });

    } else {
      if (this.passwordForm.errors && this.passwordForm.errors['mismatch']) {
        this.passwordMismatch = true;
      }
      this.setInvalidFields(this.passwordForm);
    }
  }

}
