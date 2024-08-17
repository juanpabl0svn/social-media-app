import { Component } from '@angular/core';
import { PostsSkeletonComponent } from '../skeletons/posts/posts.component';
import { PostComponent } from '../post/post.component';
import UserService from '../../services/user/user.service';


@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostsSkeletonComponent, PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  constructor(public userService: UserService) {}

  skeleton: any[] = Array.from({ length: 10 });
}
