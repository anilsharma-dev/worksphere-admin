import { Component,inject,signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';



@Component({
  selector:
    'app-notification-dropdown',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './notification-dropdown.component.html',

  styleUrl:
    './notification-dropdown.component.scss'
})

export class
NotificationDropdownComponent {

  private notificationService = inject(NotificationService);

  isOpen = signal(false);

  notifications = this.notificationService.notifications;

  unreadCount = this.notificationService.unreadCount;

  toggleDropdown() {

    this.isOpen.update(
      value => !value
    );

  }

  markAsRead(
    id: number
  ) {

    this.notificationService.markAsRead(id);

  }

}