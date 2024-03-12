import { CanActivateFn } from '@angular/router';

export const isLoggedOutGuard: CanActivateFn = (route, state) => {
  return true;
};
