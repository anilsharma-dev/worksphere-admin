import { Component, Input, Output, EventEmitter }
from '@angular/core';

import { CommonModule }
from '@angular/common';

import { User }
from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {

  @Input() users: User[] = [];

  @Output() edit =
    new EventEmitter<User>();

  @Output() delete =
    new EventEmitter<number>();

}