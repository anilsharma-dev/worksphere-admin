import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { UsersService } from '../../../../core/services/users.service';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { signal } from '@angular/core';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { MatDialog, MatDialogModule }
from '@angular/material/dialog';

import { UserFormDialogComponent }
from '../../components/user-form-dialog/user-form-dialog.component';
import { MatSnackBar }
from '@angular/material/snack-bar';


import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs';
import {
  ChangeDetectionStrategy
}
from '@angular/core';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';
import { ToastService } from '../../../../core/services/toast.service';
import { UsersStore } from '../../store/users.store';

@Component({
    selector: 'app-users-list',
    imports: [
        UserTableComponent,
        UserTableComponent,
        LoadingSpinnerComponent,
        SHARED_IMPORTS
    ],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    changeDetection:
    ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {

  users_list: User[] = [];
  searchControl = new FormControl('');
  filteredUsers: User[] = [];
  isLoading = signal(false);
  private usersStore = inject(UsersStore);

users =
  this.usersStore.users;

loading =
  this.usersStore.loading;

error =
  this.usersStore.error;

  constructor(
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private toastService:ToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {

  this.isLoading.set(true);

  this.usersService.getUsers()
    .subscribe({

      next: (data) => {

        this.users_list = data;
        this.filteredUsers = data;

        this.searchControl.valueChanges
  .pipe(
    debounceTime(400),
    distinctUntilChanged()
  )
  .subscribe(value => {

          this.filteredUsers =
            this.users_list.filter(user =>

              user.name
                .toLowerCase()
                .includes(
                  value?.toLowerCase() || ''
                )
            );
        });

        this.isLoading.set(false);

      },

      error: () => {

        this.isLoading.set(false);

      }

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

            this.loadUsers();
        this.toastService.success(
            'User added successfully'
          );

          });

      }

    });

}
openEditDialog(user: User) {

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

            this.loadUsers();
            this.toastService.success(
              'User updated successfully'
            );

          });

      }

    });

}
deleteUser(id: number) {

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

      this.loadUsers();
      this.toastService.success(
        'User deleted successfully'
      );

    });

}
toggleStatus(user: User) {

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

      this.loadUsers();

      this.toastService.success(
        'Status updated'
      );

    });

}

}