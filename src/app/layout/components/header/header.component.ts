import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { Router } from '@angular/router';
import { NotificationDropdownComponent } from '../../../shared/components/notification-dropdown/notification-dropdown.component';

@Component({
    selector: 'app-header',
    imports: [NotificationDropdownComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
private router = inject(Router);
private authService = inject(AuthService);
private themeService = inject(ThemeService);

isDark = this.themeService.isDark;

logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}
toggleTheme() {

  this.themeService.toggleTheme();
}
changeRole(
  event: Event
) {

  const role =
    (
      event.target as HTMLSelectElement).value as

      'admin'
      | 'manager'
      | 'user';

  this.authService.changeRole(role);

}
}
