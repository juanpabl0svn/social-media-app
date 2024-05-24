import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import UserService from '../../services/user/user.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  usersList: any = [];

  searchForm = new FormGroup({
    search_text: new FormControl(''),
  });

  constructor(private _userService: UserService) {}

  onSubmit(e: Event) {
    e.preventDefault();
    const { search_text } = this.searchForm.value;
    if (search_text) {
      this._userService.searchUsers(search_text).subscribe((response: any) => {
        this.usersList = response.users;
      });
    }
  }
}
