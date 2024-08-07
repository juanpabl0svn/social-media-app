import { Component, Input } from '@angular/core';
import { IPOST, IUSER } from '../../../models/models';
import { LikeComponent } from '../svg/likes/like.component';
import { CommentComponent } from '../svg/comment/comment.component';
import UserService from '../../../services/user/user.service';
import { POST } from '../../../utils/constants';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [LikeComponent, CommentComponent, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  @Input() post!: IPOST;

  constructor(public userService: UserService) {}

  toggleLike() {
    let value = this.post?.hasLiked ?? false;

    this.post.hasLiked = !value;
    this.post.likes = value ? this.post.likes - 1 : this.post.likes + 1;
  }

  async setComment(id_post: number) {
    this.userService.id_post = id_post;

    const comments = await POST('/getComments', { id_post });

    this.userService.showComments = comments;
  }
}
