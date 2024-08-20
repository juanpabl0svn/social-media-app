import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { NotificationsComponent } from './notifications/notifications.component';
import { CookieService } from 'ngx-cookie-service';
import { ModalComponent } from '../modal/modal.component';
import UserService from '../../services/user/user.service';
import { GET, POST } from '../../utils/constants';





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

  users: any[] = [];

  timer = setTimeout(() => { }, 0);

  constructor(
    public userService: UserService,
    private router: Router,
    private cookie: CookieService
  ) { }

  handleChange(e: Event) {
    clearTimeout(this.timer);

    const username = (e.target as HTMLInputElement).value;

    if (!username) {
      this.users = [];
      return;
    }

    this.timer = setTimeout(async () => {
      const users = await GET(`/user/${username}`);
      this.users = users;
    }, 100);
  }

  handleFollow(id: number) { }

  logOut() {
    this.userService.user = null;
    this.userService.isAuth = false;
    this.cookie.delete('token');
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
