import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject
}
from '@angular/core';

import {
  User
}
from '../../../../core/models/user.model';

import {
  AuthService
}
from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-table',

  standalone: true,
  imports: [CommonModule],

  templateUrl:
    './user-table.component.html',

  styleUrl:
    './user-table.component.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush
})

export class UserTableComponent {

  private authService = inject(AuthService);

  currentRole = this.authService.currentUserRole;

  @Input()users: User[] = [];

  @Output() edit = new EventEmitter<User>();

  @Output()delete = new EventEmitter<number>();

  @Output() statusChange = new EventEmitter<User>();

  @Input() loading = false;

  currentPage = 1;

  pageSize = 5;

  get startIndex(): number {

    return (
      (this.currentPage - 1)
      * this.pageSize
    );

  }

  get endIndex(): number {

    return (
      this.startIndex
      + this.pageSize
    );

  }

  get paginatedUsers(): User[] {

    return this.users.slice(
      this.startIndex,
      this.endIndex
    );

  }

  nextPage() {

    if(
      this.endIndex
      < this.users.length
    ) {

      this.currentPage++;
    }

  }

  prevPage() {

    if(this.currentPage > 1) {

      this.currentPage--;
    }

  }

  trackByUser(
    index: number,
    user: User
  ) {

    return user.id;

  }

}