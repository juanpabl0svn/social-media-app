import { Component, Input } from '@angular/core';
import { LikeComponent } from '../svg/likes/like.component';
import { CommentComponent } from '../svg/comment/comment.component';
import { RouterLink } from '@angular/router';
import { IPOST } from '../../models/models';
import UserService from '../../services/user/user.service';
import { GET, POST } from '../../utils/constants';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [LikeComponent, CommentComponent, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  @Input() post!: IPOST;

  constructor(public userService: UserService) { }

  toggleLike() {
    let value = !this.post?.likedByUser
    this.post.likedByUser = value;
    this.post.likes_count = value ? this.post.likes_count + 1 : this.post.likes_count - 1;
    POST('/likes',{
      id_post: this.post.id_post,
      id_user: this.userService.user.id_user,
      like: value
    });
  }

  async setComment(id_post: number) {
    this.userService.id_post = id_post;

    const comments = await GET('/comments/' + id_post);

    this.userService.showComments = comments;
  }
}
