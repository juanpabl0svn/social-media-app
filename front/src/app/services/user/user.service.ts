import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { ICOMMENT, IPOST } from '../../models/models';
import { GET, POST } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export default class UserService {
  isAuth: boolean = false;

  user: any = {};

  showComments: ICOMMENT[] | null = null;

  posts: IPOST[] = [];

  id_post: number = 0;

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
    private router: Router
  ) {}

  get getIsAuth() {
    return this.isAuth;
  }

  set setIsAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  async getPosts() {
    this.posts = ((await GET(`/getPosts`)) as Array<IPOST>)?.reverse();
  }

  logIn(username: string, password: string) {
    return POST('/login', { username, password });
  }

  register(
    name: string,
    username: string,
    email: string,
    password: string,
    date: string
  ) {
    return POST('/register', { name, username, email, password, date });
  }

  signOut() {
    this._cookieService.delete('token');
    this.router.navigate(['/login']);
  }

  fetchUser() {
    const userId = this._cookieService.get('userId');
    const url: string = `/getUser`;

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
  }) {}
}
