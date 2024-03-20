import { CanActivateFn, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { inject } from '@angular/core';


const dataService = new DataService();

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const token = document.cookie
    .split(';')
    .find((cookie) => cookie.includes('token'));

  if (!token) {
    inject(Router).navigate(['/'])
    return false;
  }

  return true;
};
