import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import UserService from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { EyeCloseComponent } from '../../global/svg/eye-close/eye-close.component';
import { EyeOpenComponent } from '../../global/svg/eye-open/eye-open.component';








@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, EyeCloseComponent, EyeOpenComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
    username: new FormControl(''),
    date: new FormControl(''),
  });

  passwordType: string = 'password';

  passwordType2: string = 'password';

  constructor(public userService: UserService, private router: Router, private toast: ToastrService) { }


  handleSpaces(e: Event) {
    (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.trim()
  }

  async handleSubmit(e: Event) {

    e.preventDefault();

    const { name, email, password, password2, birth_date, username } = Object.fromEntries(new FormData(e.target as HTMLFormElement) as any)


    if (!name || !email || !password || !password2 || !birth_date || !username) {

      return this.toast.error('Por favor llene todos los campos')
    }

    if (password !== password2) {
      this.toast.error('Contraseñas no son iguales')
      return;
    }



    const userData = await this.userService.register(
      name,
      username,
      email,
      password,
      birth_date
    );


    if (userData.error) {
      return this.toast.error(userData.error)

    }


    document.cookie = `token=${userData.token}`;
    this.userService.setIsAuth = true;
    this.userService.user = userData;


    this.router.navigate(['/']);

    return this.toast.success('Usuario registrado correctamente')
  }
}
