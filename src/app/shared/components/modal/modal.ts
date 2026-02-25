import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';


export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
export type ModalPosition = 'center' | 'top' | 'bottom';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class ModalComponent implements OnChanges {

    @Input() isOpen = false;
  @Input() title = '';
  @Input() size: ModalSize = 'md';
  @Input() position: ModalPosition = 'center';
  @Input() closable = true;
  @Input() backdropClose = true;
  @Input() scrollable = false;
  @Input() icon = '';
  @Input() iconColor = 'primary';
  @Output() closed = new EventEmitter<void>();

  visible = false;
  animating = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      if (this.isOpen) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  open() {
    this.visible = true;
    setTimeout(() => this.animating = true, 10);
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.animating = false;
    setTimeout(() => {
      this.visible = false;
      document.body.style.overflow = '';
      this.closed.emit();
    }, 250);
  }

  onBackdropClick() {
    if (this.backdropClose) this.close();
  }

  getDialogClass(): string {
    return [
      'modal-dialog',
      `modal-size-${this.size}`,
      `modal-position-${this.position}`,
      this.animating ? 'modal-dialog-open' : '',
    ].filter(Boolean).join(' ');
  }

  getIconClass(): string {
    return `modal-icon modal-icon-${this.iconColor}`;
  }

}
