import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';


export type PaginationVariant = 'default' | 'rounded' | 'pill' | 'minimal' | 'bordered';
export type PaginationSize = 'sm' | 'md' | 'lg';
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class PaginationComponent {

  @Input() total = 0;
  @Input() pageSize = 10;
  @Input() currentPage = 1;
  @Input() variant: PaginationVariant = 'default';
  @Input() size: PaginationSize = 'md';
  @Input() showFirstLast = true;
  @Input() showPrevNext = true;
  @Input() showPageInfo = false;
  @Input() siblingCount = 1;
  @Input() showPageSizeSelector = false;
  @Input() pageSizeOptions = [10, 25, 50, 100];
  @Input() showRangeInfo = false;

  @Output() pageChanged = new EventEmitter<number>();

  pages: (number | string)[] = [];
  totalPages = 0;

  ngOnChanges(changes: SimpleChanges) {
    this.totalPages = Math.ceil(this.total / this.pageSize);
    this.buildPages();
  }

  buildPages() {
    const total = this.totalPages;
    const current = this.currentPage;
    const siblings = this.siblingCount;

    if (total <= 7) {
      this.pages = Array.from({ length: total }, (_, i) => i + 1);
      return;
    }

    const leftSibling = Math.max(current - siblings, 1);
    const rightSibling = Math.min(current + siblings, total);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < total - 1;

    if (!showLeftDots && showRightDots) {
      const leftRange = Array.from({ length: 3 + siblings * 2 }, (_, i) => i + 1);
      this.pages = [...leftRange, '...', total];
    } else if (showLeftDots && !showRightDots) {
      const rightRange = Array.from({ length: 3 + siblings * 2 }, (_, i) => total - (3 + siblings * 2) + i + 1);
      this.pages = [1, '...', ...rightRange];
    } else {
      const middleRange = Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i);
      this.pages = [1, '...', ...middleRange, '...', total];
    }
  }

  goToPage(page: number | string) {
    if (typeof page !== 'number') return;
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.buildPages();
    this.pageChanged.emit(this.currentPage);
  }

  prev() { this.goToPage(this.currentPage - 1); }
  next() { this.goToPage(this.currentPage + 1); }
  first() { this.goToPage(1); }
  last() { this.goToPage(this.totalPages); }

  isActive(page: number | string): boolean { return page === this.currentPage; }
  isEllipsis(page: number | string): boolean { return page === '...'; }

  getWrapperClass(): string {
    return ['pgn-wrapper', `pgn-${this.variant}`, `pgn-${this.size}`].join(' ');
  }

  getPageClass(page: number | string): string {
    return [
      'pgn-btn',
      this.isActive(page) ? 'pgn-btn-active' : '',
      this.isEllipsis(page) ? 'pgn-ellipsis' : '',
    ].filter(Boolean).join(' ');
  }

  getNavClass(disabled: boolean): string {
    return ['pgn-btn', 'pgn-nav', disabled ? 'pgn-nav-disabled' : ''].filter(Boolean).join(' ');
  }

  onPageSizeChange(event: Event) {
  this.pageSize = +(event.target as HTMLSelectElement).value;
  this.currentPage = 1;
  this.totalPages = Math.ceil(this.total / this.pageSize);
  this.buildPages();
  this.pageChanged.emit(this.currentPage);
}

getRangeInfo(): string {
  const start = (this.currentPage - 1) * this.pageSize + 1;
  const end = Math.min(this.currentPage * this.pageSize, this.total);
  return `${start} – ${end} of ${this.total}`;
}
}
