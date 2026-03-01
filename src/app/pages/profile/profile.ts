import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastService } from '../../core/services/toast';


type ProfileTab = 'overview' | 'edit' | 'security' | 'activity';

interface Activity {
  id: number;
  action: string;
  detail: string;
  time: string;
  icon: string;
  iconColor: string;
  iconBg: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent {
  toast = inject(ToastService);
  fb    = inject(FormBuilder);

  activeTab = signal<ProfileTab>('overview');
  showCurrentPassword = false;
  showNewPassword     = false;
  showConfirmPassword = false;
  avatarPreview: string | null = null;

  tabs = [
    { key: 'overview',  label: 'Overview',      icon: 'bi bi-person-circle' },
    { key: 'edit',      label: 'Edit Profile',  icon: 'bi bi-pencil-square' },
    { key: 'security',  label: 'Security',      icon: 'bi bi-shield-lock'   },
    { key: 'activity',  label: 'Activity',      icon: 'bi bi-clock-history' },
  ];

  // ── PROFILE DATA ──
  profile = {
    name:       'Twaibu Songoro',
    role:       'Front End Developer',
    department: 'ICT Department',
    email:      'twaibusongoro@live.com',
    phone:      '+255 712 000 000',
    location:   'Dodoma, Tanzania',
    website:    'https://twaibusongoro.dev',
    bio:        'Passionate software engineer with 8+ years of experience building scalable web applications. Lover of clean code, open source, and East African sunsets.',
    joined:     'January 12, 2023',
    avatar:     'TS',
    avatarColor:'#4F6EF7',
    followers:  248,
    following:  132,
    projects:   34,
    tasks:      128,
    commits:    1042,
    reviews:    89,
  };

  skills = [
    { name: 'Angular',     level: 92 },
    { name: 'TypeScript',  level: 88 },
    { name: 'Node.js',     level: 78 },
    { name: 'CSS / Sass',  level: 85 },
    { name: 'PostgreSQL',  level: 70 },
    { name: 'Docker',      level: 65 },
  ];

  socialLinks = [
    { label: 'GitHub',   icon: 'bi bi-github',   url: 'https://github.com',   color: '#1e293b' },
    { label: 'LinkedIn', icon: 'bi bi-linkedin',  url: 'https://linkedin.com', color: '#0077b5' },
    { label: 'Twitter',  icon: 'bi bi-twitter-x', url: 'https://twitter.com',  color: '#000000' },
  ];

  // ── EDIT FORM ──
  editForm: FormGroup = this.fb.group({
    firstName:  ['Twaibu',              Validators.required],
    lastName:   ['Songoro',             Validators.required],
    email:      ['twaibusongoro@live.com',   [Validators.required, Validators.email]],
    phone:      ['+255 712 000 000',     Validators.required],
    department: ['ICT Department',        Validators.required],
    role:       ['Front End Developer',     Validators.required],
    location:   ['Dodoma, Tanzania'],
    website:    ['https://twaibusongoro.dev'],
    bio:        ['Passionate software engineer with 8+ years of experience building scalable web applications. Lover of clean code, open source, and East African sunsets.'],
  });

  hasError(form: FormGroup, field: string): boolean {
    const ctrl = form.get(field);
    return !!ctrl && ctrl.invalid && ctrl.touched;
  }

  isValid(form: FormGroup, field: string): boolean {
    const ctrl = form.get(field);
    return !!ctrl && ctrl.valid && ctrl.touched;
  }

  getError(form: FormGroup, field: string): string {
    const ctrl = form.get(field);
    if (!ctrl?.errors || !ctrl.touched) return '';
    if (ctrl.errors['required'])  return 'This field is required.';
    if (ctrl.errors['email'])     return 'Enter a valid email.';
    if (ctrl.errors['minlength']) return `Minimum ${ctrl.errors['minlength'].requiredLength} characters.`;
    if (ctrl.errors['mismatch'])  return 'Passwords do not match.';
    return 'Invalid value.';
  }

  submitEdit() {
    if (this.editForm.valid) {
      const v = this.editForm.value;
      this.profile.name       = `${v.firstName} ${v.lastName}`;
      this.profile.email      = v.email;
      this.profile.phone      = v.phone;
      this.profile.department = v.department;
      this.profile.role       = v.role;
      this.profile.location   = v.location;
      this.profile.website    = v.website;
      this.profile.bio        = v.bio;
      this.toast.success('Profile updated successfully!', 'Profile Saved');
    } else {
      this.editForm.markAllAsTouched();
      this.toast.error('Please fix the errors before saving.');
    }
  }

  onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => this.avatarPreview = e.target?.result as string;
      reader.readAsDataURL(input.files[0]);
    }
  }

  // ── SECURITY FORM ──
  securityForm: FormGroup = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword:     ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(control: AbstractControl) {
    const np = control.get('newPassword')?.value;
    const cp = control.get('confirmPassword')?.value;
    if (np && cp && np !== cp) {
      control.get('confirmPassword')?.setErrors({ mismatch: true });
    }
    return null;
  }

  get passwordStrength(): number {
    const val = this.securityForm.get('newPassword')?.value ?? '';
    if (val.length === 0) return 0;
    if (val.length < 6)   return 1;
    if (val.length < 8)   return 2;
    if (val.length < 10)  return 3;
    return 4;
  }

  get passwordStrengthLabel(): string {
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    return labels[this.passwordStrength];
  }

  get passwordStrengthColor(): string {
    const colors = ['', '#ef4444', '#f59e0b', '#06b6d4', '#22c55e'];
    return colors[this.passwordStrength];
  }

  submitSecurity() {
    if (this.securityForm.valid) {
      this.toast.success('Password changed successfully!', 'Security Updated');
      this.securityForm.reset();
    } else {
      this.securityForm.markAllAsTouched();
      this.toast.error('Please fix the errors before saving.');
    }
  }

  twoFactorEnabled = false;

  toggleTwoFactor() {
    this.twoFactorEnabled = !this.twoFactorEnabled;
    this.toast.info(
      this.twoFactorEnabled ? '2FA has been enabled.' : '2FA has been disabled.',
      'Two-Factor Authentication'
    );
  }

  activeSessions = [
    { device: 'Chrome on Windows',  location: 'Dar es Salaam, TZ', time: 'Now',          current: true  },
    { device: 'Safari on iPhone',   location: 'Arusha, TZ',        time: '2 hours ago',  current: false },
    { device: 'Firefox on Ubuntu',  location: 'Nairobi, KE',       time: '1 day ago',    current: false },
  ];

  revokeSession(index: number) {
    this.activeSessions.splice(index, 1);
    this.toast.warning('Session revoked.', 'Session Ended');
  }

  // ── ACTIVITY ──
  activities: Activity[] = [
    { id: 1,  action: 'Pushed code',          detail: 'Pushed 3 commits to feature/auth-module',        time: '5 minutes ago',  icon: 'bi bi-code-slash',       iconColor: '#4F6EF7', iconBg: 'rgba(79,110,247,0.12)'  },
    { id: 2,  action: 'Completed task',        detail: 'Marked "Fix login redirect" as done',            time: '1 hour ago',     icon: 'bi bi-check-circle',     iconColor: '#22c55e', iconBg: 'rgba(34,197,94,0.12)'   },
    { id: 3,  action: 'Reviewed PR',           detail: 'Approved pull request #142 by Amina Hassan',     time: '3 hours ago',    icon: 'bi bi-git',              iconColor: '#8b5cf6', iconBg: 'rgba(139,92,246,0.12)'  },
    { id: 4,  action: 'Commented on issue',    detail: 'Left a comment on Issue #89: API timeout',       time: '5 hours ago',    icon: 'bi bi-chat-dots',        iconColor: '#06b6d4', iconBg: 'rgba(6,182,212,0.12)'   },
    { id: 5,  action: 'Created branch',        detail: 'Created branch fix/map-ssr-error',               time: 'Yesterday',      icon: 'bi bi-diagram-2',        iconColor: '#f59e0b', iconBg: 'rgba(245,158,11,0.12)'  },
    { id: 6,  action: 'Deployed to staging',   detail: 'Successfully deployed v2.4.1 to staging env',    time: 'Yesterday',      icon: 'bi bi-cloud-upload',     iconColor: '#22c55e', iconBg: 'rgba(34,197,94,0.12)'   },
    { id: 7,  action: 'Updated profile',       detail: 'Updated bio and contact information',            time: '2 days ago',     icon: 'bi bi-person-check',     iconColor: '#4F6EF7', iconBg: 'rgba(79,110,247,0.12)'  },
    { id: 8,  action: 'Closed issue',          detail: 'Closed Issue #74: Dashboard chart rendering',    time: '2 days ago',     icon: 'bi bi-x-circle',         iconColor: '#ef4444', iconBg: 'rgba(239,68,68,0.12)'   },
    { id: 9,  action: 'Joined team',           detail: 'Added to the Mobile App Development team',       time: '3 days ago',     icon: 'bi bi-people',           iconColor: '#8b5cf6', iconBg: 'rgba(139,92,246,0.12)'  },
    { id: 10, action: 'Opened pull request',   detail: 'Opened PR #138: Add sticky table headers',       time: '4 days ago',     icon: 'bi bi-arrow-up-circle',  iconColor: '#06b6d4', iconBg: 'rgba(6,182,212,0.12)'   },
    { id: 11, action: 'Fixed bug',             detail: 'Fixed critical NullRef in orders service',       time: '5 days ago',     icon: 'bi bi-bug',              iconColor: '#ef4444', iconBg: 'rgba(239,68,68,0.12)'   },
    { id: 12, action: 'Created project',       detail: 'Initialized TwaibuCore Angular Dashboard repo',  time: '1 week ago',     icon: 'bi bi-folder-plus',      iconColor: '#f59e0b', iconBg: 'rgba(245,158,11,0.12)'  },
  ];
}