import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface StepperStep {
  label: string;
  description?: string;
  icon?: string;
}

export type StepperVariant = 'default' | 'outlined' | 'filled' | 'arrow';
export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperColor = 'primary' | 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [],
  templateUrl: './stepper.html',
  styleUrl: './stepper.css',
})
export class StepperComponent {

    @Input() steps: StepperStep[] = [];
  @Input() currentStep = 0;
  @Input() variant: StepperVariant = 'default';
  @Input() orientation: StepperOrientation = 'horizontal';
  @Input() color: StepperColor = 'primary';
  @Input() clickable = false;
  @Output() stepChanged = new EventEmitter<number>();

  goToStep(index: number) {
    if (this.clickable && index <= this.currentStep) {
      this.currentStep = index;
      this.stepChanged.emit(index);
    }
  }

  isCompleted(index: number): boolean { return index < this.currentStep; }
  isActive(index: number): boolean    { return index === this.currentStep; }
  isPending(index: number): boolean   { return index > this.currentStep; }
  isLast(index: number): boolean      { return index === this.steps.length - 1; }

  getStepClass(index: number): string {
    return [
      'stp-step',
      `stp-step-${this.variant}`,
      this.isCompleted(index) ? 'stp-completed' : '',
      this.isActive(index)    ? 'stp-active'    : '',
      this.isPending(index)   ? 'stp-pending'   : '',
      this.clickable && index <= this.currentStep ? 'stp-clickable' : '',
    ].filter(Boolean).join(' ');
  }

  getIndicatorClass(index: number): string {
    return [
      'stp-indicator',
      `stp-indicator-${this.variant}`,
      `stp-indicator-${this.color}`,
      this.isCompleted(index) ? 'stp-ind-completed' : '',
      this.isActive(index)    ? 'stp-ind-active'    : '',
      this.isPending(index)   ? 'stp-ind-pending'   : '',
    ].filter(Boolean).join(' ');
  }

  getConnectorClass(index: number): string {
    return [
      'stp-connector',
      this.isCompleted(index) ? `stp-connector-done-${this.color}` : '',
    ].filter(Boolean).join(' ');
  }

  getWrapperClass(): string {
    return [
      'stp-wrapper',
      `stp-${this.orientation}`,
      `stp-variant-${this.variant}`,
    ].join(' ');
  }

}
