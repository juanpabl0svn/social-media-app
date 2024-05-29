import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { ICOMMENT, IPOST } from '../../models/models';
import { POST } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export default class UserService {
  username: string = 'Juan pablo';
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

  getPosts() {
    this.http
      .get<{ results: any }>('https://randomuser.me/api/?results=10')
      .subscribe((posts) => {
        const postsFixed = posts.results.map((result: any) => ({
          ...result,
          hasLiked: false,
          likes: 0,
          comments: [
            {
              id: 1,
              image: '',
              username: 'mi mami',
              content: 'Este es un comentario de prueba',
            },
          ],
        }));
        this.posts = postsFixed as IPOST[];
      });
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

  searchUsers(searchString: string) {}

  getOtherUser(userId: number) {}
}
