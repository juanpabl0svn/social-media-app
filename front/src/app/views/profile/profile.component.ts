import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import UserService from '../../services/user/user.service';
import { Router, RouterLink } from '@angular/router';
import { GET, POST, handleCloseModal } from '../../utils/constants';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NewPostComponent } from './new-post/new-post.component';
import { IPOST } from '../../models/models';

import { HeaderComponent } from '../../global/header/header.component';
import { ModalComponent } from '../../global/modal/modal.component';
import { ModalPostComponent } from '../../components/modal-post/modal-post.component';


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
    ModalPostComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  editProfile: boolean = false;
  uploadPost: boolean = false;

  posts: IPOST[] = [];
  followers: number = 0;
  following: number = 0;
  postsCount: number = 0;

  constructor(public userService: UserService, private router: Router) { }

  showPost: IPOST | null = null;

  async ngOnInit() {
    const userData = await GET(`/user/me/${this.userService.user.id_user}`);

    if (!userData) return;

    this.posts = (userData.posts as Array<any>).reverse();
    this.postsCount = userData.posts.length;
    this.followers = userData.followers;
    this.following = userData.following;
  }


  close() {
    handleCloseModal(() => {
      this.uploadPost = false;
    });
  }

  addNewPost(post: IPOST) {
    this.posts.unshift(post);
    this.postsCount++;
  }

  signOut() {
    this.userService.signOut();
  }
}
