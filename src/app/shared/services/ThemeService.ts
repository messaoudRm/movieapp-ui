import { DOCUMENT, inject, Injectable, signal } from '@angular/core';
import {Theme} from '../../models/Theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly currentTheme = signal<Theme>('light');

  constructor() {
    this.setTheme(this.getThemeInLocalStorage());

  }

  toggleTheme(theme : Theme){
    if(this.currentTheme() === 'light'){
      this.setTheme('dark');
    }
    else{
      this.setTheme('light');
    }
  }

  setTheme(theme : Theme){
    this.currentTheme.set(theme);
    if(theme === 'dark'){
      this.document.documentElement.classList.add('dark-mode');
    }
    else{
      this.document.documentElement.classList.remove('dark-mode');
    }
    this.setThemeInLocalStorage(theme);
  }

  setThemeInLocalStorage(theme : Theme){
    localStorage.setItem('current-theme',theme);
  }

  getThemeInLocalStorage(){
    return localStorage.getItem('current-theme') as Theme ?? 'light';
  }
}
