import { UserService } from './../auth/services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/models/user';
import { ThemeService } from 'src/app/shared/services/theme.service';



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
  isDarkMode: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private userService: UserService,
    private themeService: ThemeService
  ){}

  ngOnInit(): void {
    this.getLoggedUser();
    this.getTheme();
  }

  getLoggedUser() {
    this.userService.getLoggedUser().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (err: any) => {console.error(err);}
    });
  }

  hasGroup(name: string): boolean {
    let groups = this.user.available_groups;
    return groups.some(group => group.name === name && this.user.groups.includes(group.id));
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

  getTheme() {
    const darkMode = localStorage.getItem('darkMode');
    this.isDarkMode = darkMode === 'true';
    const htmlElement = document.documentElement;
    if (this.isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }

  toggleDarkMode(event: any) {
    this.isDarkMode = event.target.checked;
    this.themeService.toggleDarkMode(this.isDarkMode);
    const htmlElement = document.documentElement;
    if (this.isDarkMode) {
      htmlElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }

}
