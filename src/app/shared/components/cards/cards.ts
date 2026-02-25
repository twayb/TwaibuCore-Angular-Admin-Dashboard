import { Component, Input } from '@angular/core';

export type CardVariant = 'default' | 'bordered' | 'shadow' | 'flat' | 'gradient';

@Component({
  selector: 'app-card',
   standalone: true,
  imports: [],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class CardsComponent {

  @Input() variant: CardVariant = 'default';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() image = '';
  @Input() imageAlt = '';
  @Input() badge = '';
  @Input() badgeType = 'primary';
  @Input() icon = '';
  @Input() iconColor = 'primary';
  @Input() footer = false;
  @Input() hoverable = false;

  getClasses(): string {
    return [
      'card-base',
      `card-${this.variant}`,
      this.hoverable ? 'card-hoverable' : '',
    ].filter(Boolean).join(' ');
  }

}
