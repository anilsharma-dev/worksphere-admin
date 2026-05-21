import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
   {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-home/dashboard-home.component')
            .then(m => m.DashboardHomeComponent)
      },
      {
        path: 'users',
        loadComponent: () =>
        import('./features/users/pages/users-list/users-list.component').then(m => m.UsersListComponent)
      },
      {
        path: 'chat',
        loadComponent: () =>
          import('./features/chat/pages/chat-room/chat-room.component')
            .then(m => m.ChatRoomComponent)
      }
    ]
  },
  
];
