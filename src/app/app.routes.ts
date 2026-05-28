import {
  Routes
}
from '@angular/router';
import { authGuard } from './core/guards/auth.guard';



export const routes:
Routes = [

  {
    path: 'login',

    loadComponent: () =>
      import(
        './features/auth/pages/login/login.component'
      ).then(
        m => m.LoginComponent
      )
  },

  {
    path: '',

    canActivate: [
      authGuard
    ],

    loadComponent: () =>
      import(
        './layout/layout/layout.component'
      ).then(
        m => m.LayoutComponent
      ),

    children: [

      {
        path: '',

        loadComponent: () =>
          import(
            './features/dashboard/pages/dashboard-home/dashboard-home.component'
          ).then(
            m => m.DashboardHomeComponent
          )
      },

      {
        path: 'users',

        loadComponent: () =>
          import(
            './features/users/pages/users-list/users-list.component'
          ).then(
            m => m.UsersListComponent
          )
      }

    ]
  }

];