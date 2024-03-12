import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  username: string = '';
  password: string = '';
  loggedIn: boolean = false;

  constructor() {}

  setValues({
    username,
    password,
  }: {
    username: string | null | undefined;
    password: string | null | undefined;
  }) {
    if (username == null || password == null) return;

    this.username = username;
    this.password = password;
    this.loggedIn = true;
  }

  print() {

    console.log(this.username, this.password, this.loggedIn );
  }
}
