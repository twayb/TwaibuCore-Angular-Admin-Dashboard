import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  title?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = signal<Toast[]>([]);

  show(toast: Omit<Toast, 'id'>) {
    const id = Math.random().toString(36).slice(2);
    this.toasts.update(t => [...t, { ...toast, id }]);
    setTimeout(() => this.remove(id), toast.duration ?? 4000);
  }

  success(message: string, title = 'Success') {
    this.show({ message, title, type: 'success' });
  }

  error(message: string, title = 'Error') {
    this.show({ message, title, type: 'error' });
  }

  warning(message: string, title = 'Warning') {
    this.show({ message, title, type: 'warning' });
  }

  info(message: string, title = 'Info') {
    this.show({ message, title, type: 'info' });
  }

  remove(id: string) {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
  
}
