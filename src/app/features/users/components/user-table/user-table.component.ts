import { Component, Input } from '@angular/core';


import { User } from '../../../../core/models/user.model';

@Component({
    selector: 'app-user-table',
    imports: [],
    templateUrl: './user-table.component.html',
    styleUrl: './user-table.component.scss'
})
export class UserTableComponent {

  @Input() users: User[] = [];

}