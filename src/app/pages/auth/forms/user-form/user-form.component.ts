import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormBaseMixin } from 'src/app/shared/mixins/form-base.mixin';
import { UserService } from '../../services/user.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent extends FormBaseMixin {
  userForm!: FormGroup;

  userId!: string | any;
  user!: User;
  image: string = '/assets/image-404.png';
  imageFile!: File;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    renderer: Renderer2,
    el: ElementRef 
  ) {
    super(renderer, el);
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      image: [''],
      is_active: [true],
      username: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.setUser();
  }

  setUser() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if (this.userId) {

        this.userService.get(this.userId).subscribe({
          next: (user: User) => {
            this.user = user;
            this.userForm.setValue({
              name: user.name,
              last_name: user.last_name,
              email: user.email,
              is_active: user.is_active,
              username: user.username,
              image: null
            });

            if(user.image){
              this.image = user.image;
            }
            
          },
          error: (error: any) => {
            console.error(error);
          },
          complete: () => {}
        });
      }
    });
  }

  save(): void {
    if (this.userForm.valid) {
      const formData = this.formDataFromFormGroup(this.userForm.value);
      if(this.imageFile){
        formData.append('image', this.imageFile);
      }
      if(!this.user) {
        formData.set('is_active', 'false');
      }
      this.userService.save(formData, this.userId, true).subscribe({
        next: (response: any) => {
          this.toastService.showToastSuccess('Usuário', 'Usuário salvo com sucesso!');
        },
        error: (error: any) => {
          console.log(error), 
          this.toastService.showToastDanger('Usuário', 'Ocorreu um erro ao salvar o usuário');
        },
        complete: () => {this.back()}
      });

    } else {
      this.setInvalidFields(this.userForm);
    }
  }

  delete() : void {
    this.userService.delete(this.userId).subscribe({
      next: (response) => {
        this.toastService.showToastSuccess('Usuário', 'Usuário excluído com sucesso!');
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.back();
      }
    });
  }

  back(): void {
    this.router.navigate(['/users'])
  }

  setImage(file: File): void {
    this.imageFile = file;
  }

}
