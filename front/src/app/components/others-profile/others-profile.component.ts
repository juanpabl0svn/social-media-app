import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import UserService from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-others-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './others-profile.component.html',
  styleUrl: './others-profile.component.css'
})
export class OthersProfileComponent {
  user: any = null

  constructor(private _userService:UserService, private _activatedRoute: ActivatedRoute){}

  ngOnInit(){
    const userId = this._activatedRoute.snapshot.paramMap.get('userId')
    if(userId){
      this._userService.getOtherUser(parseInt(userId)).subscribe((response:any)=>{
        this.user = response.user
      })
    }
  }
}
