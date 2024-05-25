import { Injectable } from '@angular/core';
import { API } from '../../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient) { }

  followReq(userReq:number, userToFollow:number){
    const url: string = `${API}/followreq`;

    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        withCredentials: 'true',
      }),
    };

    const body = {
      userReq,
      userToFollow
    };
    return this.http.post(url, body, headers);
  }
}
