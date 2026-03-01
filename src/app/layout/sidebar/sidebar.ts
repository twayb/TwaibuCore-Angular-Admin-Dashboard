import { Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutService } from '../../core/services/layout-service';
import { LockscreenService } from '../../core/services/lockscreen.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

interface NavGroup {
  label: string;
  icon: string;
  isOpen: boolean;
  items: NavItem[];
}

interface NavSection {
  section: string;
  groups: NavGroup[];
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  layout = inject(LayoutService);
    lockscreen = inject(LockscreenService);
  openGroupLabel: string | null = null;
  floatingDropdownTop: number = 0;

  get isDark() {
    return this.layout.isDarkMode();
  }

  get isCollapsed() {
    if (this.layout.isMobile()) {
      return false; // never collapsed on mobile, just hidden/shown
    }
    return this.layout.isCollapsed();
  }

  get isMobile() {
    return this.layout.isMobile();
  }

  toggleGroup(group: NavGroup, event: MouseEvent) {
    const btn = event.currentTarget as HTMLElement;
    const rect = btn.getBoundingClientRect();
    this.floatingDropdownTop = rect.top;

    if (this.openGroupLabel === group.label) {
      this.openGroupLabel = null;
    } else {
      this.openGroupLabel = group.label;
    }
  }
  isGroupOpen(group: NavGroup): boolean {
    return this.openGroupLabel === group.label;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.nav-group-wrapper') &&
      !target.closest('.nav-sub')
    ) {
      this.openGroupLabel = null;
    }
  }

  navSections: NavSection[] = [
    {
      section: 'Main Menu',
      groups: [
        {
          label: 'Dashboard',
          icon: 'bi bi-speedometer2',
          isOpen: false,
          items: [
            { label: 'Admin Dashboard', icon: 'bi bi-speedometer2', route: '/dashboard/admin' },
            // { label: 'HR Dashboard', icon: 'bi bi-people', route: '/dashboard/hr' },
            { label: 'Recruitment Dashboard', icon: 'bi bi-person-plus', route: '/dashboard/recruitment' },
            { label: 'Complaints Dashboard', icon: 'bi bi-chat-left-text', route: '/dashboard/complaints' },
            { label: 'Transportation Dashboard', icon: 'bi bi-truck', route: '/dashboard/transportation' },
            // { label: 'Asset Dashboard', icon: 'bi bi-box-seam', route: '/dashboard/assets' },
            // { label: 'HelpDesk Dashboard', icon: 'bi bi-headset', route: '/dashboard/helpdesk' },
          ]
        }
      ],
      items: []
    },
    {
      section: 'Applications',
      groups: [],
      items: [
        { label: 'Chat', icon: 'bi bi-chat-dots', route: '/apps/chat' },
        { label: 'Email', icon: 'bi bi-envelope', route: '/apps/email' },
        { label: 'Calendar', icon: 'bi bi-calendar3', route: '/apps/calendar' },
      ]
    },
    {
      section: 'Pages',
      groups: [
        {
          label: 'Authentication',
          icon: 'bi bi-shield-lock',
          isOpen: false,
          items: [
            { label: 'Login', icon: '', route: '/pages/auth/login' },
            { label: 'Register', icon: '', route: '/pages/auth/register' },
            { label: 'Forgot Password', icon: '', route: '/pages/auth/forgot-password' },
            { label: 'LockScreen', icon: '', route: '/pages/auth/lockscreen' },
          ]
        },
        {
          label: 'Error Pages',
          icon: 'bi bi-exclamation-triangle',
          isOpen: false,
          items: [
            { label: '404 Not Found', icon: '', route: '/errors/404' },
            { label: '500 Server Error', icon: '', route: '/errors/500' },
            { label: '403 Forbidden', icon: '', route: '/errors/403' },
            { label: 'Maintenance', icon: '', route: '/errors/maintenance' }
          ]
        },
        // {
        //   label: 'Utility',
        //   icon: 'bi bi-tools',
        //   isOpen: false,
        //   items: [
        //     { label: 'Blank Page', icon: '', route: '/pages/utility/blank' },
        //     { label: 'Starter Page', icon: '', route: '/pages/utility/starter' },
        //     { label: 'Maintenance', icon: '', route: '/pages/utility/maintenance' },
        //   ]
        // }
      ],
      items: []
    },
    {
      section: 'General',
      groups: [],
      items: [
        { label: 'Components', icon: 'bi bi-grid', route: '/general/components' },
        { label: 'Widgets', icon: 'bi bi-layout-wtf', route: '/general/widgets' },
        // { label: 'Extended UI', icon: 'bi bi-stars', route: '/general/extended-ui' },
        { label: 'Icons', icon: 'bi bi-emoji-smile', route: '/general/icons' },
        { label: 'Forms', icon: 'bi bi-ui-checks', route: '/general/forms' },
        { label: 'Tables', icon: 'bi bi-table', route: '/general/tables' },
        // { label: 'Charts', icon: 'bi bi-bar-chart-line', route: '/general/charts' },
        { label: 'Map', icon: 'bi bi-map', route: '/general/map' },
      ]
    }

    
  ];
}