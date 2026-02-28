import { Component, ElementRef, HostListener, Input } from '@angular/core';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
export type PopoverTrigger = 'click' | 'hover';
export type PopoverVariant = 'default' | 'dark' | 'primary' | 'success' | 'danger' | 'warning';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [],
  templateUrl: './popover.html',
  styleUrl: './popover.css',
})
export class PopoverComponent {

  @Input() title = '';
  @Input() content = '';
  @Input() placement: PopoverPlacement = 'top';
  @Input() trigger: PopoverTrigger = 'click';
  @Input() variant: PopoverVariant = 'default';
  @Input() maxWidth = 240;

  isOpen = false;

  constructor(private el: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.trigger === 'click' && !this.el.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  onTriggerClick() {
    if (this.trigger === 'click') this.isOpen = !this.isOpen;
  }

  onMouseEnter() { if (this.trigger === 'hover') this.isOpen = true; }
  onMouseLeave() { if (this.trigger === 'hover') this.isOpen = false; }

  getPopoverClass(): string {
    return [
      'popover-box',
      `popover-${this.placement}`,
      `popover-variant-${this.variant}`,
      this.isOpen ? 'popover-open' : '',
    ].filter(Boolean).join(' ');
  }

}
