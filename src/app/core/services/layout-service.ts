import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  isCollapsed = signal(false);
  isDarkMode = signal(false);
  isMobile = signal(false);
  isOverlay = signal(false);

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        if (this.isDarkMode()) {
          this.document.documentElement.classList.add('dark');
        } else {
          this.document.documentElement.classList.remove('dark');
        }
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      window.addEventListener('resize', () => this.checkScreenSize());
    }
  }

  checkScreenSize() {
    const width = window.innerWidth;
    if (width < 768) {
      this.isMobile.set(true);
      this.isCollapsed.set(true);
      this.isOverlay.set(false);
    } else if (width < 1024) {
      this.isMobile.set(false);
      this.isCollapsed.set(true);
      this.isOverlay.set(false);
    } else {
      this.isMobile.set(false);
      this.isCollapsed.set(false);
      this.isOverlay.set(false);
    }
  }

  toggle() {
    if (this.isMobile()) {
      this.isOverlay.update(v => !v);
    } else {
      this.isCollapsed.update(v => !v);
    }
  }

  toggleDarkMode() {
    this.isDarkMode.update(v => !v);
  }

  closeOverlay() {
    this.isOverlay.set(false);
  }

}