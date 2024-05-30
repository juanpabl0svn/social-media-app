import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import UserService from '../../services/user/user.service';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../landing/header/header.component';
import { ModalComponent } from '../modal/modal.component';
import { POST, POST_FORMDATA } from '../../utils/constants';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NewPostComponent } from './new-post/new-post.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    ModalComponent,
    EditProfileComponent,
    NewPostComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  editProfile: boolean = false;
  uploadPost: boolean = false;

  posts: any[] = [];
  followers: any[] = [];
  followingReq: any[] = [];
  postsCount: number = 0;

  constructor(public userService: UserService, private router: Router) {}

  async ngOnInit() {
    console.log(this.userService.user.id_user);
    const userData = await POST('/getMyData', {
      id_user: this.userService.user.id_user,
    });

    if (!userData) return;

    this.posts = userData.posts;
    this.postsCount = userData.posts.length;
    this.followers = userData.followers;
    this.followingReq = userData.followingReq;
  }

  signOut() {
    this.userService.signOut();
  }
}
