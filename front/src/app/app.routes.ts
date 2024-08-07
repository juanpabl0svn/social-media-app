import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { LandingComponent } from './views/landing/landing.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { isLoggedOutGuard } from './guards/is-logged-out.guard';
import { ProfileComponent } from './views/profile/profile.component';
import { ProfileSearchComponent } from './views/profile-search/profile-search.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [isLoggedOutGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [isLoggedOutGuard],
  },
  {
    path: 'profile/:id_user',
    component: ProfileSearchComponent,
    canActivate: [isLoggedInGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
