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
  styleUrl: './newpost.component.css'
})
export class NewpostComponent {
    postform = new FormGroup({
      description: new FormControl(''),
    });
    formData = new FormData()
    user:any = {}
  constructor(private _userService:UserService, private router:Router, private _postService:PostService){}

  ngOnInit(){
    this.user = this._userService.getUser()
    if(!this.user){
      this.router.navigate(['/login'])
    }
  }

  getFile(event:Event){
    const target = event.target as HTMLInputElement;
    const files: FileList | null = target.files;
    if(files!.length > 0 && files != null){
      this.formData.set('file', files[0])
    }
  }
  
  submitForm(){
    const {description} = this.postform.value
    if(description){
      this.formData.set('description', description)
    }
    this.formData.set('user_id', this.user.userId)
    this._postService.createPost(this.formData)
  }
}
