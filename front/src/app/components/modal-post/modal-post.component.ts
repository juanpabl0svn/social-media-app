import { Component, Input } from '@angular/core';
import { ICOMMENT, IPOST } from '../../models/models';
import { POST } from '../../utils/constants';
import UserService from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-modal-post',
  standalone: true,
  imports: [],
  templateUrl: './modal-post.component.html',
  styleUrl: './modal-post.component.css'
})
export class ModalPostComponent {

  constructor(private userService: UserService, private toast: ToastrService) {

  }

  @Input() post: IPOST = {} as IPOST;

  comments: ICOMMENT[] = []

  handleKey(e: any) {
    if (e.key === 'Enter') {
      e.target.nextElementSibling.click();
      e.target.value = '';
      e.preventDefault()
    }
  }

  async ngOnInit() {
    this.comments = await POST('/getComments', { id_post: this.post.id_post });

  }

  async handleSubmit(e: any) {
    e.preventDefault();

    const comment = e.target.comment.value;


    if (!comment.trim()) return this.toast.error('Ingrese un comentario');

    const isCommented = await POST('/comment', {
      id_user: this.userService.user.id_user,
      id_post: this.post.id_post,
      comment,
    });


    if (!isCommented) {
      return this.toast.error('No sigues a esta persona');
    }


    const username = this.userService.user.username;

    return this.comments.push({ ...isCommented, users: { username } })


  }

}
