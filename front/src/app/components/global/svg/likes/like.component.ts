import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-like',
  standalone: true,
  templateUrl: './like.component.html',
})
export class LikeComponent {
  @Input() hasLiked: boolean = false;
  @Output() handleClick: EventEmitter<any> = new EventEmitter();

  handleClickEvent() {
  this.handleClick.emit();
  }
}
