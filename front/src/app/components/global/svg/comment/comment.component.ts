import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-comment',
  standalone: true,
  templateUrl: './comment.component.html',
})
export class CommentComponent {
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  handleClick() {
    this.onClick.emit();
  }
}
