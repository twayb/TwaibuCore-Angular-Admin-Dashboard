import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './intro.html',
  styleUrl: './intro.css'
})
export class IntroComponent implements OnInit, AfterViewInit {

  scrolled   = false;
  activeSection = 'hero';

  techStack = [
    {
      icon: 'bi bi-hexagon-fill',
      color: 'red',
      name: 'Angular 20',
      label: 'Framework',
      points: [
        'Standalone components — no NgModule needed',
        'New @for / @if control flow syntax',
        'Signals & effect() for reactive state',
        'inject() function for clean DI',
        'Lazy-loaded routes via loadComponent()',
      ]
    },
    {
      icon: 'bi bi-palette-fill',
      color: 'blue',
      name: 'CSS Architecture',
      label: 'Styling',
      points: [
        'Global CSS variables for light & dark mode',
        'Component-scoped styles — zero leakage',
        'Unique prefix per module (tc-, oas-, cp-)',
        ':host scoping keeps styles inside components',
        'TwaibuCore design token system',
      ]
    },
    {
      icon: 'bi bi-wind',
      color: 'cyan',
      name: 'Tailwind CSS',
      label: 'Utilities',
      points: [
        'Used selectively in admin dashboard pages',
        'Utility classes for spacing & layout',
        'Not used in landing pages',
        'Landing pages use full scoped CSS',
        'Best of both worlds approach',
      ]
    },
  ];

  modules = [
    { icon: 'bi bi-speedometer2',   color: 'blue',   name: 'Admin Dashboard',      desc: 'KPI cards, charts, activity feed, analytics overview' },
    { icon: 'bi bi-file-earmark-check', color: 'indigo', name: 'Online Application',  desc: 'JSC vacancy listings, multi-step application flow' },
    { icon: 'bi bi-megaphone',      color: 'red',    name: 'Complaint Portal',      desc: 'Lodge, track and resolve judicial complaints' },
    { icon: 'bi bi-table',          color: 'green',  name: 'Tables & CRUD',         desc: 'Advanced tables with filter, sort, pagination, inline edit' },
    { icon: 'bi bi-ui-checks-grid', color: 'violet', name: 'Component Library',     desc: 'Badges, buttons, modals, cards, inputs, dropdowns, tabs' },
    { icon: 'bi bi-calendar-week',  color: 'amber',  name: 'Calendar & Email',      desc: 'Full calendar with CRUD events, email client with folders' },
    { icon: 'bi bi-moon-stars',     color: 'teal',   name: 'Dark / Light Mode',     desc: 'System-wide toggle via LayoutService signals' },
    { icon: 'bi bi-shield-lock',    color: 'orange', name: 'Auth & Security',       desc: 'Login, register, forgot password, lockscreen, idle timeout' },
  ];

  codeSnippet!: SafeHtml;

  private rawCode = [
    '<span class="ti-kw">@Injectable</span>({ providedIn: <span class="ti-str">&apos;root&apos;</span> })',
    '<span class="ti-kw">export class</span> <span class="ti-cl">LayoutService</span> {',
    '  isDarkMode = <span class="ti-fn">signal</span>(<span class="ti-kw">false</span>);',
    '  isCollapsed = <span class="ti-fn">signal</span>(<span class="ti-kw">false</span>);',
    '',
    '  <span class="ti-kw">constructor</span>() {',
    '    <span class="ti-fn">effect</span>(() => {',
    '      document.documentElement',
    '        .classList',
    '        .<span class="ti-fn">toggle</span>(<span class="ti-str">&apos;dark&apos;</span>, this.isDarkMode());',
    '    });',
    '  }',
    '}',
  ].join('\n');

  stats = [
    { value: '20+',  label: 'Angular Version'     },
    { value: '15+',  label: 'Sessions Built'       },
    { value: '50+',  label: 'Components'           },
    { value: '3',    label: 'Landing Pages'        },
  ];

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.codeSnippet = this.sanitizer.bypassSecurityTrustHtml(this.rawCode);
  }

  ngAfterViewInit() {
    this.initScrollReveal();
    this.initActiveSection();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 20;
  }

  goToDashboard() {
    this.router.navigate(['/dashboard/admin']);
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
        } else {
          e.target.classList.remove('in-view');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);
  }

  private initActiveSection() {
    const sections = ['hero', 'stack', 'modules', 'cta'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) this.activeSection = e.target.id;
      });
    }, { threshold: 0.4 });

    setTimeout(() => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);
  }
}