import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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

  constructor(public userService: UserService, private router: Router) {}

  handleChange(e: Event) {
    clearTimeout(this.timer);

    const username = (e.target as HTMLInputElement).value;

    if (!username) return (this.users = []);

    return (this.timer = setTimeout(async () => {
      const users = await POST('/search', { username });
      this.users = users ?? [];
      console.log(users);
    }, 400));
  }

  logOut() {
    this.userService.user = null;
    this.userService.isAuth = false;
    //Delete cookie token
    // TODO: Delete cookie
    this.router.navigate(['/login']);
  }
}
