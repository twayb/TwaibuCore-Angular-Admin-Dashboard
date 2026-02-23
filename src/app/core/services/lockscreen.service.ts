import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LockscreenService {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  isLocked = signal(false);
  private idleTimeout: any;
private readonly IDLE_TIME = 1 * 60 * 1000;  // 1 minute

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.resetTimer();
      ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(event => {
        window.addEventListener(event, () => this.resetTimer());
      });
    }
  }

  resetTimer() {
    clearTimeout(this.idleTimeout);
    if (!this.isLocked()) {
      this.idleTimeout = setTimeout(() => {
        this.lock();
      }, this.IDLE_TIME);
    }
  }

  lock() {
    this.isLocked.set(true);
  }

  unlock(password: string): boolean {
    if (password === 'admin') {
      this.isLocked.set(false);
      this.resetTimer();
      return true;
    }
    return false;
  }

  logout() {
    this.isLocked.set(false);
    this.router.navigate(['/pages/auth/login']);
  }
}