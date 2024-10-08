import { Component } from '@angular/core';
import UserService from '../../services/user/user.service';
import { IPOST } from '../../models/models';
import { POST } from '../../utils/constants';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ModalPostComponent } from '../../components/modal-post/modal-post.component';
import { ModalComponent } from '../../global/modal/modal.component';



@Component({
  selector: 'app-profile-search',
  standalone: true,
  imports: [RouterLink, ModalComponent, ModalPostComponent],
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

  showPost: IPOST | null = null;

  loading: boolean = false;


  constructor(
    public path: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.path.params.subscribe(async (params) => {
      if (params['id_user'] == this.userService.user.id_user)
        return this.router.navigate(['/profile']);

      const userData = await POST('/user/user_data', {
        id_user: params['id_user'],
        id_user_visitor: this.userService.user.id_user,
      });

      if (!userData) return this.router.navigate(['/']) ;


      this.posts = userData.posts.reverse();
      this.postsCount = userData.posts.length;
      this.followers = userData.followers;
      this.following = userData.following;

      this.state = userData.isFollowing?.state || false;

      this.username = userData.username;

      this.id_user = params['id_user'];

      return;
    });
  }

  async follow() {
    this.loading = true;
    this.state = 'PENDING';
    const isFollowing = await POST('/user/follow', {
      id_user: this.id_user,
      id_user_follower: this.userService.user.id_user,
    });


    //If error, set state to '' because nothing happened
    if (!isFollowing) {
      this.state = '';
    }
    this.loading = false;

  }

  followTest() {
    this.followers += 1;
    this.state = 'PENDING';
  }


  async unfollow() {
    this.loading = true;
    const lastValue = this.state;
    this.state = '';
    const isFollowing = await POST('/user/unfollow', {
      id_user: this.id_user,
      id_user_follower: this.userService.user.id_user,
    });
    
    if (!isFollowing) {
      this.state = lastValue;
    }

    if (this.followers > 0){
      this.followers -= 1;
    }

    this.loading = false;

  }

  unfollowTest() {
    this.followers -= 1;
    this.state = '';
  }
}
