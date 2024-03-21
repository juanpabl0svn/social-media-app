import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import UserService from '../services/user/user.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const user = inject(UserService).isAuth;

  if (user) return true;

  const token = document.cookie
    .split(';')
    .find((cookie) => cookie.split('=')[0] === 'token')
    ?.split('=')[1];

  if (!token) {
    inject(Router).navigate(['/login']);
    return false;
  }

  return true;
};
