import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import UserService from '../../services/user/user.service';
import { FollowService } from '../../services/follow/follow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  usersList: any = [];
  loggedUser: any = null;
  followingList: any = [];

  searchForm = new FormGroup({
    search_text: new FormControl(''),
  });

  constructor(
    private _userService: UserService,
    private _followService: FollowService,
    private router: Router
  ) {}

  getFollowData(
    usersList: any,
    data: {
      id_follow: number;
      id_user: number;
      id_user_follower: number;
      request_date: string;
      request_update_date: string;
      state: string;
    }[]
  ): { user_id: number; status: string }[] {
    const { userId } = this._userService.getUser();
    const followingList = [];
    if (userId) {
      for (let i: number = 0; i < usersList.length; i++) {
        const newObj: any = {};
        if (data[i] && usersList[i].id_user === data[i].id_user) {
          newObj['user_id'] = data[i].id_user;
          newObj['status'] = data[i].state;
        } else {
          newObj['user_id'] = usersList[i].id_user;
          newObj['status'] = 'follow';
        }
        followingList.push(newObj);
      }
      return followingList;
    } else {
      return [];
    }
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const { search_text } = this.searchForm.value;
    if (search_text) {
      this._userService
        .searchUsers(search_text)
        .subscribe((responseUsers: any) => {
          this.usersList = responseUsers.users;
          this._followService
            .getUserFollows()
            .subscribe((responseFollows: any) => {
              this.followingList = this.getFollowData(
                responseUsers.users,
                responseFollows.result
              );
            });
        });
    }
  }

  onFollow(userToFollow: number) {
    const { userId } = this._userService.getUser();
    if (userId && userToFollow) {
      this._followService
        .followReq(parseInt(userId), userToFollow)
        .subscribe(() => {
          this.router.navigate(['/search'])
        });
    }
  }
}
