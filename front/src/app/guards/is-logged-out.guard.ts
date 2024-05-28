import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import UserService from '../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { POST } from '../utils/constants';

export const isLoggedOutGuard: CanActivateFn = async (route, state) => {
  const cookieService = inject(CookieService);

  const userService = inject(UserService);

  const token = cookieService.get('token');

  console.log(token)

  if (!token) return true;

  const user = await POST('/verify', { token });

  if (user) {
    userService.user = user;
    userService.isAuth = true;
    return false;
  }

  return true;
};
