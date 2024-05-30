import { Component } from '@angular/core';
import UserService from '../../../services/user/user.service';
import { POST_FORMDATA } from '../../../utils/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {
  image: File | null = null;

  bg_img: string = '';

  constructor(private userService: UserService, private router: Router) {}

  handleChangeImage(e: Event) {
    const file = (e.target as HTMLInputElement)?.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    this.image = file;

    reader.onload = () => {
      this.bg_img = reader.result as string;

      const container = document.querySelector('#image-box');

      if (!container) return;

      container.innerHTML = `<img src="${this.bg_img}" alt="profile-image" class='w-full aspect-square' />`;
    };
  }

  async handleSubmitPost(e: Event) {
    e.preventDefault();

    const { description } = e.target as HTMLFormElement;

    if (!description.value) {
      return;
    }

    const formData = new FormData();
    formData.set('description', description.value);
    formData.set('file', this.image as File);
    formData.set('user_id', this.userService.user.id_user);
    const response = await POST_FORMDATA('/create_post', formData);
    this.router.navigate(['/profile']);
  }
}
