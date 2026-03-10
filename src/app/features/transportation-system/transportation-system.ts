import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-transportation-system',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './transportation-system.html',
  styleUrl: './transportation-system.css',
})
export class TransportationSystemComponent  implements OnInit {

  menuOpen = false;
  scrolled  = false;

  metrics = [
    { value: '240+',  label: 'Active Routes'  },
    { value: '1,840', label: 'Daily Trips'    },
    { value: '98.2%', label: 'On-Time Rate'   },
  ];

  features = [
    { icon: 'bi bi-geo-alt-fill',       color: 'green',  title: 'Real-Time GPS Tracking', desc: 'See exactly where your bus is on the map with precise arrival time estimates updated every 30 seconds.' },
    { icon: 'bi bi-ticket-perforated',  color: 'blue',   title: 'Digital Ticketing',      desc: 'Book your seat online and receive a QR code ticket instantly. No queues, no paper, seamless boarding.' },
    { icon: 'bi bi-bell-fill',          color: 'amber',  title: 'Smart Alerts',           desc: 'Get notified when your bus is approaching, delayed, or if there are changes to your route.' },
    { icon: 'bi bi-calendar-check',     color: 'violet', title: 'Advance Booking',        desc: 'Book seats up to 30 days in advance. Choose your preferred seat and travel date with full flexibility.' },
    { icon: 'bi bi-wallet2',            color: 'red',    title: 'Mobile Payments',        desc: 'Pay via M-Pesa, Airtel Money, card, or cash. All transactions are secure with instant receipts.' },
    { icon: 'bi bi-graph-up',           color: 'cyan',   title: 'Travel Analytics',       desc: 'Track your travel history, spending patterns, and frequent routes with detailed monthly reports.' },
  ];

  steps = [
    { num: '1', title: 'Search Your Route',     desc: 'Enter your origin, destination, and travel date to see all available services and schedules.' },
    { num: '2', title: 'Choose Your Seat',       desc: 'View the seat map and pick your preferred seat from available options on your chosen bus.' },
    { num: '3', title: 'Pay Securely',           desc: 'Complete payment using your preferred method. All payments are encrypted and fully secure.' },
    { num: '4', title: 'Board with QR Code',    desc: 'Receive your digital ticket instantly. Show the QR code at boarding — no printing needed.' },
  ];

  routes = [
    { from: 'DSM', to: 'MBY', fromFull: 'Dar es Salaam', toFull: 'Mbeya',  duration: '8h 30m', departs: '06:00 AM', price: 'TZS 25,000', badge: 'Daily',   badgeColor: 'green'  },
    { from: 'DSM', to: 'ARU', fromFull: 'Dar es Salaam', toFull: 'Arusha', duration: '7h 00m', departs: '07:00 AM', price: 'TZS 30,000', badge: 'Express', badgeColor: 'amber'  },
    { from: 'DSM', to: 'DOD', fromFull: 'Dar es Salaam', toFull: 'Dodoma', duration: '5h 30m', departs: '08:00 AM', price: 'TZS 18,000', badge: 'Popular', badgeColor: 'blue'   },
  ];

  liveRoutes = [
    { icon: 'bi bi-bus-front',   color: 'green', name: 'Route 42 · Dar–Ubungo Express', stops: '12 stops · 34 km',  eta: '3 min',   etaLabel: 'arriving' },
    { icon: 'bi bi-train-front', color: 'blue',  name: 'TAZARA · Dar–Mbeya',            stops: '8 stops · 840 km', eta: '08:30',   etaLabel: 'departs'  },
    { icon: 'bi bi-minibus',     color: 'amber', name: 'Daladala · Kariakoo–Posta',     stops: '6 stops · 8 km',   eta: '7 min',   etaLabel: 'arriving' },
  ];

  seats = [
    { num: '1',  state: 'taken'     },
    { num: '2',  state: 'taken'     },
    { num: '3',  state: 'available' },
    { num: '4',  state: 'available' },
    { num: '5',  state: 'taken'     },
    { num: '6',  state: 'selected'  },
    { num: '7',  state: 'available' },
    { num: '8',  state: 'available' },
    { num: '9',  state: 'taken'     },
    { num: '10', state: 'available' },
    { num: '11', state: 'available' },
    { num: '12', state: 'taken'     },
  ];

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 30; }

  // transportation.ts
ngOnInit() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('ts-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  setTimeout(() => {
    document.querySelectorAll('.ts-reveal').forEach(el => observer.observe(el));
  }, 100);
}

scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
}
