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

  refInput  = '';
  searched  = false;
  loading   = false;
  result: ComplaintResult | null = null;
  notFound  = false;
  activeTab = 'timeline';

  // JSC-specific mock complaints database
  private mockDb: { [key: string]: ComplaintResult } = {

    'JSC-2026-1234': {
      ref: 'JSC-2026-1234',
      title: 'Judicial Misconduct — Biased Ruling Against Defendant',
      category: 'Judicial Misconduct',
      categoryIcon: 'bi bi-person-x',
      categoryColor: 'red',
      location: 'High Court, Dar es Salaam — Court Room 3',
      district: 'High Court — Dar es Salaam',
      urgency: 'High',
      urgencyColor: 'orange',
      status: 'In Progress',
      statusColor: 'orange',
      submittedDate: 'Jan 15, 2026',
      lastUpdate: '3 hours ago',
      daysOpen: 7,
      officer: 'Farida Mwalimu',
      officerInitials: 'FM',
      officerDept: 'JSC Investigations Unit',
      resolutionRate: 55,
      timeline: [
        { state: 'done',    icon: 'bi bi-check-lg',   title: 'Complaint Received',          sub: 'Jan 15, 2026 · 10:20 AM', date: 'Jan 15' },
        { state: 'done',    icon: 'bi bi-check-lg',   title: 'Complaint Reviewed & Logged', sub: 'Jan 15, 2026 · 02:45 PM', date: 'Jan 15' },
        { state: 'done',    icon: 'bi bi-check-lg',   title: 'Investigation Officer Assigned', sub: 'Jan 16, 2026 · 09:00 AM', date: 'Jan 16' },
        { state: 'active',  icon: 'bi bi-search',     title: 'Investigation Underway',      sub: 'Gathering case records and witness statements', date: 'Jan 18' },
        { state: 'pending', icon: 'bi bi-check2-all', title: 'Decision & Resolution',       sub: 'Pending investigation outcome', date: 'Est. Feb 5' },
      ],
      updates: [
        { date: 'Jan 18, 2026 · 11:00 AM', message: 'The investigation team has obtained court transcripts and case records. Witness statements are currently being collected. The process is expected to take 2–3 weeks.', author: 'Farida Mwalimu' },
        { date: 'Jan 16, 2026 · 09:30 AM', message: 'Your complaint has been formally assigned to Investigator Farida Mwalimu of the JSC Investigations Unit. You will receive updates as the investigation progresses.', author: 'Farida Mwalimu' },
        { date: 'Jan 15, 2026 · 02:45 PM', message: 'Your complaint has been reviewed and accepted for investigation. It meets the threshold for formal inquiry under JSC complaint guidelines.', author: 'System' },
      ]
    },

    'JSC-2026-5678': {
      ref: 'JSC-2026-5678',
      title: 'Unreasonable Case Delay — Civil Suit Postponed 6 Times',
      category: 'Unreasonable Delays',
      categoryIcon: 'bi bi-clock-history',
      categoryColor: 'blue',
      location: 'Resident Magistrate Court, Kinondoni',
      district: 'Resident Magistrate Court — Kinondoni',
      urgency: 'Medium',
      urgencyColor: 'amber',
      status: 'Open',
      statusColor: 'red',
      submittedDate: 'Jan 10, 2026',
      lastUpdate: '2 days ago',
      daysOpen: 12,
      officer: 'Pending Assignment',
      officerInitials: '?',
      officerDept: 'JSC Case Management',
      resolutionRate: 15,
      timeline: [
        { state: 'done',    icon: 'bi bi-check-lg', title: 'Complaint Received',      sub: 'Jan 10, 2026 · 08:30 AM', date: 'Jan 10' },
        { state: 'active',  icon: 'bi bi-clock',    title: 'Pending Review',          sub: 'Under initial assessment', date: 'Jan 11' },
        { state: 'pending', icon: 'bi bi-person',   title: 'Officer Assignment',      sub: 'Not yet assigned', date: 'TBD' },
        { state: 'pending', icon: 'bi bi-search',   title: 'Investigation',           sub: 'Pending', date: 'TBD' },
        { state: 'pending', icon: 'bi bi-check2-all', title: 'Resolution',            sub: 'Pending', date: 'TBD' },
      ],
      updates: [
        { date: 'Jan 11, 2026 · 10:00 AM', message: 'Your complaint has been logged and is currently under initial assessment. An investigation officer will be assigned shortly. Please allow 5–7 working days for officer assignment.', author: 'System' },
      ]
    },

    'JSC-2026-9012': {
      ref: 'JSC-2026-9012',
      title: 'Ethical Violation — Judge Disclosed Confidential Information',
      category: 'Ethical Violation',
      categoryIcon: 'bi bi-exclamation-triangle',
      categoryColor: 'orange',
      location: 'High Court — Arusha, Registry Office',
      district: 'High Court — Arusha',
      urgency: 'Critical',
      urgencyColor: 'red',
      status: 'Resolved',
      statusColor: 'green',
      submittedDate: 'Dec 5, 2025',
      lastUpdate: 'Jan 3, 2026',
      daysOpen: 29,
      officer: 'Joseph Kilambe',
      officerInitials: 'JK',
      officerDept: 'JSC Ethics & Conduct Committee',
      resolutionRate: 100,
      timeline: [
        { state: 'done', icon: 'bi bi-check-lg',   title: 'Complaint Received',         sub: 'Dec 5, 2025 · 09:00 AM',  date: 'Dec 5'  },
        { state: 'done', icon: 'bi bi-check-lg',   title: 'Investigation Officer Assigned', sub: 'Dec 6, 2025 · 10:00 AM', date: 'Dec 6' },
        { state: 'done', icon: 'bi bi-check-lg',   title: 'Investigation Completed',    sub: 'Dec 22, 2025 · 04:00 PM', date: 'Dec 22' },
        { state: 'done', icon: 'bi bi-check-lg',   title: 'Decision Issued',            sub: 'Dec 30, 2025 · 11:00 AM', date: 'Dec 30' },
        { state: 'done', icon: 'bi bi-check2-all', title: 'Case Closed',                sub: 'Jan 3, 2026 · 02:00 PM',  date: 'Jan 3'  },
      ],
      updates: [
        { date: 'Jan 3, 2026 · 02:00 PM',  message: 'This case has been formally closed. The Ethics Committee has issued a formal reprimand and directed remedial training. The complainant has been notified of the outcome.', author: 'Joseph Kilambe' },
        { date: 'Dec 30, 2025 · 11:15 AM', message: 'Following a thorough investigation, the Ethics & Conduct Committee has concluded that the complaint is substantiated. A formal decision has been issued and disciplinary action taken.', author: 'Joseph Kilambe' },
        { date: 'Dec 22, 2025 · 04:00 PM', message: 'Investigation has been completed. All evidence reviewed, statements taken, and findings compiled. The matter has been referred to the Ethics Committee for decision.', author: 'Joseph Kilambe' },
        { date: 'Dec 6, 2025 · 10:15 AM',  message: 'Your complaint has been escalated due to its critical nature and assigned to the Ethics & Conduct Committee for expedited review.', author: 'System' },
      ]
    },

  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
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
      const key   = this.refInput.trim().toUpperCase();
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
    this.refInput = '';
    this.searched = false;
    this.result   = null;
    this.notFound = false;
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