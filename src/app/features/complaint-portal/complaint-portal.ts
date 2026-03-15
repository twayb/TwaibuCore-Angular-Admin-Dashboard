import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-complaint-portal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './complaint-portal.html',
  styleUrl: './complaint-portal.css'
})
export class ComplaintPortalComponent implements OnInit {

  scrolled = false;
  menuOpen = false;

  steps = [
    { num: '01', icon: 'bi bi-person-plus',   title: 'Register Account',
      desc: 'Create your secure account with valid identification. This ensures authenticity and allows you to track your complaint.' },
    { num: '02', icon: 'bi bi-card-text',      title: 'Provide Details',
      desc: 'Fill out the complaint form with accurate information including dates, locations, and descriptions of the incident.' },
    { num: '03', icon: 'bi bi-cloud-upload',   title: 'Upload Evidence',
      desc: 'Attach supporting documents, photos, or any relevant materials that strengthen your complaint.' },
    { num: '04', icon: 'bi bi-send-check',     title: 'Submit & Monitor',
      desc: 'Submit your complaint and receive a tracking number. Monitor progress and receive updates throughout the process.' },
  ];

  complaintTypes = [
    { icon: 'bi bi-person-x',        color: 'red',    name: 'Judicial Misconduct',  count: '142 cases', desc: 'Improper conduct by judicial officers' },
    { icon: 'bi bi-exclamation-triangle', color: 'orange', name: 'Ethical Violation',    count: '89 cases',  desc: 'Breach of professional ethics standards' },
    { icon: 'bi bi-gear-x',          color: 'violet', name: 'Procedural Issues',    count: '67 cases',  desc: 'Irregularities in court proceedings' },
    { icon: 'bi bi-emoji-angry',     color: 'amber',  name: 'Drinking Behavior',    count: '23 cases',  desc: 'Conduct unbecoming while on duty' },
  ];

  complaintSources = [
    { icon: 'bi bi-person',          color: 'blue',   name: 'Individual Citizen',   count: '1,240+', desc: 'Any member of the public with a valid concern' },
    { icon: 'bi bi-briefcase',       color: 'green',  name: 'Legal Practitioner',   count: '380+',   desc: 'Advocates, attorneys, and legal representatives' },
    { icon: 'bi bi-building',        color: 'cyan',   name: 'Organization',         count: '95+',    desc: 'NGOs, firms, and registered institutions' },
    { icon: 'bi bi-people',          color: 'teal',   name: 'Group / Community',    count: '210+',   desc: 'Community groups filing collective complaints' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.initScrollReveal();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 10;
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.menuOpen = false;
  }

  private initScrollReveal() {
    const selectors = '.cp-reveal, .cp-reveal-left, .cp-reveal-right';
    const observer  = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('cp-visible');
        } else {
          e.target.classList.remove('cp-visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    setTimeout(() => {
      document.querySelectorAll(selectors).forEach(el => observer.observe(el));
    }, 120);
  }
}