import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../config';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private http: HttpClient,
    private _cookieService: CookieService
  ) {}
  get_all_post() {
    const url: string = `${API}/get_all_post`;

    const headers = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this.http.get(url, headers);
  }

  get_all_user_posts() {
    const userId = this._cookieService.get('userId');
    const url: string = `${API}/get_all_post/${userId}`;
    const headers = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this.http.get(url, headers);
  }

  async createPost(formData: FormData) {
    const url: string = `${API}/create_post`;
    const response = await fetch(url, { method: 'POST', body: formData });
    return await response.json();
  }
}
