import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal
}
from '@angular/core';

import {
  FormControl
}
from '@angular/forms';

import {
  debounceTime,
  distinctUntilChanged
}
from 'rxjs';

import {
  User
}
from '../../../../core/models/user.model';

import {
  UsersService
}
from '../../../../core/services/users.service';

import {
  ToastService
}
from '../../../../core/services/toast.service';

import {
  UserTableComponent
}
from '../../components/user-table/user-table.component';

import {
  LoadingSpinnerComponent
}
from '../../../../shared/components/loading-spinner/loading-spinner.component';

import {
  UserFormDialogComponent
}
from '../../components/user-form-dialog/user-form-dialog.component';

import {
  MatDialog
}
from '@angular/material/dialog';

import {
  SHARED_IMPORTS
}
from '../../../../shared/shared-imports';

import {
  UsersStore
}
from '../../store/users.store';

import {
  exportUsersToCSV
}
from '../../../../core/utils/export.util';

@Component({
  selector: 'app-users-list',

  standalone: true,

  imports: [
    UserTableComponent,
    LoadingSpinnerComponent,
    SHARED_IMPORTS
  ],

  templateUrl:
    './users-list.component.html',

  styleUrl:
    './users-list.component.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush
})

export class UsersListComponent
implements OnInit {

  private usersStore =
    inject(UsersStore);

  private usersService =
    inject(UsersService);

  private toastService =
    inject(ToastService);

  private dialog =
    inject(MatDialog);

  searchControl =
    new FormControl('');

  searchTerm =
    signal('');

  sortDirection =
    signal<'asc' | 'desc'>(
      'asc'
    );

  users =
    this.usersStore.users;

  loading =
    this.usersStore.loading;

  error =
    this.usersStore.error;

  filteredUsers =
    computed(() => {

      const term =
        this.searchTerm()
          .toLowerCase();

      const filtered =
        this.users()
          .filter(user =>

            user.name
              .toLowerCase()
              .includes(term)

          );

      return filtered.sort(
        (a, b) =>

          this.sortDirection()
          === 'asc'

          ? a.name.localeCompare(
              b.name
            )

          : b.name.localeCompare(
              a.name
            )

      );

    });

  ngOnInit(): void {

    this.usersStore.loadUsers();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {

        this.searchTerm.set(
          value || ''
        );

      });

  }

  openCreateDialog() {

    const dialogRef =
      this.dialog.open(
        UserFormDialogComponent
      );

    dialogRef.afterClosed()
      .subscribe(result => {

        if(result) {

          this.usersService
            .addUser(result)
            .subscribe(() => {

              this.usersStore.loadUsers();

              this.toastService.success(
                'User added successfully'
              );

            });

        }

      });

  }

  openEditDialog(
    user: User
  ) {

    const dialogRef =
      this.dialog.open(
        UserFormDialogComponent,
        {
          data: user
        }
      );

    dialogRef.afterClosed()
      .subscribe(result => {

        if(result) {

          this.usersService
            .updateUser({
              ...user,
              ...result
            })
            .subscribe(() => {

              this.usersStore.loadUsers();

              this.toastService.success(
                'User updated successfully'
              );

            });

        }

      });

  }

  deleteUser(
    id: number
  ) {

    const confirmed =
      confirm(
        'Delete this user?'
      );

    if(!confirmed) {
      return;
    }

    this.usersService
      .deleteUser(id)
      .subscribe(() => {

        this.usersStore.loadUsers();

        this.toastService.success(
          'User deleted successfully'
        );

      });

  }

  toggleStatus(
    user: User
  ) {

    const updatedUser: User = {

      ...user,

      status:
        user.status === 'active'
          ? 'inactive'
          : 'active'

    };

    this.usersService
      .updateUser(updatedUser)
      .subscribe(() => {

        this.usersStore.loadUsers();

        this.toastService.success(
          'Status updated'
        );

      });

  }

  toggleSort() {

    this.sortDirection.update(
      value =>

        value === 'asc'
        ? 'desc'
        : 'asc'
    );

  }

  exportUsers() {

    exportUsersToCSV(
      this.filteredUsers()
    );

  }

}