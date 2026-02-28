import { Component, inject, signal } from '@angular/core';
import { ToastService } from '../../core/services/toast';
import { FormsModule } from '@angular/forms';

interface IconCategory {
  label: string;
  key: string;
  icons: string[];
}

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './icons.html',
  styleUrl: './icons.css',
})
export class IconsComponent {
    toast = inject(ToastService);

  searchQuery = signal('');
  activeCategory = signal('all');
  selectedIcon = signal<string | null>(null);
  copiedText = signal<string | null>(null);

  categories: IconCategory[] = [
    {
      label: 'Arrows', key: 'arrows', icons: [
        'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right',
        'arrow-up-right', 'arrow-up-left', 'arrow-down-right', 'arrow-down-left',
        'arrow-clockwise', 'arrow-counterclockwise', 'arrow-repeat', 'arrow-return-left',
        'arrow-return-right', 'arrow-bar-up', 'arrow-bar-down', 'arrow-bar-left',
        'arrow-bar-right', 'arrows-move', 'arrows-fullscreen', 'arrows-angle-expand',
        'arrows-angle-contract', 'arrows-collapse', 'arrows-expand', 'arrow-90deg-up',
        'arrow-90deg-down', 'arrow-90deg-left', 'arrow-90deg-right', 'chevron-up',
        'chevron-down', 'chevron-left', 'chevron-right', 'chevron-double-up',
        'chevron-double-down', 'chevron-double-left', 'chevron-double-right', 'chevron-bar-up',
        'chevron-bar-down', 'chevron-bar-left', 'chevron-bar-right', 'chevron-compact-up',
      ]
    },
    {
      label: 'UI Elements', key: 'ui', icons: [
        'house', 'house-fill', 'house-door', 'house-door-fill',
        'gear', 'gear-fill', 'gear-wide', 'gear-wide-connected',
        'bell', 'bell-fill', 'bell-slash', 'bell-slash-fill',
        'search', 'zoom-in', 'zoom-out', 'filter',
        'funnel', 'funnel-fill', 'sort-down', 'sort-up',
        'three-dots', 'three-dots-vertical', 'grid', 'grid-fill',
        'grid-3x3', 'grid-3x3-gap', 'list', 'list-ul',
        'list-ol', 'list-check', 'list-nested', 'list-stars',
        'menu-button', 'menu-button-fill', 'menu-button-wide', 'menu-button-wide-fill',
        'toggle-on', 'toggle-off', 'toggle2-on', 'toggle2-off',
        'check', 'check-lg', 'check2', 'check2-all',
        'x', 'x-lg', 'x-circle', 'x-circle-fill',
        'dash', 'dash-lg', 'dash-circle', 'dash-circle-fill',
        'plus', 'plus-lg', 'plus-circle', 'plus-circle-fill',
        'eye', 'eye-fill', 'eye-slash', 'eye-slash-fill',
        'lock', 'lock-fill', 'unlock', 'unlock-fill',
        'star', 'star-fill', 'star-half', 'stars',
        'heart', 'heart-fill', 'heart-half', 'heart-pulse',
        'bookmark', 'bookmark-fill', 'bookmark-plus', 'bookmark-minus',
      ]
    },
    {
      label: 'People', key: 'people', icons: [
        'person', 'person-fill', 'person-circle', 'person-badge',
        'person-badge-fill', 'person-check', 'person-check-fill', 'person-dash',
        'person-dash-fill', 'person-plus', 'person-plus-fill', 'person-x',
        'person-x-fill', 'person-lines-fill', 'person-vcard', 'person-vcard-fill',
        'people', 'people-fill', 'person-workspace', 'person-rolodex',
        'person-gear', 'person-lock', 'person-exclamation', 'person-raised-hand',
        'person-walking', 'person-standing', 'person-arms-up', 'person-wheelchair',
        'mortarboard', 'mortarboard-fill', 'briefcase', 'briefcase-fill',
      ]
    },
    {
      label: 'Files & Docs', key: 'files', icons: [
        'file', 'file-fill', 'file-earmark', 'file-earmark-fill',
        'file-text', 'file-text-fill', 'file-earmark-text', 'file-earmark-text-fill',
        'file-pdf', 'file-pdf-fill', 'file-earmark-pdf', 'file-earmark-pdf-fill',
        'file-word', 'file-word-fill', 'file-excel', 'file-excel-fill',
        'file-image', 'file-image-fill', 'file-music', 'file-music-fill',
        'file-zip', 'file-zip-fill', 'file-code', 'file-code-fill',
        'file-plus', 'file-plus-fill', 'file-minus', 'file-minus-fill',
        'file-check', 'file-check-fill', 'file-x', 'file-x-fill',
        'files', 'files-alt', 'folder', 'folder-fill',
        'folder-open', 'folder-open-fill', 'folder-plus', 'folder-minus',
        'folder-check', 'folder-x', 'folder2', 'folder2-open',
        'clipboard', 'clipboard-fill', 'clipboard-check', 'clipboard-data',
      ]
    },
    {
      label: 'Media', key: 'media', icons: [
        'play', 'play-fill', 'play-circle', 'play-circle-fill',
        'pause', 'pause-fill', 'pause-circle', 'pause-circle-fill',
        'stop', 'stop-fill', 'stop-circle', 'stop-circle-fill',
        'skip-start', 'skip-start-fill', 'skip-end', 'skip-end-fill',
        'skip-backward', 'skip-backward-fill', 'skip-forward', 'skip-forward-fill',
        'fast-forward', 'fast-forward-fill', 'rewind', 'rewind-fill',
        'shuffle', 'repeat', 'repeat-1', 'music-note',
        'music-note-beamed', 'music-note-list', 'headphones', 'headset',
        'camera', 'camera-fill', 'camera-video', 'camera-video-fill',
        'image', 'image-fill', 'images', 'film',
        'volume-up', 'volume-down', 'volume-mute', 'volume-off',
        'mic', 'mic-fill', 'mic-mute', 'mic-mute-fill',
      ]
    },
    {
      label: 'Communication', key: 'communication', icons: [
        'chat', 'chat-fill', 'chat-dots', 'chat-dots-fill',
        'chat-left', 'chat-left-fill', 'chat-right', 'chat-right-fill',
        'chat-square', 'chat-square-fill', 'chat-text', 'chat-text-fill',
        'envelope', 'envelope-fill', 'envelope-open', 'envelope-open-fill',
        'envelope-at', 'envelope-at-fill', 'envelope-check', 'envelope-check-fill',
        'envelope-plus', 'envelope-plus-fill', 'envelope-x', 'envelope-x-fill',
        'telephone', 'telephone-fill', 'telephone-inbound', 'telephone-outbound',
        'phone', 'phone-fill', 'phone-vibrate', 'phone-landscape',
        'send', 'send-fill', 'send-check', 'send-check-fill',
        'reply', 'reply-fill', 'reply-all', 'reply-all-fill',
        'forward', 'forward-fill', 'inbox', 'inbox-fill',
      ]
    },
    {
      label: 'Commerce', key: 'commerce', icons: [
        'cart', 'cart-fill', 'cart-plus', 'cart-plus-fill',
        'cart-dash', 'cart-dash-fill', 'cart-check', 'cart-check-fill',
        'cart2', 'cart3', 'cart4', 'bag',
        'bag-fill', 'bag-plus', 'bag-plus-fill', 'bag-dash',
        'bag-dash-fill', 'bag-check', 'bag-check-fill', 'bag-x',
        'currency-dollar', 'currency-euro', 'currency-pound', 'currency-exchange',
        'credit-card', 'credit-card-fill', 'credit-card-2-front', 'credit-card-2-back',
        'wallet', 'wallet-fill', 'wallet2', 'piggy-bank',
        'cash', 'cash-stack', 'coin', 'receipt',
        'receipt-cutoff', 'tag', 'tag-fill', 'tags',
        'percent', 'gift', 'gift-fill', 'shop',
      ]
    },
    {
      label: 'Charts & Data', key: 'charts', icons: [
        'bar-chart', 'bar-chart-fill', 'bar-chart-line', 'bar-chart-line-fill',
        'bar-chart-steps', 'bar-chart-square', 'bar-chart-square-fill', 'bar-chart-tops',
        'graph-up', 'graph-up-arrow', 'graph-down', 'graph-down-arrow',
        'pie-chart', 'pie-chart-fill', 'diagram-2', 'diagram-2-fill',
        'diagram-3', 'diagram-3-fill', 'activity', 'speedometer',
        'speedometer2', 'clipboard-data', 'clipboard-data-fill', 'clipboard-graph',
        'table', 'database', 'database-fill', 'server',
        'hdd', 'hdd-fill', 'hdd-stack', 'hdd-network',
        'funnel-fill', 'collection', 'collection-fill', 'archive',
      ]
    },
    {
      label: 'Layout', key: 'layout', icons: [
        'layout-sidebar', 'layout-sidebar-reverse', 'layout-sidebar-inset', 'layout-sidebar-inset-reverse',
        'layout-text-sidebar', 'layout-text-sidebar-reverse', 'layout-text-window', 'layout-text-window-reverse',
        'layout-three-columns', 'layout-split', 'layout-wtf', 'layout-navbar-collapse',
        'columns', 'columns-gap', 'window', 'window-fullscreen',
        'window-stack', 'window-dash', 'window-plus', 'window-x',
        'app', 'app-indicator', 'display', 'display-fill',
        'tablet', 'tablet-fill', 'tablet-landscape', 'phone',
        'laptop', 'laptop-fill', 'pc', 'pc-display',
        'tv', 'tv-fill', 'projector', 'projector-fill',
      ]
    },
    {
      label: 'Nature & Weather', key: 'nature', icons: [
        'sun', 'sun-fill', 'moon', 'moon-fill',
        'moon-stars', 'moon-stars-fill', 'cloud', 'cloud-fill',
        'cloud-sun', 'cloud-sun-fill', 'cloud-moon', 'cloud-moon-fill',
        'cloud-rain', 'cloud-rain-fill', 'cloud-snow', 'cloud-snow-fill',
        'cloud-lightning', 'cloud-lightning-fill', 'wind', 'tornado',
        'thermometer', 'thermometer-sun', 'thermometer-snow', 'thermometer-half',
        'droplet', 'droplet-fill', 'droplet-half', 'umbrella',
        'umbrella-fill', 'tree', 'tree-fill', 'flower1',
        'flower2', 'flower3', 'globe', 'globe2',
        'globe-americas', 'globe-europe-africa', 'globe-asia-australia', 'geo-alt',
      ]
    },
    {
      label: 'Alerts & Status', key: 'alerts', icons: [
        'info', 'info-circle', 'info-circle-fill', 'info-square',
        'info-square-fill', 'exclamation', 'exclamation-circle', 'exclamation-circle-fill',
        'exclamation-triangle', 'exclamation-triangle-fill', 'exclamation-square', 'exclamation-square-fill',
        'question', 'question-circle', 'question-circle-fill', 'question-square',
        'check-circle', 'check-circle-fill', 'check-square', 'check-square-fill',
        'x-circle', 'x-circle-fill', 'x-square', 'x-square-fill',
        'shield', 'shield-fill', 'shield-check', 'shield-check-fill',
        'shield-exclamation', 'shield-slash', 'shield-lock', 'shield-lock-fill',
        'bug', 'bug-fill', 'fire', 'lightning',
        'lightning-fill', 'lightning-charge', 'radioactive', 'biohazard',
      ]
    },
    {
      label: 'Devices & Tech', key: 'tech', icons: [
        'cpu', 'cpu-fill', 'memory', 'motherboard',
        'motherboard-fill', 'gpu-card', 'pci-card', 'usb',
        'usb-fill', 'usb-plug', 'usb-drive', 'usb-drive-fill',
        'keyboard', 'keyboard-fill', 'mouse', 'mouse-fill',
        'mouse2', 'mouse2-fill', 'mouse3', 'mouse3-fill',
        'printer', 'printer-fill', 'router', 'router-fill',
        'wifi', 'wifi-1', 'wifi-2', 'wifi-off',
        'bluetooth', 'bluetooth-fill', 'reception-0', 'reception-1',
        'reception-2', 'reception-3', 'reception-4', 'sim',
        'battery', 'battery-full', 'battery-half', 'battery-charging',
      ]
    },
  ];

  get allIcons(): string[] {
    return this.categories.flatMap(c => c.icons);
  }

  get filteredIcons(): string[] {
    const query = this.searchQuery().toLowerCase();
    const cat   = this.activeCategory();

    let icons = cat === 'all'
      ? this.allIcons
      : (this.categories.find(c => c.key === cat)?.icons ?? []);

    if (query) {
      icons = icons.filter(i => i.includes(query));
    }

    return icons;
  }

  get iconCount(): number {
    return this.filteredIcons.length;
  }

  selectIcon(icon: string) {
    this.selectedIcon.set(icon);
    this.copiedText.set(null);
  }

  closeModal() {
    this.selectedIcon.set(null);
    this.copiedText.set(null);
  }

  copyText(text: string, label: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copiedText.set(label);
      this.toast.success(`Copied: ${text}`, 'Copied to clipboard');
      setTimeout(() => this.copiedText.set(null), 2000);
    });
  }

  getClassName(icon: string): string {
    return `bi bi-${icon}`;
  }

  getHtmlTag(icon: string): string {
    return `<i class="bi bi-${icon}"></i>`;
  }

}
