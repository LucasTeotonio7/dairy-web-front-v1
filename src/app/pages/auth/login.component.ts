import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './models/user';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  subscription!: Subscription;
  messageError = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], 
      password: ['', Validators.required],
    });
  }

  login(): void {
    const formData = this.loginForm.value;
    const user: User = {
      username: formData.username,
      password: formData.password
    };

    this.subscription = this.authService.authenticate(user).subscribe({
      next: (response) => {
        this.tokenService.saveToken(response.token);
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.messageError = true;
        setTimeout(() => {
          this.messageError = false;
        }, 5000);
      },
      complete: () => {}
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
