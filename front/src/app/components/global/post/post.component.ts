import { Component, Input } from '@angular/core';
import { IPOST, IUSER } from '../../../models/models';
import { LikeComponent } from '../svg/likes/like.component';
import { CommentComponent } from '../svg/comment/comment.component';
import UserService from '../../../services/user/user.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [LikeComponent, CommentComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  @Input() post!: IPOST;

  constructor(public userService: UserService) {}

  toggleLike(): void {
    const value = this.post.hasLiked;
    this.post.hasLiked = !value;
    this.post.likes = value ? this.post.likes - 1 : this.post.likes + 1;
  }

  showComments() {
    this.userService.showComments = this.post.comments;
  }
}
