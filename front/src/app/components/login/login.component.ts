import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { RouterLink } from '@angular/router';
import { BackendReqService } from '../../services/backendReq/backend-req.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    passwordControl: new FormControl(''),
    usernameControl: new FormControl(''),
  });

  constructor(public dataService: DataService, public backreqService: BackendReqService) {}

  onSubmit() {
    const { usernameControl: username, passwordControl: password } =
      this.loginForm.value;

    this.dataService.setValues({ username, password });
    this.dataService.print();

    this.backreqService.logInReq(username, password)?.subscribe(response => console.log(response))
  }
}
