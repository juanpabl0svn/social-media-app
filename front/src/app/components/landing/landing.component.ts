import { Component } from '@angular/core';
import { IUSER } from '../../models/models';
import { CookieService } from 'ngx-cookie-service';
import UserService from '../../services/user/user.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  listOfPeople: IUSER[] = [];
  renderSkeleton: number[] = Array(10).fill(0);

  constructor(private _cookieService: CookieService, private _userService:UserService) {}

  ngOnInit() {
    fetch('https://randomuser.me/api/?results=10')
      .then((response) => response.json())
      .then(({ results }) => (this.listOfPeople = results))
      .catch(null);
  }

  signOut(){
    this._userService.signOut()
  }
}
