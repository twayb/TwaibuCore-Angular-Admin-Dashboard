import { Component, OnInit, AfterViewInit, OnDestroy, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LayoutService } from '../../core/services/layout-service';


export interface Vacancy {
  id: number;
  post: string;
  numberOfPosts: number;
  deadline: string;
  department: string;
}

export interface FeedbackForm {
  name:     string;
  email:    string;
  rating:   number;
  category: string;
  message:  string;
}

export interface FeedbackErrors {
  name?:    string;
  email?:   string;
  rating?:  string;
  message?: string;
}

@Component({
  selector: 'app-online-application',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './online-application.html',
  styleUrl: './online-application.css'
})
export class OnlineApplicationComponent implements OnInit, AfterViewInit, OnDestroy {

  layout = inject(LayoutService);

  scrolled    = false;
  searchQuery = '';

  // ── Feedback modal state ──
  feedbackOpen      = false;
  feedbackSubmitted = false;
  feedbackLoading   = false;
  feedbackHover     = 0;

  feedback: FeedbackForm = {
    name: '', email: '', rating: 0, category: '', message: ''
  };

  feedbackErrors: FeedbackErrors = {};

  allVacancies: Vacancy[] = [
    { id: 1, post: 'Judge of the High Court',   numberOfPosts: 5,  deadline: 'Feb 28, 2026', department: 'High Court'       },
    { id: 2, post: 'Resident Magistrate',        numberOfPosts: 12, deadline: 'Feb 28, 2026', department: 'Magistrate Court' },
    { id: 3, post: 'District Magistrate',        numberOfPosts: 8,  deadline: 'Mar 15, 2026', department: 'District Court'   },
    { id: 4, post: 'Senior State Attorney',      numberOfPosts: 3,  deadline: 'Mar 15, 2026', department: 'Attorney General' },
    { id: 5, post: 'State Attorney',             numberOfPosts: 10, deadline: 'Mar 20, 2026', department: 'Attorney General' },
    { id: 6, post: 'Court Registrar',            numberOfPosts: 4,  deadline: 'Mar 20, 2026', department: 'Registry'         },
    { id: 7, post: 'Legal Officer',              numberOfPosts: 6,  deadline: 'Apr 01, 2026', department: 'JSC Secretariat'  },
    { id: 8, post: 'Administrative Officer',     numberOfPosts: 7,  deadline: 'Apr 01, 2026', department: 'Administration'   },
  ];

  filteredVacancies: Vacancy[] = [];

  steps = [
    { icon: 'bi bi-person-plus',       title: 'Create Account',     desc: 'Register with your accurate personal information to access the portal'               },
    { icon: 'bi bi-person-lines-fill', title: 'Complete Profile',   desc: 'Fill in your educational background, work experience, and upload required documents' },
    { icon: 'bi bi-search',            title: 'Browse Vacancies',   desc: 'Review available positions and ensure you meet all qualifications before applying'   },
    { icon: 'bi bi-send',              title: 'Submit Application', desc: 'Fill all sections accurately and submit your application before the closing deadline' },
  ];

  private animFrameId   = 0;
  private resizeHandler: (() => void) | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.filteredVacancies = [...this.allVacancies];
    this.initScrollReveal();
  }

  ngAfterViewInit() {
    setTimeout(() => this.initGridCanvas(), 50);
  }

  ngOnDestroy() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 10;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.feedbackOpen) this.closeFeedback();
  }

  // ─────────────────────────────────────────
  // FEEDBACK MODAL
  // ─────────────────────────────────────────
  openFeedback() {
    this.feedbackOpen      = true;
    this.feedbackSubmitted = false;
    this.feedbackErrors    = {};
    this.feedback          = { name: '', email: '', rating: 0, category: '', message: '' };
    document.body.style.overflow = 'hidden';
  }

  closeFeedback() {
    this.feedbackOpen = false;
    document.body.style.overflow = '';
  }

  closeFeedbackOutside(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('oas-modal-overlay')) {
      this.closeFeedback();
    }
  }

  validateFeedback(): boolean {
    this.feedbackErrors = {};
    let valid = true;

    if (!this.feedback.name.trim()) {
      this.feedbackErrors.name = 'Full name is required';
      valid = false;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.feedback.email.trim()) {
      this.feedbackErrors.email = 'Email address is required';
      valid = false;
    } else if (!emailRe.test(this.feedback.email)) {
      this.feedbackErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!this.feedback.rating) {
      this.feedbackErrors.rating = 'Please select a rating';
      valid = false;
    }

    if (!this.feedback.message.trim()) {
      this.feedbackErrors.message = 'Message is required';
      valid = false;
    } else if (this.feedback.message.length > 500) {
      this.feedbackErrors.message = 'Message must be 500 characters or less';
      valid = false;
    }

    return valid;
  }

  submitFeedback(event: Event) {
    event.preventDefault();
    if (!this.validateFeedback()) return;

    this.feedbackLoading = true;
    setTimeout(() => {
      this.feedbackLoading   = false;
      this.feedbackSubmitted = true;
    }, 1500);
  }

  getRatingLabel(rating: number): string {
    const labels: Record<number, string> = {
      1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent',
    };
    return labels[rating] || '';
  }

  // ─────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────
  onSearch(event: Event) {
    const q = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery = q;
    this.filteredVacancies = this.allVacancies.filter(v =>
      v.post.toLowerCase().includes(q) || v.department.toLowerCase().includes(q)
    );
  }

  vacancyDetails(vacancy: Vacancy) {
    this.router.navigate(['/landing/online-application/apply', vacancy.id]);
  }

  navigateTo(path: string) {
    this.router.navigate(['/landing/online-application', path]);
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  trackById(_: number, v: Vacancy) { return v.id; }

  // ─────────────────────────────────────────
  // SCROLL REVEAL
  // ─────────────────────────────────────────
  private initScrollReveal() {
    const selectors = '.oas-reveal, .oas-reveal-left, .oas-reveal-right, .oas-reveal-scale';
    const observer  = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('oas-visible');
        } else {
          e.target.classList.remove('oas-visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    setTimeout(() => {
      document.querySelectorAll(selectors).forEach(el => observer.observe(el));
    }, 120);
  }

  // ─────────────────────────────────────────
  // ANIMATED GRID CANVAS
  // ─────────────────────────────────────────
  private initGridCanvas() {
    const canvas = document.querySelector('.oas-grid-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx          = canvas.getContext('2d')!;
    const CELL         = 48;
    const DOT_R        = 1.8;
    const N_DOTS       = 28;
    const CONNECT_DIST = 110;
    const C_PRIMARY    = '79,110,247';
    const C_SECONDARY  = '16,185,129';

    let W = 0;
    let H = 0;

    interface FDot {
      x: number; y: number; vx: number; vy: number;
      r: number; color: string; alpha: number;
      pulse: number; pulseSpeed: number;
    }

    let dots: FDot[] = [];

    const spawnDots = () => {
      dots = Array.from({ length: N_DOTS }, () => ({
        x:          Math.random() * W,
        y:          Math.random() * H,
        vx:         (Math.random() - 0.5) * 0.55,
        vy:         (Math.random() - 0.5) * 0.55,
        r:          Math.random() * 3.5 + 2,
        color:      Math.random() > 0.5 ? C_PRIMARY : C_SECONDARY,
        alpha:      Math.random() * 0.2 + 0.1,
        pulse:      Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      }));
    };

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
      spawnDots();
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(' + C_PRIMARY + ', 0.10)';
      ctx.lineWidth   = 0.7;
      for (let x = 0; x <= W; x += CELL) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y <= H; y += CELL) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.fillStyle = 'rgba(' + C_PRIMARY + ', 0.18)';
      for (let x = 0; x <= W; x += CELL) {
        for (let y = 0; y <= H; y += CELL) {
          ctx.beginPath(); ctx.arc(x, y, DOT_R, 0, Math.PI * 2); ctx.fill();
        }
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx   = dots[i].x - dots[j].x;
          const dy   = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const a = (1 - dist / CONNECT_DIST) * 0.25;
            ctx.strokeStyle = 'rgba(' + dots[i].color + ', ' + a + ')';
            ctx.lineWidth   = 0.8;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawDots = () => {
      dots.forEach(d => {
        d.pulse += d.pulseSpeed;
        const a = d.alpha + Math.sin(d.pulse) * 0.2;
        const r = d.r     + Math.sin(d.pulse) * 0.8;

        const grd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, r * 3);
        grd.addColorStop(0,   'rgba(' + d.color + ', ' + a + ')');
        grd.addColorStop(0.5, 'rgba(' + d.color + ', ' + (a * 0.2) + ')');
        grd.addColorStop(1,   'rgba(' + d.color + ', 0)');
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(d.x, d.y, r * 3, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = 'rgba(' + d.color + ', ' + Math.min(a + 0.1, 0.5) + ')';
        ctx.beginPath(); ctx.arc(d.x, d.y, r, 0, Math.PI * 2); ctx.fill();

        d.x += d.vx; d.y += d.vy;
        if (d.x < -20)    d.x = W + 20;
        if (d.x > W + 20) d.x = -20;
        if (d.y < -20)    d.y = H + 20;
        if (d.y > H + 20) d.y = -20;
      });
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      drawGrid();
      drawConnections();
      drawDots();
      this.animFrameId = requestAnimationFrame(tick);
    };

    this.resizeHandler = resize;
    window.addEventListener('resize', resize);
    resize();
    tick();
  }
}