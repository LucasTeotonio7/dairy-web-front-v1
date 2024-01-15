import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Input() id: string = 'delete-modal';
  @Input() title: string = 'Excluir Item';
  @Input() message: string = 'Tem certeza de que deseja excluir este item?';
  @Input() confirmationMessage: string = 'Esta ação não pode ser desfeita.';
  @Input() confirmButtonText: string = 'Excluir';

  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();

  deleteAction() {
    this.delete.emit();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

}
