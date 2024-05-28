import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import UserService from '../../../services/user/user.service';
import { ModalComponent } from '../../modal/modal.component';
import { POST } from '../../../utils/constants';

import { NotificationsComponent } from './notifications/notifications.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ModalComponent, NotificationsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchUser: boolean = false;
  notifications: boolean = false;

  users = [];

  timer = setTimeout(() => {}, 0);

  constructor(public userService: UserService) {}

  handleChange(e: Event) {
    clearTimeout(this.timer);

    const username = (e.target as HTMLInputElement).value;

    if (!username) return (this.users = []);

    return (this.timer = setTimeout(async () => {
      // const users = await POST('/user/search', { username });
      //   this.users = users ?? [];
    }, 400));
  }
}
