import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

export interface ComplaintForm {
  // Step 1
  category: string;
  subcategory: string;
  // Step 2
  title: string;
  description: string;
  location: string;
  district: string;
  urgency: string;
  // Step 3
  files: File[];
  // Step 4
  anonymous: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  // Step 5 — review only
}

@Component({
  selector: 'app-register-complaint',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
   templateUrl: './registercomplaint.html',
  styleUrl: './registercomplaint.css',
})
export class RegisterComplaintComponent implements OnInit {

  currentStep = 1;
  totalSteps  = 5;
  submitted   = false;
  refNumber   = '';

  form: ComplaintForm = {
    category: '', subcategory: '',
    title: '', description: '', location: '', district: '', urgency: 'medium',
    files: [],
    anonymous: false, firstName: '', lastName: '', phone: '', email: ''
  };

  steps = [
    { num: 1, label: 'Category',    icon: 'bi bi-grid'              },
    { num: 2, label: 'Details',     icon: 'bi bi-card-text'         },
    { num: 3, label: 'Evidence',    icon: 'bi bi-paperclip'         },
    { num: 4, label: 'Contact',     icon: 'bi bi-person'            },
    { num: 5, label: 'Review',      icon: 'bi bi-check-circle'      },
  ];

  categories = [
    { id: 'water',      icon: 'bi bi-water',              color: 'blue',   label: 'Water & Sanitation',  subs: ['No water supply', 'Contaminated water', 'Pipe damage', 'Billing issue'] },
    { id: 'roads',      icon: 'bi bi-signpost',           color: 'red',    label: 'Roads & Transport',   subs: ['Pothole', 'Road damage', 'Traffic signs', 'Street lights'] },
    { id: 'electricity',icon: 'bi bi-lightbulb',          color: 'amber',  label: 'Electricity',         subs: ['Power outage', 'Damaged cables', 'Street light', 'Billing issue'] },
    { id: 'waste',      icon: 'bi bi-trash',              color: 'green',  label: 'Waste Management',    subs: ['Uncollected garbage', 'Illegal dumping', 'Blocked drain', 'Littering'] },
    { id: 'safety',     icon: 'bi bi-shield-exclamation', color: 'violet', label: 'Public Safety',       subs: ['Vandalism', 'Unsafe building', 'Noise complaint', 'Other'] },
    { id: 'health',     icon: 'bi bi-hospital',           color: 'cyan',   label: 'Health Services',     subs: ['Poor service', 'Drug shortage', 'Facility condition', 'Staff conduct'] },
    { id: 'education',  icon: 'bi bi-mortarboard',        color: 'orange', label: 'Education',           subs: ['School facility', 'Teacher conduct', 'Fees issue', 'Other'] },
    { id: 'government', icon: 'bi bi-building',           color: 'teal',   label: 'Gov. Services',       subs: ['Corruption', 'Poor service', 'Delayed documents', 'Other'] },
  ];

  urgencies = [
    { id: 'low',      label: 'Low',      desc: 'Non-urgent, can wait',         color: 'green'  },
    { id: 'medium',   label: 'Medium',   desc: 'Needs attention soon',         color: 'amber'  },
    { id: 'high',     label: 'High',     desc: 'Urgent, affecting many people', color: 'orange' },
    { id: 'critical', label: 'Critical', desc: 'Emergency, immediate action',  color: 'red'    },
  ];

  districts = ['Kinondoni', 'Ilala', 'Temeke', 'Ubungo', 'Kigamboni', 'Arusha', 'Mbeya', 'Dodoma', 'Mwanza', 'Other'];

  dragOver = false;

  get selectedCategory() {
    return this.categories.find(c => c.id === this.form.category);
  }

  get progress() {
    return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
  }

  get canNext(): boolean {
    switch (this.currentStep) {
      case 1: return !!this.form.category && !!this.form.subcategory;
      case 2: return !!this.form.title && !!this.form.description && !!this.form.location && !!this.form.district;
      case 3: return true;
      case 4: return this.form.anonymous || (!!this.form.firstName && !!this.form.lastName && !!this.form.phone);
      default: return true;
    }
  }

  constructor(private router: Router) {}

  ngOnInit() {}

  selectCategory(id: string) {
    this.form.category    = id;
    this.form.subcategory = '';
  }

  next() {
    if (this.canNext && this.currentStep < this.totalSteps) {
      this.currentStep++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prev() {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToStep(n: number) {
    if (n < this.currentStep) {
      this.currentStep = n;
    }
  }

  onDragOver(e: DragEvent) { e.preventDefault(); this.dragOver = true;  }
  onDragLeave()             {                      this.dragOver = false; }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.dragOver = false;
    const files = Array.from(e.dataTransfer?.files ?? []);
    this.addFiles(files);
  }

  onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    this.addFiles(files);
  }

  addFiles(files: File[]) {
    const allowed = files.filter(f =>
      f.type.startsWith('image/') || f.type === 'application/pdf' || f.type.startsWith('video/')
    );
    this.form.files = [...this.form.files, ...allowed].slice(0, 5);
  }

  removeFile(i: number) {
    this.form.files.splice(i, 1);
  }

  fileIcon(file: File): string {
    if (file.type.startsWith('image/')) return 'bi bi-image';
    if (file.type === 'application/pdf') return 'bi bi-file-pdf';
    if (file.type.startsWith('video/')) return 'bi bi-camera-video';
    return 'bi bi-file-earmark';
  }

  fileSize(bytes: number): string {
    if (bytes < 1024)       return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  submit() {
    this.refNumber = 'CP-2026-' + Math.floor(1000 + Math.random() * 9000);
    this.submitted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  trackComplaint() {
    this.router.navigate(['/landing/track-complaint'], {
      queryParams: { ref: this.refNumber }
    });
  }

  backToPortal() {
    this.router.navigate(['/landing/complaint-portal']);
  }
}