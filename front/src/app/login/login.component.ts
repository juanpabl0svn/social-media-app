import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    passwordControl : new FormControl(''),
    usernameControl : new FormControl(''),
  })
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.loginForm.value);
  }
}