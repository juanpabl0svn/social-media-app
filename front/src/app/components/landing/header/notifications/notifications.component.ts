import { Component } from '@angular/core';
import { POST } from '../../../../utils/constants';
import UserService from '../../../../services/user/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  requests: any = [];
  constructor(public userData: UserService) {}

  async ngOnInit() {
    const id_user = this.userData.user.id_user;
    const notifications = await POST('/getUserFollows', {
      id_user,
    });


    this.requests = notifications;
  }

  async handleAccept(id_follow: number) {
    const isAccepted = await POST('/acceptFollow', { id_follow });
    if (!isAccepted) return;

    const request = this.requests.find(
      (req: any) => req.id_follow === id_follow
    );
    request.state = 'accepted';
  }

  async handleReject(id_follow: number) {
    const isRejected = await POST('/rejectFollow', { id_follow });
    if (isRejected) {
      this.requests.find((req: any) => req.id_follow === id_follow).state =
        'rejected';
    }
  }
}
