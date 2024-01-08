import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  date: Date = new Date();
  FullYear = this.date.getFullYear();

  constructor(private authService: AuthService, private router: Router){}

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
