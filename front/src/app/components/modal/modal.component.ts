import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  handleCloseModal() {
    const modal = document.getElementById('modal') as HTMLElement;

    if (!modal) return;

    modal.classList.add('hide-modal');

    setTimeout(() => {
      this.closeModal.emit();
    }, 300);
  }
}
