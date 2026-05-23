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

@Component({
    selector: 'app-users-list',
    imports: [
        UserTableComponent,
        UserTableComponent,
        ReactiveFormsModule,
        MatDialogModule,
        LoadingSpinnerComponent
    ],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  searchControl = new FormControl('');
  filteredUsers: User[] = [];
  isLoading = signal(false);


  constructor(
    private usersService: UsersService,
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

    });

}
}