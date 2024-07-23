import { UserService } from './../auth/services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/models/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  user!: User;
  date: Date = new Date();
  FullYear = this.date.getFullYear();
  env = environment;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.userService.getLoggedUser().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (err: any) => {console.error(err);}
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggle(): void {
    const sidebarToggle = document.getElementById('accordionSidebar');
    sidebarToggle?.classList.toggle('toggled');
  }

}
