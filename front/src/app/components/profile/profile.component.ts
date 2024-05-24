import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import UserService from '../../services/user/user.service';
import { RouterLink } from '@angular/router';
import PostService from '../../services/post/post.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  posts: any = [];
  user: any = null;
  constructor(
    private _userService: UserService,
    private _postService: PostService
  ) {}

  ngOnInit() {
    this._postService.get_all_user_posts().subscribe((response: any) => {
      this.posts = response.data;
    });
    this._userService.fetchUser().subscribe((user: any) => {
      this.user = user;
    });
  }

  signOut() {
    this._userService.signOut();
  }
}
