import { Component } from '@angular/core';
import { IUSER } from '../../models/models';
import { CookieService } from 'ngx-cookie-service';
import UserService from '../../services/user/user.service';
import { RouterLink } from '@angular/router';
import { API } from '../../config';
import PostService from '../../services/post/post.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  renderSkeleton: number[] = Array(10).fill(0);
  posts: any = [];

  constructor(
    private _cookieService: CookieService,
    private _userService: UserService,
    private _postService: PostService
  ) {}

  ngOnInit() {
    this._postService.get_all_post().subscribe((response: any) => {
      console.log(response.data)
      this.posts = response.data;
    });
  }
}
