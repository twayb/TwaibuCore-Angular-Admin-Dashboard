import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LockscreenService {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  isLocked = signal(false);
  isWarning = signal(false);
  countdown = signal(15);

  private idleTimeout: any;
  private warningTimeout: any;
  private countdownInterval: any;
private readonly IDLE_TIME = 1 * 60 * 1000 + 45 * 1000; // 1 min 45 sec
private readonly WARNING_TIME = 15 * 1000;                // 15 sec warning

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.resetTimer();
      ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(event => {
        window.addEventListener(event, () => this.onUserActivity());
      });
    }
  }

  onUserActivity() {
    if (!this.isLocked()) {
      if (this.isWarning()) {
        this.cancelWarning();
      }
      this.resetTimer();
    }
  }

  resetTimer() {
    clearTimeout(this.idleTimeout);
    this.idleTimeout = setTimeout(() => {
      this.startWarning();
    }, this.IDLE_TIME);
  }

  startWarning() {
    this.isWarning.set(true);
    this.countdown.set(15);

    this.countdownInterval = setInterval(() => {
      this.countdown.update(v => v - 1);
      if (this.countdown() <= 0) {
        this.cancelWarning();
        this.lock();
      }
    }, 1000);
  }

  cancelWarning() {
    this.isWarning.set(false);
    this.countdown.set(15);
    clearInterval(this.countdownInterval);
    clearTimeout(this.warningTimeout);
  }

  lock() {
    this.isLocked.set(true);
    this.isWarning.set(false);
    clearInterval(this.countdownInterval);
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
    this.isWarning.set(false);
    clearInterval(this.countdownInterval);
    this.router.navigate(['/pages/auth/login']);
  }
}