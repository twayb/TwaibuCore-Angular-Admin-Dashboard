import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class ToastComponent {
  toastService = inject(ToastService);

  getIcon(type: string): string {
    const map: Record<string, string> = {
      success: 'bi bi-check-circle-fill',
      error:   'bi bi-x-circle-fill',
      warning: 'bi bi-exclamation-triangle-fill',
      info:    'bi bi-info-circle-fill',
    };
    return map[type] ?? 'bi bi-info-circle-fill';
  }

  getClass(type: string): string {
    return `toast-item toast-${type}`;
  }

}
