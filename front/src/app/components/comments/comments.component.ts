import { Component } from '@angular/core';
import UserService from '../../services/user/user.service';
import { POST } from '../../utils/constants';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  timer: NodeJS.Timeout = setTimeout(() => {}, 200);

  constructor(public userService: UserService) {}

  handleKey(e: any) {
    if (e.key === 'Enter') {
      e.target.nextElementSibling.click();
      e.target.value = '';
    }
  }

  async handleSubmit(e: any) {
    e.preventDefault();


    const comment = e.target.comment.value;

    if (!comment) return alert('Please enter a comment');



    const isCommented = await POST('/comment', {
      id_user: this.userService.user.id_user,
      id_post: this.userService.id_post,
      comment,
    });


    if (!isCommented) return;

    this.userService.showComments?.push(isCommented);

  }

  closeComments() {
    clearTimeout(this.timer);
    document.querySelector('#comments')?.classList.add('hide-comments');

    setTimeout(() => {
      this.userService.showComments = null;
    }, 300);
  }
}
