import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '../components/select/select';

export type FormTab = 'basic' | 'layout' | 'validation' | 'advanced' | 'wizard';


@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './forms.html',
  styleUrl: './forms.css',
})
export class FormsComponent {
    toast = inject(ToastService);
  fb = inject(FormBuilder);

  activeTab: FormTab = 'basic';

  tabs = [
    { key: 'basic',      label: 'Basic Forms',      icon: 'bi bi-input-cursor-text' },
    { key: 'layout',     label: 'Form Layouts',      icon: 'bi bi-layout-split' },
    { key: 'validation', label: 'Validation',        icon: 'bi bi-shield-check' },
    { key: 'advanced',   label: 'Advanced Inputs',   icon: 'bi bi-sliders' },
    { key: 'wizard',     label: 'Form Wizard',       icon: 'bi bi-list-ol' },
  ];

  // ── BASIC FORM ──
  basicForm: FormGroup = this.fb.group({
    firstName:  ['', Validators.required],
    lastName:   ['', Validators.required],
    email:      ['', [Validators.required, Validators.email]],
    phone:      [''],
    password:   ['', [Validators.required, Validators.minLength(8)]],
    bio:        [''],
  });

  submitBasic() {
    if (this.basicForm.valid) {
      this.toast.success('Basic form submitted successfully!');
      this.basicForm.reset();
    } else {
      this.basicForm.markAllAsTouched();
      this.toast.error('Please fix the errors before submitting.');
    }
  }

  // ── HORIZONTAL FORM ──
  horizontalForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    email:    ['', [Validators.required, Validators.email]],
    role:     ['', Validators.required],
    status:   ['active'],
  });

  submitHorizontal() {
    if (this.horizontalForm.valid) {
      this.toast.success('Horizontal form submitted!');
      this.horizontalForm.reset();
    } else {
      this.horizontalForm.markAllAsTouched();
      this.toast.error('Please fill all required fields.');
    }
  }

  // ── INLINE FORM ──
  inlineSearch = '';
  inlineCategory = '';

  submitInline() {
    if (this.inlineSearch) {
      this.toast.info(`Searching for "${this.inlineSearch}" in ${this.inlineCategory || 'All'}`);
      this.inlineSearch = '';
      this.inlineCategory = '';
    } else {
      this.toast.warning('Please enter a search term.');
    }
  }

  // ── GRID FORM ──
  gridForm: FormGroup = this.fb.group({
    firstName:  ['', Validators.required],
    lastName:   ['', Validators.required],
    email:      ['', [Validators.required, Validators.email]],
    phone:      [''],
    address:    ['', Validators.required],
    city:       ['', Validators.required],
    country:    ['', Validators.required],
    zip:        [''],
  });

  submitGrid() {
    if (this.gridForm.valid) {
      this.toast.success('Profile saved successfully!');
    } else {
      this.gridForm.markAllAsTouched();
      this.toast.error('Please fill all required fields.');
    }
  }

  // ── VALIDATION FORM ──
  validationForm: FormGroup = this.fb.group({
    username:        ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email:           ['', [Validators.required, Validators.email]],
    password:        ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).*$/)]],
    confirmPassword: ['', Validators.required],
    age:             ['', [Validators.required, Validators.min(18), Validators.max(100)]],
    website:         ['', Validators.pattern(/^https?:\/\/.+/)],
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirm  = control.get('confirmPassword')?.value;
    if (password && confirm && password !== confirm) {
      control.get('confirmPassword')?.setErrors({ mismatch: true });
    }
    return null;
  }

  hasError(form: FormGroup, field: string, error?: string): boolean {
    const ctrl = form.get(field);
    if (!ctrl || !ctrl.touched) return false;
    if (error) return ctrl.hasError(error);
    return ctrl.invalid;
  }

  getError(form: FormGroup, field: string): string {
    const ctrl = form.get(field);
    if (!ctrl || !ctrl.errors || !ctrl.touched) return '';
    if (ctrl.errors['required'])   return 'This field is required.';
    if (ctrl.errors['email'])      return 'Enter a valid email address.';
    if (ctrl.errors['minlength'])  return `Minimum ${ctrl.errors['minlength'].requiredLength} characters.`;
    if (ctrl.errors['maxlength'])  return `Maximum ${ctrl.errors['maxlength'].requiredLength} characters.`;
    if (ctrl.errors['min'])        return `Minimum value is ${ctrl.errors['min'].min}.`;
    if (ctrl.errors['max'])        return `Maximum value is ${ctrl.errors['max'].max}.`;
    if (ctrl.errors['pattern'])    return 'Invalid format.';
    if (ctrl.errors['mismatch'])   return 'Passwords do not match.';
    return 'Invalid value.';
  }

  isValid(form: FormGroup, field: string): boolean {
    const ctrl = form.get(field);
    return !!ctrl && ctrl.valid && ctrl.touched;
  }

  submitValidation() {
    if (this.validationForm.valid) {
      this.toast.success('Account created successfully!');
      this.validationForm.reset();
    } else {
      this.validationForm.markAllAsTouched();
      this.toast.error('Please fix validation errors.');
    }
  }

  // ── ADVANCED INPUTS ──
  rangeValue = 50;
  colorValue = '#4F6EF7';
  selectedTags: string[] = [];
  availableTags = ['Angular', 'TypeScript', 'CSS', 'HTML', 'JavaScript', 'Node.js', 'Python', 'React'];
  rating = 0;
  hoverRating = 0;
  showPassword = false;
  fileNames: string[] = [];

  toggleTag(tag: string) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    } else {
      this.selectedTags = [...this.selectedTags, tag];
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.fileNames = Array.from(input.files).map(f => f.name);
    }
  }

  submitAdvanced() {
    this.toast.success('Advanced form submitted!', 'Saved');
  }

  // ── WIZARD ──
  wizardStep = 0;
  wizardSteps = ['Personal Info', 'Account Setup', 'Preferences', 'Review'];

  wizardForm: FormGroup = this.fb.group({
    // Step 1
    firstName:  ['', Validators.required],
    lastName:   ['', Validators.required],
    email:      ['', [Validators.required, Validators.email]],
    phone:      [''],
    // Step 2
    username:   ['', [Validators.required, Validators.minLength(3)]],
    password:   ['', [Validators.required, Validators.minLength(8)]],
    role:       ['viewer'],
    // Step 3
    newsletter: [true],
    theme:      ['light'],
    language:   ['en'],
  });

  wizardStepFields: string[][] = [
    ['firstName', 'lastName', 'email'],
    ['username', 'password'],
    [],
  ];

  canProceed(): boolean {
    const fields = this.wizardStepFields[this.wizardStep] ?? [];
    return fields.every(f => this.wizardForm.get(f)?.valid);
  }

  nextStep() {
    if (this.canProceed()) {
      this.wizardStep++;
    } else {
      const fields = this.wizardStepFields[this.wizardStep];
      fields.forEach(f => this.wizardForm.get(f)?.markAsTouched());
      this.toast.warning('Please complete all required fields.');
    }
  }

  prevStep() {
    if (this.wizardStep > 0) this.wizardStep--;
  }

  submitWizard() {
    this.toast.success('Registration complete! Welcome aboard.', 'Account Created');
    this.wizardStep = 0;
    this.wizardForm.reset({ newsletter: true, theme: 'light', language: 'en', role: 'viewer' });
  }

  getWizardValue(field: string): any {
    return this.wizardForm.get(field)?.value;
  }

}
