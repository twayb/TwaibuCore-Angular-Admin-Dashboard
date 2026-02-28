import { DecimalPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export type ProgressColor = 'primary' | 'success' | 'danger' | 'warning' | 'info';
export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';
export type ProgressVariant = 'default' | 'striped' | 'gradient' | 'indeterminate' | 'bullet' | 'bullet-tooltip' | 'flat';

@Component({
  selector: 'app-progressbar',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './progressbar.html',
  styleUrl: './progressbar.css',
})
export class ProgressbarComponent implements OnChanges {

  @Input() value = 0;
  @Input() max = 100;
  @Input() color: ProgressColor = 'primary';
  @Input() size: ProgressSize = 'md';
  @Input() variant: ProgressVariant = 'default';
  @Input() label = '';
  @Input() showValue = false;
  @Input() showLabel = false;
  @Input() animated = false;
  @Input() rounded = true;
  @Input() stacked = false;

  get percentage(): number {
    return Math.min(Math.max((this.value / this.max) * 100, 0), 100);
  }

  ngOnChanges(changes: SimpleChanges) { }

  getTrackClass(): string {
    return [
      'pb-track',
      `pb-track-${this.size}`,
      this.rounded ? 'pb-rounded' : '',
    ].filter(Boolean).join(' ');
  }

  getBarClass(): string {
    return [
      'pb-bar',
      `pb-bar-${this.color}`,
      `pb-bar-${this.variant}`,
      this.animated ? 'pb-animated' : '',
      this.rounded ? 'pb-rounded' : '',
    ].filter(Boolean).join(' ');
  }

}
