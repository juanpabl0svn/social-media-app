import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { API } from '../../config';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export default class UserService {
  username: string = '';
  isAuth: boolean = false;
  userData: any = {};

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
    private router: Router
  ) {}

  get getUsername() {
    return this.username;
  }

  get getIsAuth() {
    return this.isAuth;
  }

  set setIsAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  set setUsername(username: string) {
    this.username = username;
  }

  fetchUser() {
    const userId = this._cookieService.get('userId');
    const url: string = `${API}/getUser`;

    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        withCredentials: 'true',
      }),
    };

    const body = {
      userId,
    };
    return this.http.post(url, body, headers);
  }

  getUser() {
    const username = this._cookieService.get('token');
    const userId = this._cookieService.get('userId');
    if (username && userId) {
      return { username: username, userId: userId };
    }
    return {};
  }

  updateUser(userData: {
    id_user: any;
    name: any;
    username: any;
    email: any;
    birth_date: any;
  }) {
    const url: string = `${API}/update_profile`;
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        withCredentials: 'true',
      }),
    };
    const body = {
      userData,
    };
    return this.http.post(url, body, headers)
  }

  logIn(username: string, password: string) {
    const url: string = `${API}/login`;

    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        withCredentials: 'true',
      }),
    };
    const body = {
      username,
      password,
    };
    return this.http.post(url, body, headers);
  }

  register(
    name: string,
    username: string,
    email: string,
    password: string,
    date: string
  ) {
    const url: string = `${API}/register`;

    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        withCredentials: 'true',
      }),
    };
    const body = {
      name,
      email,
      password,
      date,
      username,
    };

    return this.http.post(url, body, headers);
  }

  signOut() {
    this._cookieService.delete('token');
    this.router.navigate(['/login']);
  }

  searchUsers(searchString:string){
    const url: string = `${API}/search`
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        withCredentials: 'true',
      }),
    };
    const body = {
      searchString
    };
    return this.http.post(url, body, headers);
  }

  getOtherUser(userId:number){
    const url: string = `${API}/users/${userId}`;

    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        withCredentials: 'true',
      }),
    };
    return this.http.get(url, headers);
  }
}

