import { Component } from '@angular/core';
import UserService from '../../../services/user/user.service';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.css',
})
export class StoriesComponent {
  skeleton: any[] = Array.from({ length: 10 });

  constructor(public userService: UserService) {}
}
