import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import UserService from '../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const _userService = inject(UserService);
  const _cookieService = inject(CookieService)

  if (_userService.isAuth) return true;

  const token = _cookieService.get('token')

  if (!token) {
    inject(Router).navigate(['/login']);
    return false;
  }

  return true;
};
