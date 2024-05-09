import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API } from '../../config';
import UserService from "../user/user.service";
import { CookieService } from "ngx-cookie-service";

@Injectable({providedIn: 'root'})
export default class PostService{
    constructor(private http:HttpClient, private _cookieService: CookieService){}

    get_all_post(){
        const url: string = `${API}/get_all_post`

        const headers = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
            })
        };
        return this.http.get(url,headers)
    }

    get_all_user_posts(){
        const userId = this._cookieService.get('userId')
        console.log(userId)
        const url: string = `${API}/get_all_post/${userId}`
        const headers = {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            })
        }
        return this.http.get(url, headers)
    }
}