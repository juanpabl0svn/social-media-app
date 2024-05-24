import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import UserService from '../../services/user/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css',
})
export class EditprofileComponent {
  updateForm = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    birth_date: new FormControl(''),
  });
  user: any = null;
  constructor(private _userService: UserService, private router: Router) {}

  ngOnInit() {
    this._userService.fetchUser().subscribe((user: any) => {
      const date = new Date(user.birth_date);

      const year = date.getUTCFullYear();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const day = date.getUTCDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      this.updateForm.setValue({
        username: user.username,
        name: user.name,
        email: user.email,
        birth_date: formattedDate,
      });
      this.user = user;
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const { username, name, email, birth_date } = this.updateForm.value;
    this._userService.updateUser({
      id_user: this.user.id_user,
      name: name,
      username: username,
      email: email,
      birth_date: birth_date,
    }).subscribe((response)=>{
      console.log(response)
      this.router.navigate(['/profile'])
    })
  }
}
