import { Component, Input } from '@angular/core';

export interface ListGroupItem {
  label: string;
  description?: string;
  icon?: string;
  badge?: string;
  badgeType?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  active?: boolean;
  disabled?: boolean;
  avatar?: string;
  avatarText?: string;
  meta?: string;
}

export type ListGroupVariant = 'default' | 'bordered' | 'flush' | 'separated';

@Component({
  selector: 'app-listgroup',
  standalone: true,
  imports: [],
  templateUrl: './listgroup.html',
  styleUrl: './listgroup.css',
})
export class ListgroupComponent {

   @Input() items: ListGroupItem[] = [];
  @Input() variant: ListGroupVariant = 'default';
  @Input() hoverable = false;
  @Input() clickable = false;

  getWrapperClass(): string {
    return [
      'lg-wrapper',
      `lg-wrapper-${this.variant}`,
      this.hoverable ? 'lg-hoverable' : '',
    ].filter(Boolean).join(' ');
  }

  getItemClass(item: ListGroupItem): string {
    return [
      'lg-item',
      item.active ? 'lg-item-active' : '',
      item.disabled ? 'lg-item-disabled' : '',
      this.clickable ? 'lg-item-clickable' : '',
    ].filter(Boolean).join(' ');
  }

  getBadgeClass(type: string = 'primary'): string {
    return `lg-badge lg-badge-${type}`;
  }

}
