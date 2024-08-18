import { Component } from '@angular/core';

@Component({
  selector: 'app-posts-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsSkeletonComponent {
  skeleton: any[] = Array.from({ length: 2 });

}
