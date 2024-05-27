import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import UserService from '../../services/user/user.service';
import { FollowService } from '../../services/follow/follow.service';

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
    private _followService: FollowService
  ) {}

  getFollowData(
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
      for(let i:number = 0; i < this.usersList; i++){
        const newObj:any = {}
        if(data[i].id_user_follower === parseInt(userId)){
          newObj['user_id'] = data[i].id_user
          newObj['status'] = data[i].state
        }else if(data[i].id_user === parseInt(userId) && data[i].state === 'pending'){
          newObj['user_id'] = data[i].id_user_follower
          newObj['status'] = 'pending_me'
        }else if(data[i].id_user === parseInt(userId)){
          newObj['user_id'] = data[i].id_user_follower
          newObj['status'] = data[i].state
        }
        followingList.push(newObj);
      }

      return followingList
    } else {
      return [];
    }
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const { search_text } = this.searchForm.value;
    if (search_text) {
      this._userService.searchUsers(search_text).subscribe((response: any) => {
        this.usersList = response.users;
      });
      this._followService.getUserFollows().subscribe((response: any) => {
        this.followingList = this.getFollowData(response.result);
      });
    }
  }

  onFollow(userToFollow: number) {
    const { userId } = this._userService.getUser();
    if (userId && userToFollow) {
      this._followService
        .followReq(parseInt(userId), userToFollow)
        .subscribe(() => {
          this._followService.getUserFollows().subscribe((response: any) => {
            this.followingList = this.getFollowData(response.result);
          });
        });
    }
  }
}
