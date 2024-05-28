import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import UserService from '../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { POST } from '../utils/constants';

export const isLoggedInGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);
  const cookieService = inject(CookieService);

  if (userService.isAuth) return true;

  const token = cookieService.get('token');

  console.log(token);

  const router = inject(Router);

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const user = await POST('/verify', { token });

  if (user) {
    userService.user = user;
    userService.isAuth = true;
    return true;
  }

  router.navigate(['/login']);

  return false;
};
