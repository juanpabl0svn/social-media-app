import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import UserService from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { EyeCloseComponent } from '../../global/svg/eye-close/eye-close.component';
import { EyeOpenComponent } from '../../global/svg/eye-open/eye-open.component';
import { POST } from '../../utils/constants';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, EyeCloseComponent, EyeOpenComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  passwordType: string = 'password';
  passwordType2: string = 'password';

  loading: boolean = false;

  constructor(public userService: UserService, private readonly router: Router, private readonly toast: ToastrService) { }


  handleSpaces(e: Event) {
    (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.trim()
  }

  async handleSubmit(e: Event) {

    e.preventDefault();

    let { first_name, last_name, email, password, password2, birth_date, username } = Object.fromEntries(new FormData(e.target as HTMLFormElement) as any)


    if (!first_name || !last_name || !email || !password || !password2 || !birth_date || !username) {

      return this.toast.error('Por favor llene todos los campos')
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(email)) {
      return this.toast.error('Email no es válido')
    }

    const regex = /^[a-zA-Z\s'-]+$/

    const hasSpecialCharacter = (string: string) => !regex.test(string);


    if (hasSpecialCharacter(first_name) || hasSpecialCharacter(last_name) ) {
      return this.toast.error('Nombre y apellido no pueden tener caracteres especiales')
    }


    if (password.length < 8) {
      this.toast.error('Contraseña debe tener al menos 8 caracteres')
      return;
    }

    if (password !== password2) {
      this.toast.error('Contraseñas no son iguales')
      return;
    }

    if (new Date(birth_date).getFullYear() > new Date().getFullYear() - 18) {
      return this.toast.error('Debes ser mayor de edad para registrarte')
    }



    const newUser = await POST('/user/register', { first_name, last_name, email, password, birth_date, username });

    if (newUser?.error) {
      return this.toast.error(newUser.error)
    }

    document.cookie = `token=${newUser.token}`;
    this.userService.setIsAuth = true;
    this.userService.user = newUser;


    this.router.navigate(['/']);

    return this.toast.success('Usuario registrado correctamente')
  }

  
}
