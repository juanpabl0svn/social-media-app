import { Component } from '@angular/core';
import UserService from '../../../services/user/user.service';
import { LikeComponent } from '../svg/likes/like.component';
import { CommentComponent } from '../svg/comment/comment.component';
import { PostsSkeletonComponent } from '../skeletons/posts/posts.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [LikeComponent, CommentComponent, PostsSkeletonComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  constructor(public userService: UserService) {}

  skeleton: any[] = Array.from({ length: 10 });
}
