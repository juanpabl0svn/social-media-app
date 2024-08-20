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
  requests: {
    id_follow: number;
    id_user: number;
    username: string;
    state: string;
    users: {
      id_user: string;
      username: string
    }
  }[] = [];
  constructor(public userData: UserService) { }

  async ngOnInit() {
    const id_user = this.userData.user.id_user;
    const notifications = await GET(`/notification/${id_user}`);
    this.requests = notifications;
  }

  async handleAccept(id_follow: number) {
    const isAccepted = await POST('/notification/accept_follow', { id_follow });
    if (!isAccepted) return;

    const request = this.requests.find(
      (req: any) => req.id_follow === id_follow
    );

    if (!request) return;

    request.state = 'accepted';
  }

  async handleReject(id_follow: number) {
    const isRejected = await POST('/notification/reject_follow', { id_follow });
    if (isRejected) {
      const requestObj = this.requests.find((req) => req.id_follow === id_follow)
      if (requestObj) {
        requestObj.state = 'rejected';
      }
    }
  }
}
