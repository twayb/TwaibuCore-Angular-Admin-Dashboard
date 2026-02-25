import { Component, Input } from '@angular/core';

export interface AccordionItem {
  title: string;
  content: string;
  icon?: string;
  expanded?: boolean;
}
@Component({
  selector: 'app-accordion',
  imports: [],
  templateUrl: './accordion.html',
  styleUrl: './accordion.css',
})
export class AccordionComponent {

  @Input() items: AccordionItem[] = [];
  @Input() variant: 'default' | 'bordered' | 'separated' | 'flush' = 'default';
  @Input() allowMultiple = false;

  toggle(index: number) {
    if (this.allowMultiple) {
      this.items[index].expanded = !this.items[index].expanded;
    } else {
      this.items = this.items.map((item, i) => ({
        ...item,
        expanded: i === index ? !item.expanded : false
      }));
    }
  }

  getHeaderClass(): string {
    const base = 'w-full flex items-center justify-between gap-3 text-left transition-all duration-200 cursor-pointer ';
    const variants: Record<string, string> = {
      default: 'px-4 py-3 hover:bg-[var(--color-primary-soft)]',
      bordered: 'px-4 py-3 hover:bg-[var(--color-primary-soft)]',
      separated: 'px-4 py-3 hover:bg-[var(--color-primary-soft)] rounded-xl',
      flush: 'py-3 hover:text-[var(--color-primary)]',
    };
    return base + (variants[this.variant] || variants['default']);
  }

  getContentClass(): string {
    const variants: Record<string, string> = {
      default: 'px-4 pb-4',
      bordered: 'px-4 pb-4',
      separated: 'px-4 pb-4',
      flush: 'pb-3',
    };
    return variants[this.variant] || variants['default'];
  }

}
