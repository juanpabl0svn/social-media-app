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

  constructor(public user: UserService, private router: Router) {}

  async onSubmit(e: Event) {
    e.preventDefault();

    const { name, email, password, password2, date, username } =
      this.registerForm.value;

    if (!name || !email || !password || !password2 || !date || !username)
      return;

    if (password !== password2) {
      alert('Passwords do not match');
      return;
    }

    return this.user
      .register(name, username, email, password, date)
      .subscribe((respuesta:any) => {
        document.cookie = `token=${username}`;
        document.cookie = `userId=${respuesta.userData.id_user}`;
        this.user.setIsAuth = true;
        this.user.setUsername = email;
        this.router.navigate(['/']);
      });
  }
}
