import { Component } from '@angular/core';
import UserService from '../../services/user/user.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  constructor(public userService: UserService) {}

  closeComments() {
    document.querySelector('#comments')?.classList.add('hide-comments');

    setTimeout(() => {
      this.userService.showComments = null;
    }, 300);
  }
}
