import {
  Injectable,
  computed,
  inject,
  signal
}
from '@angular/core';
import { UsersService } from '../../../core/services/users.service';
import { User } from '../../../core/models/user.model';


@Injectable({
  providedIn: 'root'
})

export class UsersStore {

  private usersService =
    inject(UsersService);

  users =
    signal<User[]>([]);

  loading =
    signal(false);

  error =
    signal('');

  totalUsers =
    computed(() =>
      this.users().length
    );

  activeUsers =
    computed(() =>
      this.users().filter(
        user =>
          user.status === 'active'
      ).length
    );

  loadUsers() {

    this.loading.set(true);

    this.error.set('');

    this.usersService
      .getUsers()
      .subscribe({

        next: users => {

          this.users.set(users);

          this.loading.set(false);
        },

        error: () => {
          this.loading.set(false);
        }

      });

  }

}