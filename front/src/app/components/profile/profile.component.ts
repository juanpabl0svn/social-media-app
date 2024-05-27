import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import UserService from '../../services/user/user.service';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../landing/header/header.component';





@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(public userService:UserService){}

  signOut(){
    this.userService.signOut()
  }
}
