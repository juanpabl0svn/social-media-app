import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import UserService from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { EyeCloseComponent } from '../../global/svg/eye-close/eye-close.component';
import { EyeOpenComponent } from '../../global/svg/eye-open/eye-open.component';
import { POST } from '../../utils/constants';








@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, EyeCloseComponent, EyeOpenComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  passwordType: string = 'password';
  passwordType2: string = 'password';

  constructor(public userService: UserService, private router: Router, private toast: ToastrService) { }


  handleSpaces(e: Event) {
    (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.trim()
  }

  async handleSubmit(e: Event) {

    e.preventDefault();

    const { first_name, last_name, email, password, password2, birth_date, username } = Object.fromEntries(new FormData(e.target as HTMLFormElement) as any)


    if (!first_name || !last_name || !email || !password || !password2 || !birth_date || !username) {

      return this.toast.error('Por favor llene todos los campos')
    }

    const regex = /^[a-zA-Z\s'-]+$/

    const hasSpecialCharacter = (string: string) => !regex.test(string);


    if (hasSpecialCharacter(first_name) || hasSpecialCharacter(last_name) ) {
      return this.toast.error('Nombre y apellido no pueden tener caracteres especiales')
    }



    if (password !== password2) {
      this.toast.error('Contraseñas no son iguales')
      return;
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
