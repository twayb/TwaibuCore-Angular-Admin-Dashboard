import { Component, EventEmitter, Input, Output } from '@angular/core';


export interface TabItem {
  label: string;
  key: string;
  icon?: string;
  badge?: string;
  badgeType?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  disabled?: boolean;
}

export type TabVariant = 'default' | 'pills' | 'outlined' | 'underline' | 'filled';
export type TabSize = 'sm' | 'md' | 'lg';
export type TabColor = 'primary' | 'success' | 'danger' | 'warning' | 'info';
export type TabOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  templateUrl: './tab.html',
  styleUrl: './tab.css',
})
export class TabComponent {

  @Input() tabs: TabItem[] = [];
  @Input() activeTab = '';
  @Input() variant: TabVariant = 'default';
  @Input() size: TabSize = 'md';
  @Input() color: TabColor = 'primary';
  @Input() fullWidth = false;
  @Output() tabChanged = new EventEmitter<string>();
  @Input() orientation: TabOrientation = 'horizontal';

  ngOnInit() {
    if (!this.activeTab && this.tabs.length > 0) {
      this.activeTab = this.tabs[0].key;
    }
  }

  selectTab(tab: TabItem) {
    if (!tab.disabled) {
      this.activeTab = tab.key;
      this.tabChanged.emit(tab.key);
    }
  }

   isActive(tab: TabItem): boolean { return tab.key === this.activeTab; }

  getNavClass(): string {
    return [
      'tabs-nav',
      `tabs-nav-${this.variant}`,
      `tabs-nav-${this.size}`,
      this.fullWidth ? 'tabs-full-width' : '',
    ].filter(Boolean).join(' ');
  }

  getTabClass(tab: TabItem): string {
    return [
      'tabs-tab',
      `tabs-tab-${this.variant}`,
      `tabs-tab-${this.color}`,
      this.isActive(tab) ? 'tabs-tab-active' : '',
      tab.disabled ? 'tabs-tab-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  getBadgeClass(type: string = 'primary'): string {
    return `tabs-badge tabs-badge-${type}`;
  }

  getWrapperClass(): string {
  return [
    'tabs-wrapper',
    `tabs-${this.orientation}`,
  ].join(' ');
}

}
