import { Injectable } from '@angular/core';
import { API } from '../../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import UserService from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient, private _userService:UserService) { }

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

  getUserFollows(){
    const userId = this._userService.getUser().userId;
    const url: string = `${API}/get_user_follows`;
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

  acceptFollow(followId: number){
    const url: string = `${API}/acceptFollow`;
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        withCredentials: 'true',
      }),
    };

    const body = {
      followId,
    };
    return this.http.post(url, body, headers);
  }

  rejectFollow(followId: number){
    const url: string = `${API}/rejectFollow`;
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        withCredentials: 'true',
      }),
    };

    const body = {
      followId,
    };
    return this.http.post(url, body, headers);
  }  
}
