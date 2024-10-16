import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import UserService from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { POST } from '../../utils/constants';
import { EyeOpenComponent } from '../../global/svg/eye-open/eye-open.component';
import { EyeCloseComponent } from '../../global/svg/eye-close/eye-close.component';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, EyeOpenComponent, EyeCloseComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  loading: boolean = false;

  passwordType: string = 'password';

  constructor(
    private router: Router,
    public user: UserService,
    private toast: ToastrService
  ) { }


  handleSpaces(e: Event) {
    (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.trim()
  }


  async handleSubmit(e: Event) {
    e.preventDefault();

    this.loading = true;

    const { email, password } = this.loginForm.value;

    if (!email || !password){
      this.loading = false;
      return this.toast.error('Rellena todos los campos');
    }

    const userData = await POST('/user/login', { email, password });

    if (userData?.error) {
      this.loading = false;
      return this.toast.error('Usuario o contraseña incorrectos');
    }


    document.cookie = `token=${userData.token}`;
    this.user.user = userData;
    this.user.isAuth = true;
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1500);

    return this.toast.success(`Bienvenido ${userData.first_name} ${userData.last_name}`);
    
  }
}
