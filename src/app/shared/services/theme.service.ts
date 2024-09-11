import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkModeSubject = new Subject<boolean>();
  darkMode$ = this.darkModeSubject.asObservable();

  constructor() { }

  toggleDarkMode(isDarkMode: boolean) {
    this.darkModeSubject.next(isDarkMode);
  }

}
