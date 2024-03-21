import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendReqService {
  constructor(private http: HttpClient) {}

  logInReq(username: string | null | undefined, password: string | null | undefined) {
    if(!username || !password) { return }
    const url: string = 'http://localhost:5000/login';
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const payload = {
      username: username,
      password: password,
    };

    return this.http.post(url, payload, { headers: headers })
  }
}
