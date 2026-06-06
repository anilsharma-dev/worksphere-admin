import {
  Injectable,
  signal,
  computed
}
from '@angular/core';

export interface NotificationItem {

  id: number;

  title: string;

  message: string;

  read: boolean;

  time: string;

}

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  /* -------------------------------- */
  /* NOTIFICATION DROPDOWN STORE */
  /* -------------------------------- */

  notifications =
    signal<NotificationItem[]>([

      {
        id: 1,
        title: 'New User',
        message: 'Sarah joined the platform',
        read: false,
        time: '2m ago'
      },

      {
        id: 2,
        title: 'Server Backup',
        message: 'Backup completed successfully',
        read: false,
        time: '10m ago'
      },

      {
        id: 3,
        title: 'Analytics Ready',
        message: 'Monthly report generated',
        read: true,
        time: '1h ago'
      }

    ]);

  unreadCount =
    computed(() =>

      this.notifications()
        .filter(
          n => !n.read
        ).length

    );

  markAsRead(
    id: number
  ) {

    this.notifications.update(
      items =>

        items.map(item =>

          item.id === id

          ? {
              ...item,
              read: true
            }

          : item

        )

    );

  }

  addNotification(
    notification: NotificationItem
  ) {

    this.notifications.update(
      items => [

        notification,

        ...items

      ]
    );

  }

  /* -------------------------------- */
  /* TOAST NOTIFICATIONS */
  /* -------------------------------- */

  toastMessage =
    signal('');

  showToast =
    signal(false);

  success(
    message: string
  ) {

    this.toastMessage.set(
      message
    );

    this.showToast.set(true);

    setTimeout(() => {

      this.showToast.set(false);

    }, 3000);

  }

}