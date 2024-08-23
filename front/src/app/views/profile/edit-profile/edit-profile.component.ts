import { Component, EventEmitter, Output } from '@angular/core';
import UserService from '../../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { POST } from '../../../utils/constants';
import { ToastrService } from 'ngx-toastr';
import { EyeCloseComponent } from '../../../global/svg/eye-close/eye-close.component';
import { EyeOpenComponent } from '../../../global/svg/eye-open/eye-open.component';
import { IUSER } from '../../../models/models';


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

  profileToEdit: IUSER = { ...this.userService.user }


  handleSpaces(e: Event) {
    (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.trim()
  }



  async handleSubmitEdit(e: Event) {

    e.preventDefault()

    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);

    const email = formData.get('email') as string;
    let password = formData.get('password') as string;
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const username = formData.get('username') as string;
    const birth_date = formData.get('birth_date') as string;


    if (password) {
      if (password.length < 6) {
        return this.toast.error('Password must be at least 8 characters')
      }

    } else {
      password = this.userService.user.password
    }

    const id_user = this.userService.user.id_user

    const regex = /^[a-zA-Z\s'-]+$/

    const hasSpecialCharacter = (string: string) => !regex.test(string);


    if (hasSpecialCharacter(first_name) || hasSpecialCharacter(last_name) ) {
      return this.toast.error('Nombre y apellido no pueden tener caracteres especiales')
    }


    const isEdited = await POST('/user/update', {
      id_user,
      email,
      password,
      first_name,
      last_name,
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
