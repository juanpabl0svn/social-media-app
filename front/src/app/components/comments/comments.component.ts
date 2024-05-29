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

  async ngOnInit() {
    const commentsInPost = await POST('/get_post_comments', {
      id_post: this.userService.id_post,
    });
  }

  handleKey(e: any) {
    if (e.key === 'Enter') {
      e.target.nextElementSibling.click();
      e.target.value = '';
    }
  }

  handleSubmit(e: any) {
    e.preventDefault();

    const content = e.target.content.value;

    if (!content) return alert('Please enter a comment');

    console.log(content);

    this.userService.showComments?.push({
      id: `${Math.random()}`,
      content,
      image: '',
      username: this.userService.getUsername,
    });
  }

  closeComments() {
    clearTimeout(this.timer);
    document.querySelector('#comments')?.classList.add('hide-comments');

    setTimeout(() => {
      this.userService.showComments = null;
    }, 300);
  }
}
