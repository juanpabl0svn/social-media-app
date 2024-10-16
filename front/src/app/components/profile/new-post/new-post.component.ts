import { Component, EventEmitter, Output } from '@angular/core';
import UserService from '../../../services/user/user.service';

import { IPOST } from '../../../models/models';
import { POST } from '../../../utils/constants';

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

  @Output() addNewPost: EventEmitter<any> = new EventEmitter();

  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService) {}

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
    formData.set('id_user', this.userService.user.id_user);
    const response = await POST('/createPost', formData);

    if (!response) return;

    this.addNewPost.emit(response as IPOST);

    setTimeout(() => {
      this.close.emit(null);
    }, 1000);
  }
}
