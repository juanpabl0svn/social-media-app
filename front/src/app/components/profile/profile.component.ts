import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import UserService from '../../services/user/user.service';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../landing/header/header.component';
import { ModalComponent } from '../modal/modal.component';
import { POST_FORMDATA } from '../../utils/constants';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, ModalComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  editProfile: boolean = false;
  uploadPost: boolean = false;

  passwordType: string = 'password';

  profileToEdit = { ...this.userService.user };

  posts: any[] = [];

  followers: any[] = [];

  followingReq: any[] = [];

  image: File | null = null;

  bg_img: string = '';

  constructor(public userService: UserService, private router:Router) {}


  async ngOnInit(){



  }

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
    formData.set('user_id',this.userService.user.id_user);
    const response = await POST_FORMDATA('/create_post',formData);
    this.router.navigate(['/profile'])

  }


  handleSubmitEdit(e: Event){

  }

  signOut() {
    this.userService.signOut();
  }
}
