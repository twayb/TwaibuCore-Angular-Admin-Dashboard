
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

export interface Vacancy {
  id: number;
  post: string;
  numberOfPosts: number;
  deadline: string;
  department: string;
}

@Component({
  selector: 'app-online-application',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './online-application.html',
  styleUrl: './online-application.css'
})
export class OnlineApplicationComponent implements OnInit {

  scrolled    = false;
  searchQuery = '';

  allVacancies: Vacancy[] = [
    { id: 1,  post: 'Judge of the High Court',            numberOfPosts: 5,  deadline: 'Feb 28, 2026', department: 'High Court'          },
    { id: 2,  post: 'Resident Magistrate',                numberOfPosts: 12, deadline: 'Feb 28, 2026', department: 'Magistrate Court'     },
    { id: 3,  post: 'District Magistrate',                numberOfPosts: 8,  deadline: 'Mar 15, 2026', department: 'District Court'       },
    { id: 4,  post: 'Senior State Attorney',              numberOfPosts: 3,  deadline: 'Mar 15, 2026', department: 'Attorney General'     },
    { id: 5,  post: 'State Attorney',                     numberOfPosts: 10, deadline: 'Mar 20, 2026', department: 'Attorney General'     },
    { id: 6,  post: 'Court Registrar',                    numberOfPosts: 4,  deadline: 'Mar 20, 2026', department: 'Registry'             },
    { id: 7,  post: 'Legal Officer',                      numberOfPosts: 6,  deadline: 'Apr 01, 2026', department: 'JSC Secretariat'      },
    { id: 8,  post: 'Administrative Officer',             numberOfPosts: 7,  deadline: 'Apr 01, 2026', department: 'Administration'       },
  ];

  filteredVacancies: Vacancy[] = [];

  steps = [
    { icon: 'bi bi-person-plus',    title: 'Create Account',    desc: 'Register with your accurate personal information to access the portal'                          },
    { icon: 'bi bi-person-lines-fill', title: 'Complete Profile', desc: 'Fill in your educational background, work experience, and upload required documents'           },
    { icon: 'bi bi-search',         title: 'Browse Vacancies',  desc: 'Review available positions and ensure you meet all qualifications before applying'              },
    { icon: 'bi bi-send',           title: 'Submit Application',desc: 'Fill all sections accurately and submit your application before the closing deadline'            },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.filteredVacancies = [...this.allVacancies];
    this.initScrollReveal();
  }

  private initScrollReveal() {
    const revealClasses = [
      '.oas-reveal',
      '.oas-reveal-left',
      '.oas-reveal-right',
      '.oas-reveal-scale',
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('oas-visible');
        } else {
          // Remove when out of view so it re-animates on scroll back down
          e.target.classList.remove('oas-visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    setTimeout(() => {
      document.querySelectorAll(revealClasses.join(','))
        .forEach(el => observer.observe(el));
    }, 120);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 10;
  }

  onSearch(event: Event) {
    const q = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery = q;
    this.filteredVacancies = this.allVacancies.filter(v =>
      v.post.toLowerCase().includes(q) || v.department.toLowerCase().includes(q)
    );
  }

  vacancyDetails(vacancy: Vacancy) {
    // Navigate to vacancy detail / application page
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
}