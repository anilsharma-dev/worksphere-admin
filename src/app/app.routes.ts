import {
  Routes
}
from '@angular/router';

import {
  authGuard
}
from './core/guards/auth.guard';

import {
  roleGuard
}
from './core/guards/role.guard';

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

        canActivate: [
          roleGuard
        ],

        data: {
          role: 'admin'
        },

        loadComponent: () =>
          import(
            './features/users/pages/users-list/users-list.component'
          ).then(
            m => m.UsersListComponent
          )
      },

      {
        path: 'chat',

        loadComponent: () =>
          import(
            './features/chat/pages/chat-room/chat-room.component'
          ).then(
            m => m.ChatRoomComponent
          )
      },

      {
        path: 'settings',

        canActivate: [
          roleGuard
        ],

        data: {
          role: 'admin'
        },

        loadComponent: () =>
          import(
            './features/settings/pages/settings-page/settings-page.component'
          ).then(
            m => m.SettingsPageComponent
          )
      },

      {
        path: '**',

        redirectTo: ''
      }

    ]
  }

];