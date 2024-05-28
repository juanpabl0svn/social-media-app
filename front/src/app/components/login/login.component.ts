import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import UserService from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  passwordType: string = 'password';

  constructor(private router: Router, public user: UserService) {}

  async handleSubmit(e: Event) {
    e.preventDefault();

    const { username, password } = this.loginForm.value;

    if (!username || !password) return;

    const userData = await this.user.logIn(username, password);

    console.log(userData);
    if (!userData) {
      return;
    }

    // document.cookie = `token=${userData.token}`;
    userData.user = userData;
    this.user.isAuth = true;
    this.router.navigate(['/']);
  }
}
