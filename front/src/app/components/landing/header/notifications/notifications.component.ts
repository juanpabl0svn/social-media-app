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
  requests: any = [];
  constructor(public userData: UserService) {}

  async ngOnInit() {
    const notifications = await POST('/getUserFollows', {
      userId: this.userData.user.id_user,
    });

    this.requests = notifications;
  }

  handleAccept(id: number) {}

  handleReject(id: number) {}
}
