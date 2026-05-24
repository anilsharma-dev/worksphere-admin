import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  User
} from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {

  @Input()
  users: User[] = [];

  @Output()
  edit = new EventEmitter<User>();

  @Output()
  delete = new EventEmitter<number>();

  currentPage = 1;

  pageSize = 5;

  get startIndex() {
    return (this.currentPage - 1)
      * this.pageSize;
  }

  get endIndex() {
    return this.startIndex
      + this.pageSize;
  }

  get paginatedUsers() {

    return this.users.slice(
      this.startIndex,
      this.endIndex
    );

  }

  nextPage() {

    if(this.endIndex < this.users.length) {
      this.currentPage++;
    }

  }

  prevPage() {

    if(this.currentPage > 1) {
      this.currentPage--;
    }

  }

}