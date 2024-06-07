import { Component } from '@angular/core';
import UserService from '../../services/user/user.service';
import { POST } from '../../utils/constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  timer: NodeJS.Timeout = setTimeout(() => { }, 200);

  constructor(public userService: UserService, private toast: ToastrService) { }

  handleKey(e: any) {
    if (e.key === 'Enter') {
      e.target.nextElementSibling.click();
      e.target.value = '';
    }
  }

  ngOnInit() {
    console.log(this.userService.showComments);
  }

  async handleSubmit(e: any) {
    e.preventDefault();

    const comment = e.target.comment.value;

    console.log(comment);

    if (!comment.trim()) return this.toast.error('Ingrese un comentario');

    const isCommented = await POST('/comment', {
      id_user: this.userService.user.id_user,
      id_post: this.userService.id_post,
      comment,
    });

    if (!isCommented) {
      return this.toast.error('No sigues a esta persona');
    }

    console.log(isCommented)

    const username = this.userService.user.username;

    return this.userService.showComments?.push({ ...isCommented, users: { username } })


  }

  closeComments() {
    clearTimeout(this.timer);
    document.querySelector('#comments')?.classList.add('hide-comments');

    setTimeout(() => {
      this.userService.showComments = null;
    }, 300);
  }
}
