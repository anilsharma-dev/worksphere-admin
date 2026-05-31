import {
  Injectable,
  signal
}
from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  isDark =
    signal(false);

  constructor() {

    const savedTheme =
      localStorage.getItem('theme');

    if(savedTheme === 'dark') {

      this.enableDarkMode();
    }

  }

  toggleTheme() {

    this.isDark()
      ? this.disableDarkMode()
      : this.enableDarkMode();
  }

  enableDarkMode() {

    document.body.classList.add(
      'dark-theme'
    );

    localStorage.setItem(
      'theme',
      'dark'
    );

    this.isDark.set(true);
  }

  disableDarkMode() {

    document.body.classList.remove(
      'dark-theme'
    );

    localStorage.setItem(
      'theme',
      'light'
    );

    this.isDark.set(false);
  }

}