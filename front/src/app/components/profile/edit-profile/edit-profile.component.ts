import { Component } from '@angular/core';
import UserService from '../../../services/user/user.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  passwordType: string = 'password';

  constructor(private userService: UserService) {}

  profileToEdit = { ...this.userService.user };

  handleSubmitEdit(e: Event) {}
}
