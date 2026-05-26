import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import {
  catchError
} from 'rxjs/operators';

import {
  throwError
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers() {

  return this.http
    .get<User[]>(this.apiUrl)
    .pipe(

      catchError(error => {

        console.error(
          'API Error:',
          error
        );

        return throwError(
          () => error
        );

      })

    );

    }
  
  addUser(user: User) {
  return this.http.post<User>(
    this.apiUrl,
    user
  );
  }

  updateUser(user: User) {
    return this.http.put<User>(
      `${this.apiUrl}/${user.id}`,
      user
    );
  }

  deleteUser(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

}
