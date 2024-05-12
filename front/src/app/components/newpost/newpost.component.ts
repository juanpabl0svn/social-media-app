import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import UserService from '../../services/user/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import PostService from '../../services/post/post.service';

@Component({
  selector: 'app-newpost',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './newpost.component.html',
  styleUrl: './newpost.component.css',
})
export class NewpostComponent {
  postform = new FormGroup({
    description: new FormControl(''),
  });
  user: any = {};
  constructor(
    private _userService: UserService,
    private router: Router,
    private _postService: PostService
  ) {}

  ngOnInit() {
    this.user = this._userService.getUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  // getFile(event: Event) {
  //   const target = event.target as HTMLInputElement;
  //   const files: FileList | null = target.files;
  //   if (files!.length > 0 && files != null) {
  //     this.formData.set('file', files[0]);
  //   }
  // }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { description } = this.postform.value;
    const formData = new FormData();
    if (description) {
      formData.set('description', description);
    }
    const fileInput = document.getElementById('imgInput') as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      formData.set('file', fileInput.files[0]);
    }
    formData.set('user_id', this.user.userId);
    const response = await this._postService.createPost(formData);
    this.router.navigate(['/profile'])
  }
}
