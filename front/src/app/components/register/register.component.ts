import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import UserService from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
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

  constructor(public user: UserService, private router: Router) {}

  async handleSubmit(e: Event) {
    e.preventDefault();

    const { name, email, password, password2, date, username } =
      this.registerForm.value;

    if (!name || !email || !password || !password2 || !date || !username)
      return;

    if (password !== password2) {
      alert('Passwords do not match');
      return;
    }

    const userData = await this.user.register(
      name,
      username,
      email,
      password,
      date
    );

    document.cookie = `token=${userData.token}`;
    this.user.setIsAuth = true;
    this.user.setUsername = userData;
    this.router.navigate(['/']);
  }
}
