import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-complaint-portal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './complaint-portal.html',
  styleUrl: './complaint-portal.css'
})
export class ComplaintPortalComponent implements OnInit {

  menuOpen = false;
  scrolled  = false;

  features = [
    { icon: 'bi bi-lightning-charge', color: 'red',    title: 'Instant Submission',   desc: 'File a complaint in under 2 minutes. Describe your issue, attach evidence, and submit — no lengthy paperwork.' },
    { icon: 'bi bi-eye',              color: 'orange', title: 'Full Transparency',     desc: 'Track your complaint through every stage. Know who is handling it and when to expect resolution.' },
    { icon: 'bi bi-diagram-3',        color: 'green',  title: 'Smart Routing',         desc: 'Complaints are automatically routed to the right department based on category, location, and urgency.' },
    { icon: 'bi bi-bell',             color: 'violet', title: 'Real-Time Alerts',      desc: 'Get SMS and email updates at every milestone. Never wonder about your complaint status again.' },
    { icon: 'bi bi-lock-fill',        color: 'blue',   title: 'Anonymous Filing',      desc: 'Choose to file anonymously for sensitive issues. Your privacy is protected at every step.' },
    { icon: 'bi bi-bar-chart',        color: 'cyan',   title: 'Impact Reports',        desc: 'See how your complaints contribute to community improvement through our public impact dashboard.' },
  ];

  steps = [
    { num: '1', title: 'Submit Your Complaint', desc: 'Describe your issue, select the category and location, and attach any supporting evidence.' },
    { num: '2', title: 'Automatic Routing',      desc: 'The system routes your complaint to the responsible department and assigns a case officer.' },
    { num: '3', title: 'Track Progress',         desc: 'Monitor resolution progress in real time and communicate with the assigned officer.' },
    { num: '4', title: 'Confirm Resolution',     desc: 'Review the resolution, provide feedback, and confirm your complaint has been resolved.' },
  ];

  categories = [
    { icon: 'bi bi-water',              color: 'blue',   name: 'Water & Sanitation', count: '284 active cases' },
    { icon: 'bi bi-lightbulb',          color: 'amber',  name: 'Electricity',        count: '156 active cases' },
    { icon: 'bi bi-trash',              color: 'green',  name: 'Waste Management',   count: '198 active cases' },
    { icon: 'bi bi-signpost',           color: 'red',    name: 'Roads & Transport',  count: '321 active cases' },
    { icon: 'bi bi-shield-exclamation', color: 'violet', name: 'Public Safety',      count: '89 active cases'  },
    { icon: 'bi bi-hospital',           color: 'cyan',   name: 'Health Services',    count: '112 active cases' },
    { icon: 'bi bi-mortarboard',        color: 'orange', name: 'Education',          count: '67 active cases'  },
    { icon: 'bi bi-building',           color: 'teal',   name: 'Gov. Services',      count: '143 active cases' },
  ];

  complaints = [
    { icon: 'bi bi-water',   color: 'red',    title: 'Water Supply Interruption', ref: '#CP-2024-0891', days: '2 days ago', status: 'Open',        statusColor: 'red'    },
    { icon: 'bi bi-trash',   color: 'orange', title: 'Garbage Collection Delay',  ref: '#CP-2024-0887', days: '4 days ago', status: 'In Progress', statusColor: 'orange' },
    { icon: 'bi bi-lightbulb',color: 'green', title: 'Street Light Outage',       ref: '#CP-2024-0854', days: '8 days ago', status: 'Resolved',    statusColor: 'green'  },
  ];

  timeline = [
    { icon: 'bi bi-check', state: 'done',    title: 'Complaint Received',        sub: 'Dec 10, 2024 at 09:14 AM' },
    { icon: 'bi bi-check', state: 'done',    title: 'Assigned to Water Dept.',   sub: 'Dec 10, 2024 at 11:30 AM' },
    { icon: 'bi bi-arrow-right', state: 'active',  title: 'Field Inspection Underway', sub: 'Dec 11, 2024 · In Progress' },
    { icon: 'bi bi-clock', state: 'pending', title: 'Resolution & Closure',      sub: 'Expected: Dec 13, 2024'    },
  ];


  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 30; }

  ngOnInit() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('cp-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  setTimeout(() => {
    document.querySelectorAll('.cp-reveal').forEach(el => observer.observe(el));
  }, 100);
}

scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
}