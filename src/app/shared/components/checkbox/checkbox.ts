import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'default' | 'filled' | 'outlined';
export type CheckboxColor = 'primary' | 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() description = '';
  @Input() size: CheckboxSize = 'md';
  @Input() variant: CheckboxVariant = 'filled';
  @Input() color: CheckboxColor = 'primary';
  @Input() disabled = false;
  @Input() indeterminate = false;
  @Input() checked = false;
  @Output() changed = new EventEmitter<boolean>();

  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onChange(this.checked);
      this.onTouched();
      this.changed.emit(this.checked);
    }
  }

  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getBoxClass(): string {
    return [
      'cb-box',
      `cb-box-${this.variant}`,
      `cb-box-${this.color}`,
      `cb-box-${this.size}`,
      this.checked ? 'cb-checked' : '',
      this.indeterminate ? 'cb-indeterminate' : '',
      this.disabled ? 'cb-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  getLabelClass(): string {
    return [
      'cb-label',
      `cb-label-${this.size}`,
      this.disabled ? 'cb-label-disabled' : '',
    ].filter(Boolean).join(' ');
  }
}