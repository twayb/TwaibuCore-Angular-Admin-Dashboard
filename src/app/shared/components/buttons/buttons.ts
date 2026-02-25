import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ButtonType = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonShape = 'rounded' | 'pill' | 'square';

@Component({
  selector: 'app-buttons',
   standalone: true,
  imports: [],
  templateUrl: './buttons.html',
  styleUrl: './buttons.css',
})
export class ButtonsComponent {

  @Input() type: ButtonType = 'primary';
  @Input() variant: ButtonVariant = 'solid';
  @Input() size: ButtonSize = 'md';
  @Input() shape: ButtonShape = 'rounded';
  @Input() iconLeft = '';
  @Input() iconRight = '';
  @Input() iconOnly = '';
  @Input() label = '';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() block = false;
  @Output() clicked = new EventEmitter<boolean>();

  onClick() {
    if (!this.loading && !this.disabled) {
      this.clicked.emit(true);
    }
  }

  getClasses(): string {
    return [
      'btn-base',
      `btn-${this.variant}-${this.type}`,
      `btn-size-${this.size}`,
      `btn-shape-${this.shape}`,
      this.block ? 'btn-block' : '',
      this.loading ? 'btn-loading' : '',
      this.disabled ? 'btn-disabled' : '',
      this.iconOnly ? 'btn-icon-only' : '',
    ].filter(Boolean).join(' ');
  }

}
