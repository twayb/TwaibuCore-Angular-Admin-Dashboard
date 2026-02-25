import { Component, EventEmitter, Input, Output } from '@angular/core';

export type AlertType = 'success' | 'danger' | 'warning' | 'info' | 'primary';
export type AlertVariant = 'solid' | 'soft' | 'outline' | 'left-border';

@Component({
  selector: 'app-alerts',
  imports: [],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class AlertsComponent {

  @Input() type: AlertType = 'info';
  @Input() variant: AlertVariant = 'soft';
  @Input() title = '';
  @Input() message = '';
  @Input() icon = '';
  @Input() dismissible = false;
  @Output() dismissed = new EventEmitter<boolean>();

  visible = true;

  dismiss() {
    this.visible = false;
    this.dismissed.emit(true);
  }

  getIcon(): string {
    if (this.icon) return this.icon;
    const icons: Record<AlertType, string> = {
      success: 'bi bi-check-circle-fill',
      danger: 'bi bi-x-circle-fill',
      warning: 'bi bi-exclamation-triangle-fill',
      info: 'bi bi-info-circle-fill',
      primary: 'bi bi-bell-fill',
    };
    return icons[this.type];
  }

  getClasses(): string {
    return `alert-base alert-${this.variant}-${this.type}`;
  }

}
