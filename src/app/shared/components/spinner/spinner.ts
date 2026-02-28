import { Component, Input } from '@angular/core';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'white';
export type SpinnerVariant = 'border' | 'dots' | 'pulse' | 'bars' | 'ring' | 'dual';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
})
export class SpinnerComponent {

   @Input() variant: SpinnerVariant = 'border';
  @Input() size: SpinnerSize = 'md';
  @Input() color: SpinnerColor = 'primary';
  @Input() label = '';

  getDotArray(): number[] { return [1, 2, 3]; }
  getBarArray(): number[] { return [1, 2, 3, 4, 5]; }

  getClass(): string {
    return [
      'sp-base',
      `sp-${this.variant}`,
      `sp-${this.size}`,
      `sp-color-${this.color}`,
    ].join(' ');
  }

}
