import { Component } from '@angular/core';
import { IUSER } from '../../models/models';
import { CookieService } from 'ngx-cookie-service';
import UserService from '../../services/user/user.service';
import { RouterLink } from '@angular/router';
import { CommentComponent } from '../global/svg/comment/comment.component';
import { LikeComponent } from '../global/svg/likes/like.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, CommentComponent, LikeComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  listOfPeople: IUSER[] = [];
  renderSkeleton: number[] = Array(10).fill(0);

  constructor(
    private _cookieService: CookieService,
    private _userService: UserService
  ) {}

  ngOnInit() {
    fetch('https://randomuser.me/api/?results=10')
      .then((response) => response.json())
      .then(({ results }: { results: IUSER[] }) => {
        results.forEach((user) =>
          this.listOfPeople.push({ ...user, hasLiked: false })
        );
      })
      .catch(null);
  }
}
