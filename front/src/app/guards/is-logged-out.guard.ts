import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isLoggedOutGuard: CanActivateFn = (route, state) => {
  const token = document.cookie
    .split(';')
    .find((cookie) => cookie.includes('token'))
    ?.split('=')[1];

  if (token) {
    const router = inject(Router);
    router.navigate(['/']);

    return false;
  }
  return true;
};
