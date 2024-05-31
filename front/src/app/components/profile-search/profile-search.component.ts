import { Component } from '@angular/core';
import UserService from '../../services/user/user.service';
import { IPOST } from '../../models/models';
import { POST } from '../../utils/constants';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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

  id_user: number = 0;

  constructor(
    public path: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.path.params.subscribe(async (params) => {
      if (params['id_user'] == this.userService.user.id_user)
        return this.router.navigate(['/profile']);

      const userData = await POST('/getUserData', {
        id_user: params['id_user'],
        id_user_follower: this.userService.user.id_user,
      });

      if (!userData) return;

      this.posts = userData.posts.reverse();
      this.postsCount = userData.posts.length;
      this.followers = userData.followers;
      this.following = userData.following;

      this.state = userData.isFollowing.state;

      this.username = userData.username;

      this.id_user = params['id_user'];

      return;
    });
  }

  async follow() {
    const isFollowing = await POST('/follow', {
      id_user: this.id_user,
      id_user_follower: this.userService.user.id_user,
    });

    if (!isFollowing) return;

    this.state = 'pending';
  }
}
