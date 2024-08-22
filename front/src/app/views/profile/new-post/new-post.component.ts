import { Component, EventEmitter, Output } from '@angular/core';
import UserService from '../../../services/user/user.service';
import { POST } from '../../../utils/constants';
import { Router } from '@angular/router';
import { IPOST } from '../../../models/models';

@Component({
  selector: 'app-new-post',
  standalone: true,
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
  file: File | null = null;

  @Output() addNewPost: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService) {}

  handleChangeImage(e: Event) {
    const file = (e.target as HTMLInputElement)?.files?.[0];

    if (!file) return;

    this.file = file;  // Guardamos el archivo

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const container = document.querySelector('#image-box');
      if (!container) return;
      container.innerHTML = `<img src="${reader.result as string}" alt="profile-image" class='w-full aspect-square' />`;
    };
  }

  async handleSubmitPost(e: Event) {
    e.preventDefault();

    const { description } = e.target as HTMLFormElement;

    const formData = new FormData();
    formData.append('description', description.value ?? '');
    formData.append('image', this.file!);  // Añadimos la imagen como archivo
    formData.append('id_user', this.userService.user.id_user.toString());

    const response = await POST('/post', formData);

    if (!response) return;

    this.addNewPost.emit(response as IPOST);

    setTimeout(() => {
      this.close.emit(null);
    }, 1000);
  }
}
