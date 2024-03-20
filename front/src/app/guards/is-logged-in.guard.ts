import { CanActivateFn } from '@angular/router';
import { DataService } from '../services/data.service';

const dataService = new DataService();

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const token = document.cookie
    .split(';')
    .find((cookie) => cookie.includes('token'));

  if (!token) {
    return false;
  }

  return true;
};
