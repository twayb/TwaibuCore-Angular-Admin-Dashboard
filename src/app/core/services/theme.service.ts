import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

export interface ThemeSettings {
  primaryColor: string;
  sidebarColor: 'light' | 'dark' | 'colored';
  topbarColor: 'light' | 'dark' | 'colored';
  fontSize: 'small' | 'medium' | 'large';
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  isSettingsOpen = signal(false);

  settings = signal<ThemeSettings>({
    primaryColor: '#4F6EF7',
    sidebarColor: 'light',
    topbarColor: 'light',
    fontSize: 'medium',
  });

  presetColors = [
    { label: 'Blue',   value: '#4F6EF7' },
    { label: 'Purple', value: '#7c3aed' },
    { label: 'Green',  value: '#10b981' },
    { label: 'Red',    value: '#ef4444' },
    { label: 'Orange', value: '#f97316' },
    { label: 'Pink',   value: '#ec4899' },
    { label: 'Teal',   value: '#14b8a6' },
    { label: 'Indigo', value: '#6366f1' },
  ];

  constructor() {
  if (isPlatformBrowser(this.platformId)) {
    this.applySettings();
  }
}

  toggleSettings() {
    this.isSettingsOpen.update(v => !v);
  }

  closeSettings() {
    this.isSettingsOpen.set(false);
  }

  setPrimaryColor(color: string) {
    this.settings.update(s => ({ ...s, primaryColor: color }));
    this.applySettings();
  }

  setSidebarColor(color: 'light' | 'dark' | 'colored') {
    this.settings.update(s => ({ ...s, sidebarColor: color }));
    this.applySettings();
  }

  setTopbarColor(color: 'light' | 'dark' | 'colored') {
    this.settings.update(s => ({ ...s, topbarColor: color }));
    this.applySettings();
  }

  setFontSize(size: 'small' | 'medium' | 'large') {
    this.settings.update(s => ({ ...s, fontSize: size }));
    this.applySettings();
  }

  applySettings() {
    if (!isPlatformBrowser(this.platformId)) return;

    const s = this.settings();
    const root = this.document.documentElement;

    // Primary color
    root.style.setProperty('--color-primary', s.primaryColor);
    root.style.setProperty('--color-primary-soft', this.hexToRgba(s.primaryColor, 0.12));
    root.style.setProperty('--color-primary-icon', this.hexToRgba(s.primaryColor, 0.15));

    // Font size
    const fontSizes = { small: '13px', medium: '14px', large: '16px' };
    root.style.setProperty('--font-size-base', fontSizes[s.fontSize]);

    // Sidebar color classes
    root.classList.remove('sidebar-light', 'sidebar-dark', 'sidebar-colored');
    root.classList.add(`sidebar-${s.sidebarColor}`);

    // Topbar color classes
    root.classList.remove('topbar-light', 'topbar-dark', 'topbar-colored');
    root.classList.add(`topbar-${s.topbarColor}`);
  }

  hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  resetSettings() {
    this.settings.set({
      primaryColor: '#4F6EF7',
      sidebarColor: 'light',
      topbarColor: 'light',
      fontSize: 'medium',
    });
    this.applySettings();
  }
}