import { Component } from '@angular/core';
import UserService from '../../services/user/user.service';
import { Router } from 'express';
import { IPOST } from '../../models/models';
import { POST } from '../../utils/constants';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-search',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-search.component.html',
  styleUrl: './profile-search.component.css',
})
export class ProfileSearchComponent {
  posts: IPOST[] = [];
  followers: number = 0;
  following: number = 0;
  postsCount: number = 0;

  state: string = '';

  username: string = '';

  constructor(public path: ActivatedRoute, private userService: UserService) {}

  async ngOnInit() {
    this.path.paramMap.subscribe(async (params) => {
      const userData = await POST('/getUserData', {
        id_user: params,
      });

      if (!userData) return;

      this.posts = userData.posts;
      this.postsCount = userData.posts.length;
      this.followers = userData.followers;
      this.following = userData.following;

      this.state = userData.isFollowing;

      this.username = userData.username;
    });
  }
}
