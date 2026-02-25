import { Component, Input } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  icon?: string;
  route?: string;
}

export type BreadcrumbVariant = 'default' | 'chevron' | 'slash' | 'dot' | 'arrow';
export type BreadcrumbStyle = 'plain' | 'pills' | 'outlined' | 'filled';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css'
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
  @Input() variant: BreadcrumbVariant = 'chevron';
  @Input() style: BreadcrumbStyle = 'plain';

  getSeparatorIcon(): string {
    const icons: Record<BreadcrumbVariant, string> = {
      default: 'bi bi-dot',
      chevron: 'bi bi-chevron-right',
      slash:   'bi bi-slash',
      dot:     'bi bi-circle-fill',
      arrow:   'bi bi-arrow-right',
    };
    return icons[this.variant];
  }

  getWrapperClass(): string {
    return `breadcrumb-wrapper breadcrumb-style-${this.style}`;
  }

  isLast(index: number): boolean {
    return index === this.items.length - 1;
  }
}