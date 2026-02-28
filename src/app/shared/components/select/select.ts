import { Component, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: any;
  icon?: string;
  description?: string;
  disabled?: boolean;
  group?: string;
}

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'default' | 'filled' | 'outlined';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select.html',
  styleUrl: './select.css',
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent {

 @Input() options: SelectOption[] = [];
  @Input() label = '';
  @Input() placeholder = 'Select an option...';
  @Input() size: SelectSize = 'md';
  @Input() variant: SelectVariant = 'default';
  @Input() disabled = false;
  @Input() clearable = false;
  @Input() searchable = false;
  @Input() multiple = false;
  @Input() hint = '';
  @Input() errorMessage = '';
  @Input() prefixIcon = '';
  @Input() required = false;

  isOpen = false;
  searchQuery = '';
  selectedValue: any = null;
  selectedValues: any[] = [];
  isFocused = false;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen = false;
      this.searchQuery = '';
    }
  }

  toggle() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (!this.isOpen) this.searchQuery = '';
    }
  }

  get filteredOptions(): SelectOption[] {
    if (!this.searchQuery) return this.options;
    return this.options.filter(o =>
      o.label.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get groupedOptions(): { group: string; options: SelectOption[] }[] {
    const groups: { [key: string]: SelectOption[] } = {};
    for (const opt of this.filteredOptions) {
      const g = opt.group || '';
      if (!groups[g]) groups[g] = [];
      groups[g].push(opt);
    }
    return Object.keys(groups).map(g => ({ group: g, options: groups[g] }));
  }

  get hasGroups(): boolean {
    return this.options.some(o => o.group);
  }

  selectOption(option: SelectOption) {
    if (option.disabled) return;
    if (this.multiple) {
      const idx = this.selectedValues.indexOf(option.value);
      if (idx > -1) {
        this.selectedValues = this.selectedValues.filter(v => v !== option.value);
      } else {
        this.selectedValues = [...this.selectedValues, option.value];
      }
      this.onChange(this.selectedValues);
    } else {
      this.selectedValue = option.value;
      this.onChange(this.selectedValue);
      this.isOpen = false;
      this.searchQuery = '';
    }
    this.onTouched();
  }

  isSelected(value: any): boolean {
    if (this.multiple) return this.selectedValues.includes(value);
    return this.selectedValue === value;
  }

  getSelectedLabel(): string {
    if (this.multiple) {
      if (this.selectedValues.length === 0) return '';
      if (this.selectedValues.length === 1) {
        return this.options.find(o => o.value === this.selectedValues[0])?.label ?? '';
      }
      return `${this.selectedValues.length} selected`;
    }
    return this.options.find(o => o.value === this.selectedValue)?.label ?? '';
  }

  getSelectedIcon(): string {
    if (this.multiple) return '';
    return this.options.find(o => o.value === this.selectedValue)?.icon ?? '';
  }

  clear(event: MouseEvent) {
    event.stopPropagation();
    this.selectedValue = null;
    this.selectedValues = [];
    this.onChange(this.multiple ? [] : null);
  }

  removeTag(value: any, event: MouseEvent) {
    event.stopPropagation();
    this.selectedValues = this.selectedValues.filter(v => v !== value);
    this.onChange(this.selectedValues);
  }

  getLabelForValue(value: any): string {
    return this.options.find(o => o.value === value)?.label ?? '';
  }

  writeValue(value: any): void {
    if (this.multiple) {
      this.selectedValues = value ?? [];
    } else {
      this.selectedValue = value ?? null;
    }
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  getWrapperClass(): string {
    return ['sel-field', `sel-field-${this.variant}`, `sel-field-${this.size}`,
      this.isOpen ? 'sel-open' : '',
      this.disabled ? 'sel-disabled' : '',
      this.errorMessage ? 'sel-error' : '',
      this.prefixIcon ? 'sel-has-prefix' : '',
    ].filter(Boolean).join(' ');
  }
 

}
