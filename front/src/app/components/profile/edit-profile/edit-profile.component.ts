import { Component, EventEmitter, Output } from '@angular/core';
import UserService from '../../../services/user/user.service';
import { EyeCloseComponent } from '../../global/svg/eye-close/eye-close.component';
import { EyeOpenComponent } from '../../global/svg/eye-open/eye-open.component';
import { FormsModule } from '@angular/forms';
import { POST } from '../../../utils/constants';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [EyeCloseComponent, EyeOpenComponent, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  passwordType: string = 'password';

  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService, private toast: ToastrService) { }

  profileToEdit = { ...this.userService.user }



  async handleSubmitEdit(e: Event) {

    e.preventDefault()

    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);

    const email = formData.get('email') as string;
    let password = formData.get('password') as string;
    const name = formData.get('name') as string;
    const username = formData.get('username') as string;
    const birth_date = formData.get('birth_date') as string;


    if (password) {
      if (password.length < 6) {
        return this.toast.error('Password must be at least 6 characters')
      }

    } else {
      password = this.userService.user.password
    }

    const id_user = this.userService.user.id_user

    const isEdited = await POST('/updateProfile', {
      id_user,
      email,
      password,
      name,
      username,
      birth_date
    })
    if (!isEdited) {
      return this.toast.error('Nombre de usuario ya en uso')
    }



    this.toast.success('Profile edited successfully')

    this.userService.user = { ...this.profileToEdit, ...isEdited }

    this.closeModal.emit()

    return




  }
}
