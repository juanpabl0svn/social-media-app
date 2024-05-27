import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import UserService from '../../../services/user/user.service';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchUser: boolean = false;
  constructor(public userService: UserService) {}
}
