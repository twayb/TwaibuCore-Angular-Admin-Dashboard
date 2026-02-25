import { Component, Input } from '@angular/core';

export type BadgeType = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
export type BadgeVariant = 'solid' | 'soft' | 'outline';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeShape = 'rounded' | 'pill';

@Component({
  selector: 'app-badges',
  imports: [],
  templateUrl: './badges.html',
  styleUrl: './badges.css',
})
export class BadgesComponent {

  @Input() type: BadgeType = 'primary';
  @Input() variant: BadgeVariant = 'soft';
  @Input() size: BadgeSize = 'md';
  @Input() shape: BadgeShape = 'pill';
  @Input() icon = '';
  @Input() dot = false;
  @Input() label = '';

  getClasses(): string {
    return [
      'badge-base',
      `badge-${this.variant}-${this.type}`,
      `badge-size-${this.size}`,
      `badge-shape-${this.shape}`,
    ].join(' ');
  }

  getDotClass(): string {
    return `badge-dot badge-dot-${this.type}`;
  }

}
