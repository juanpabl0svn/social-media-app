import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import UserService from '../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';

export const isLoggedOutGuard: CanActivateFn = (route, state) => {
  const _cookieService = inject(CookieService)
  const token = _cookieService.get('token')

  if (token) {
    inject(Router).navigate(['/']);

    return false;
  }
  return true;
};
