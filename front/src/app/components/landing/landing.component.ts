import { Component } from '@angular/core';
import { IUSER } from '../../models/models';
import { CookieService } from 'ngx-cookie-service';
import UserService from '../../services/user/user.service';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from '../global/posts/posts.component';
import { StoriesComponent } from '../global/stories/stories.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink,  HeaderComponent, PostsComponent, StoriesComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  listOfPeople: IUSER[] = [];
  renderSkeleton: number[] = Array(10).fill(0);

  constructor(
    private userService: UserService
  ) {}

  toggleLike(index: number): void {
    console.log(index)
    const lastValue = this.userService.posts[index].hasLiked;
    this.userService.posts[index].hasLiked = !lastValue;
  }

  ngOnInit() {
    this.userService.getPosts()
  }
  
}
