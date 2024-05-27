import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { isLoggedOutGuard } from './guards/is-logged-out.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { NewpostComponent } from './components/newpost/newpost.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { SearchComponent } from './components/search/search.component';
import { OthersProfileComponent } from './components/others-profile/others-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [isLoggedInGuard]
  },
  {
    path: 'profile/edit',
    component: EditprofileComponent,
    canActivate: [isLoggedInGuard]
  },
  {
    path: 'newpost',
    component: NewpostComponent,
    canActivate:[isLoggedInGuard]
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate:[isLoggedInGuard]
  },
  {
    path: 'users/:userId',
    component: OthersProfileComponent,
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
];
