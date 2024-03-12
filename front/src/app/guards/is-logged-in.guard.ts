import { CanActivateFn } from '@angular/router';
import { DataService } from '../services/data.service';

const dataService = new DataService();

export const isLoggedInGuard: CanActivateFn = (route, state) => {

  // TODO: dataServices tiene un atributo llamado loggedIn, si es verdadero retornar true, de lo contrario retornar false, pero no coje bien el valor, mira a ver que pasa

  return true;
};
