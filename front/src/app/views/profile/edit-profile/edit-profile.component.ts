import { Component, EventEmitter, Output } from '@angular/core';
import UserService from '../../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { PATCH, POST } from '../../../utils/constants';
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

  loading: boolean = false;

  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService, private toast: ToastrService) { }

  profileToEdit: IUSER = { ...this.userService.user }


  handleSpaces(e: Event) {
    (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.trim()
  }



  async handleSubmitEdit(e: Event) {

    e.preventDefault()

    this.loading = true;

    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);

    const email = formData.get('email') as string;
    let password = formData.get('password') as string;
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const username = formData.get('username') as string;
    const birth_date = formData.get('birth_date') as string;

    if (!email || !first_name || !last_name || !username || !birth_date) {
      this.loading = false;
      return this.toast.error('No deje campos vacíos a proposito (excepto la contraseña si no desea cambiarla)')
    }


    if (password) {
      if (password.length < 8) {
        this.loading = false;
        return this.toast.error('Password must be at least 8 characters')
      }

    } else {
      password = this.userService.user.password
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(email)) {
      this.loading = false;
      return this.toast.error('Email no es válido')
    }


    const regex = /^[a-zA-Z\s'-]+$/

    const hasSpecialCharacter = (string: string) => !regex.test(string);


    if (hasSpecialCharacter(first_name) || hasSpecialCharacter(last_name)) {
      this.loading = false;
      return this.toast.error('Nombre y apellido no pueden tener caracteres especiales')
    }

    if (new Date(birth_date).getFullYear() > new Date().getFullYear() - 18) {
      this.loading = false;
      return this.toast.error('Debes ser mayor de edad')
    }


    const isEdited = await PATCH(`/user/${this.userService.user.id_user}`, {
      email,
      password,
      first_name,
      last_name,
      username,
      birth_date
    })

    if (!isEdited) {
      this.loading = false;
      return this.toast.error('Nombre de usuario ya en uso')
    }

    this.toast.success('Profile edited successfully')

    this.userService.user = { ...this.profileToEdit, ...isEdited }

    this.closeModal.emit()

    return this.loading = false;
  }
}
