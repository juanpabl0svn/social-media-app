import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import UserService from '../../../services/user/user.service';
import { GET, POST } from '../../../utils/constants';



@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  notifications: {
    id_notification: number;
    id_user: number;
    type: string;
    data: {
      id_user: string;
      message: string;
      username: string;
      id_follow?: number;
      state?: string;
    }
  }[] = [];
  constructor(public userData: UserService) { }

  async ngOnInit() {
    const id_user = this.userData.user.id_user;
    const notifications = await GET(`/notifications/${id_user}`);
    this.notifications = notifications;
  }

  async handleAccept(id_follow: number) {
    const isAccepted = await POST('/notifications/accept_follow', { id_follow });
    if (!isAccepted) return;

    const notification = this.notifications.find(
      (req: any) => req.id_follow === id_follow
    );
    if (!notification) return;

    notification.data.state = 'ACCEPTED';
  }

  async handleReject(id_follow: number) {
    const isRejected = await POST('/notifications/reject_follow', { id_follow });
    if (!isRejected) return

    const notification = this.notifications.find((req) => req.data.id_follow === id_follow)
    if (notification) {
      notification.data.state = 'REJECTED';
    }
  }
}
