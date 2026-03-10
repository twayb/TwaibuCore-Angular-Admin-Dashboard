import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

interface TimelineItem {
  state: 'done' | 'active' | 'pending';
  icon: string;
  title: string;
  sub: string;
  date: string;
}

interface ComplaintResult {
  ref: string;
  title: string;
  category: string;
  categoryIcon: string;
  categoryColor: string;
  location: string;
  district: string;
  urgency: string;
  urgencyColor: string;
  status: string;
  statusColor: string;
  submittedDate: string;
  lastUpdate: string;
  daysOpen: number;
  officer: string;
  officerInitials: string;
  officerDept: string;
  resolutionRate: number;
  timeline: TimelineItem[];
  updates: { date: string; message: string; author: string }[];
}

@Component({
  selector: 'app-track-complaint',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
templateUrl: './trackcomplaint.html',
  styleUrl: './trackcomplaint.css',
})
export class TrackComplaintComponent implements OnInit {

  refInput   = '';
  searched   = false;
  loading    = false;
  result: ComplaintResult | null = null;
  notFound   = false;
  activeTab  = 'timeline';

  // Demo complaints database
  private mockDb: { [key: string]: ComplaintResult } = {
    'CP-2026-1234': {
      ref: 'CP-2026-1234',
      title: 'Water Supply Interruption — Block 5',
      category: 'Water & Sanitation',
      categoryIcon: 'bi bi-water',
      categoryColor: 'blue',
      location: 'Msasani Road, Block 5',
      district: 'Kinondoni',
      urgency: 'High',
      urgencyColor: 'orange',
      status: 'In Progress',
      statusColor: 'orange',
      submittedDate: 'Jan 12, 2026',
      lastUpdate: '2 hours ago',
      daysOpen: 4,
      officer: 'Amina Hassan',
      officerInitials: 'AH',
      officerDept: 'Water Authority',
      resolutionRate: 65,
      timeline: [
        { state: 'done',    icon: 'bi bi-check-lg',    title: 'Complaint Received',    sub: 'Jan 12, 2026 · 09:14 AM', date: 'Jan 12' },
        { state: 'done',    icon: 'bi bi-check-lg',    title: 'Case Officer Assigned',  sub: 'Jan 12, 2026 · 11:30 AM', date: 'Jan 12' },
        { state: 'done',    icon: 'bi bi-check-lg',    title: 'Field Inspection Done',  sub: 'Jan 13, 2026 · 02:00 PM', date: 'Jan 13' },
        { state: 'active',  icon: 'bi bi-tools',       title: 'Repair Work Underway',   sub: 'Started Jan 14 · Est. 2 more days', date: 'Jan 14' },
        { state: 'pending', icon: 'bi bi-check2-all',  title: 'Resolution & Closure',   sub: 'Pending completion', date: 'Est. Jan 16' },
      ],
      updates: [
        { date: 'Jan 14, 2026 · 3:00 PM', message: 'Repair crew has arrived on site. The main pipe rupture has been located and repair work has begun. Estimated completion in 48 hours.', author: 'Amina Hassan' },
        { date: 'Jan 13, 2026 · 2:15 PM', message: 'Field inspection completed. A pipe rupture was confirmed near the Block 5 junction. Repair team has been dispatched.', author: 'Amina Hassan' },
        { date: 'Jan 12, 2026 · 11:30 AM', message: 'Your complaint has been reviewed and assigned to the Water Authority department. A case officer has been assigned to your case.', author: 'System' },
      ]
    },
    'CP-2026-5678': {
      ref: 'CP-2026-5678',
      title: 'Pothole on Kariakoo Main Road',
      category: 'Roads & Transport',
      categoryIcon: 'bi bi-signpost',
      categoryColor: 'red',
      location: 'Kariakoo Main Road, near market',
      district: 'Ilala',
      urgency: 'Medium',
      urgencyColor: 'amber',
      status: 'Open',
      statusColor: 'red',
      submittedDate: 'Jan 10, 2026',
      lastUpdate: '1 day ago',
      daysOpen: 6,
      officer: 'Pending Assignment',
      officerInitials: '?',
      officerDept: 'Roads Agency',
      resolutionRate: 20,
      timeline: [
        { state: 'done',    icon: 'bi bi-check-lg',  title: 'Complaint Received',   sub: 'Jan 10, 2026 · 08:00 AM', date: 'Jan 10' },
        { state: 'active',  icon: 'bi bi-clock',     title: 'Pending Assignment',   sub: 'Awaiting case officer', date: 'Jan 11' },
        { state: 'pending', icon: 'bi bi-search',    title: 'Field Inspection',     sub: 'Not yet started', date: 'TBD' },
        { state: 'pending', icon: 'bi bi-tools',     title: 'Repair Work',          sub: 'Pending', date: 'TBD' },
        { state: 'pending', icon: 'bi bi-check2-all','title': 'Closure',            sub: 'Pending', date: 'TBD' },
      ],
      updates: [
        { date: 'Jan 11, 2026 · 9:00 AM', message: 'Your complaint has been logged and is awaiting assignment to a Roads Agency case officer. You will be notified once assigned.', author: 'System' },
      ]
    }
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Pre-fill ref from query param (from register page)
    this.route.queryParams.subscribe(params => {
      if (params['ref']) {
        this.refInput = params['ref'];
        this.search();
      }
    });
  }

  search() {
    if (!this.refInput.trim()) return;
    this.loading  = true;
    this.searched = false;
    this.result   = null;
    this.notFound = false;

    setTimeout(() => {
      const key = this.refInput.trim().toUpperCase();
      const found = this.mockDb[key];
      if (found) {
        this.result = found;
      } else {
        this.notFound = true;
      }
      this.searched = true;
      this.loading  = false;
    }, 1000);
  }

  reset() {
    this.refInput  = '';
    this.searched  = false;
    this.result    = null;
    this.notFound  = false;
  }

  backToPortal() {
    this.router.navigate(['/landing/complaint-portal']);
  }

  fileNew() {
    this.router.navigate(['/landing/register-complaint']);
  }

  get progressWidth(): number {
    return this.result?.resolutionRate ?? 0;
  }
}