import { Component, OnInit } from '@angular/core';

import { User } from '../../../../core/models/user.model';
import { UsersService } from '../../../../core/services/users.service';

import { UserTableComponent } from '../../components/user-table/user-table.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { signal } from '@angular/core';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
    selector: 'app-users-list',
    imports: [
        UserTableComponent,
        UserTableComponent,
        ReactiveFormsModule,
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
    private usersService: UsersService
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

}