import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import UserService from '../../services/user/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(public userService:UserService){}

  signOut(){
    this.userService.signOut()
  }
}
