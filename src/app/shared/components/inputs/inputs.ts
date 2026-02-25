import { NgStyle } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { After } from 'v8';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color' | 'range' | 'textarea';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'outlined' | 'underline';
export type InputState = 'default' | 'success' | 'error' | 'warning';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, NgStyle],
  templateUrl: './inputs.html',
  styleUrl: './inputs.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputsComponent),
      multi: true
    }
  ]
})
export class InputsComponent implements ControlValueAccessor, AfterViewInit {

    @ViewChild('prefixRef') prefixRef?: ElementRef;
  @ViewChild('suffixRef') suffixRef?: ElementRef;
  @Input() type: InputType = 'text';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() hint = '';
  @Input() errorMessage = '';
  @Input() successMessage = '';
  @Input() size: InputSize = 'md';
  @Input() variant: InputVariant = 'default';
  @Input() state: InputState = 'default';
  @Input() prefixIcon = '';
  @Input() suffixIcon = '';
  @Input() prefixText = '';
  @Input() suffixText = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() clearable = false;
  @Input() counter = false;
  @Input() maxLength = 0;
  @Input() rows = 4;

  value = '';
  showPassword = false;
  isFocused = false;
   prefixWidth = 0;
  suffixWidth = 0;

  private onChange = (value: string) => {};
  private onTouched = () => {};

   ngAfterViewInit() {
    if (this.prefixRef) {
      this.prefixWidth = this.prefixRef.nativeElement.offsetWidth;
    }
    if (this.suffixRef) {
      this.suffixWidth = this.suffixRef.nativeElement.offsetWidth;
    }
  }

    getPaddingStyle(): Record<string, string> {
    const style: Record<string, string> = {};
    if (this.prefixText && this.prefixWidth) {
      style['paddingLeft'] = (this.prefixWidth + 8) + 'px';
    } else if (this.prefixIcon) {
      style['paddingLeft'] = '36px';
    }
    if (this.suffixText && this.suffixWidth) {
      style['paddingRight'] = (this.suffixWidth + 8) + 'px';
    } else if (this.suffixIcon || this.type === 'password' || this.clearable) {
      style['paddingRight'] = '36px';
    }
    return style;
  }

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }

  onFocus() { this.isFocused = true; }
  onBlur()  { this.isFocused = false; this.onTouched(); }

  clear() {
    this.value = '';
    this.onChange('');
  }

  togglePassword() { this.showPassword = !this.showPassword; }

  getEffectiveType(): string {
    if (this.type === 'password') return this.showPassword ? 'text' : 'password';
    return this.type;
  }

  writeValue(value: string): void { this.value = value ?? ''; }
  registerOnChange(fn: (value: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  getWrapperClass(): string {
    return ['inp-wrapper', `inp-wrapper-${this.size}`].join(' ');
  }

getFieldClass(): string {
  return [
    'inp-field',
    `inp-field-${this.variant}`,
    `inp-field-${this.size}`,
    `inp-field-${this.state}`,
    this.isFocused ? 'inp-focused' : '',
    this.disabled ? 'inp-disabled' : '',
    this.prefixIcon ? 'inp-has-prefix' : '',
    this.prefixText ? 'inp-has-prefix-text' : '',
    this.suffixText ? 'inp-has-suffix-text' : '',
    this.suffixIcon || this.type === 'password' || this.clearable ? 'inp-has-suffix' : '',
  ].filter(Boolean).join(' ');
}

  getLabelClass(): string {
    return [
      'inp-label',
      `inp-label-${this.size}`,
      this.state !== 'default' ? `inp-label-${this.state}` : '',
    ].filter(Boolean).join(' ');
  }
}