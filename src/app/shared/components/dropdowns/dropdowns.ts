import { Component, ElementRef, HostListener, Input } from '@angular/core';

export interface DropdownItem {
  label: string;
  icon?: string;
  divider?: boolean;
  disabled?: boolean;
  color?: 'default' | 'danger' | 'success' | 'warning';
}

export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
export type DropdownVariant = 'default' | 'soft' | 'outlined';
export type DropdownTriggerType = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';

@Component({
  selector: 'app-dropdowns',
  standalone: true,
  imports: [],
  templateUrl: './dropdowns.html',
  styleUrl: './dropdowns.css',
})
export class DropdownsComponent {

   @Input() items: DropdownItem[] = [];
  @Input() label = 'Dropdown';
  @Input() icon = 'bi bi-chevron-down';
  @Input() iconOnly = '';
  @Input() placement: DropdownPlacement = 'bottom-start';
  @Input() variant: DropdownVariant = 'default';
  @Input() triggerType: DropdownTriggerType = 'primary';
  @Input() triggerStyle: 'solid' | 'soft' | 'outline' | 'ghost' = 'solid';

  isOpen = false;

  constructor(private el: ElementRef) {}

  toggle() { this.isOpen = !this.isOpen; }

  close() { this.isOpen = false; }

  selectItem(item: DropdownItem) {
    if (!item.disabled && !item.divider) {
      this.close();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  getTriggerClass(): string {
    return [
      'dd-trigger',
      `dd-trigger-${this.triggerStyle}-${this.triggerType}`,
      this.isOpen ? 'dd-trigger-active' : '',
    ].filter(Boolean).join(' ');
  }

  getMenuClass(): string {
    return [
      'dd-menu',
      `dd-menu-${this.variant}`,
      `dd-placement-${this.placement}`,
      this.isOpen ? 'dd-menu-open' : '',
    ].filter(Boolean).join(' ');
  }

  getItemClass(item: DropdownItem): string {
    return [
      'dd-item',
      item.disabled ? 'dd-item-disabled' : '',
      item.divider ? 'dd-item-divider' : '',
      item.color ? `dd-item-${item.color}` : '',
    ].filter(Boolean).join(' ');
  }

}
