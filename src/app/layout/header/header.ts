import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { LayoutService } from '../../core/services/layout-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true, // ✅ REQUIRED
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {

  private router = inject(Router);
  layout = inject(LayoutService);
  avatarUrl = 'assets/avatar/avatar_profile.jpg';
  isDropdownOpen = false;

  @ViewChild('darkToggle') darkToggleRef!: ElementRef;

  onToggleDarkMode() {
    const btn = document.querySelector('.dark-toggle');
    btn?.classList.add('animating');
    setTimeout(() => btn?.classList.remove('animating'), 500);
    this.layout.toggleDarkMode();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.avatar-wrapper')) {
      this.isDropdownOpen = false;
    }
  }

  logout() {
    // Clear any authentication tokens or user data here
    // For example, if you are using localStorage:
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to the login page
    this.router.navigate(['/pages/auth/login']);
   
  }

  profile() {
    this.router.navigate(['/profile']);
  }

}
