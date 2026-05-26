import { Component, OnInit } from '@angular/core';
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

  users: User[] = [];
  searchControl = new FormControl('');
  filteredUsers: User[] = [];
  isLoading = signal(false);


  constructor(
    private usersService: UsersService,
    private snackBar: MatSnackBar,
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

        this.users = data;
        this.filteredUsers = data;

        this.searchControl.valueChanges
  .pipe(
    debounceTime(400),
    distinctUntilChanged()
  )
  .subscribe(value => {

          this.filteredUsers =
            this.users.filter(user =>

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
            this.snackBar.open(
            'User added successfully',
            'Close',
            {
              duration: 3000
            }
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
            this.snackBar.open(
            'User updated successfully',
            'Close',
            {
              duration: 3000
            }
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
            this.snackBar.open(
        'User deleted successfully',
        'Close',
        {
          duration: 3000
        }
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

      this.snackBar.open(
        'Status updated',
        'Close',
        {
          duration: 3000
        }
      );

    });

}

}