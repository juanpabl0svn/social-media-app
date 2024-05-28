import { Component } from '@angular/core';
import { POST } from '../../../../utils/constants';
import UserService from '../../../../services/user/user.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  constructor(public userData: UserService) {}

  async ngOnInit() {
    const notifications = await POST('/get_user_follows', {
      userId: this.userData.user.id_user,
    });

    console.log(this.userData.user)


    console.log(notifications)
  }
}
