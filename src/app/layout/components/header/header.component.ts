import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    
private authService = inject(AuthService);
private themeService = inject(ThemeService);

isDark = this.themeService.isDark;

logout() {
  this.authService.logout();
}
toggleTheme() {

  this.themeService.toggleTheme();
}
}
