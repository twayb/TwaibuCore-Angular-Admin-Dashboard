import { Component } from '@angular/core';
import { AccordionComponent, AccordionItem } from '../../../shared/components/accordion/accordion';
import { AlertsComponent } from '../../../shared/components/alerts/alerts';
import { BadgesComponent } from '../../../shared/components/badges/badges';
import { ButtonsComponent } from '../../../shared/components/buttons/buttons';
import { CardsComponent } from '../../../shared/components/cards/cards';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox';
import { DropdownItem, DropdownsComponent } from '../../../shared/components/dropdowns/dropdowns';
import { InputsComponent } from '../../../shared/components/inputs/inputs';
import { ListgroupComponent, ListGroupItem } from '../../../shared/components/listgroup/listgroup';
import { ModalComponent } from '../../../shared/components/modal/modal';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

interface ComponentNav {
  label: string;
  icon: string;
  key: string;
}

@Component({
  selector: 'app-components-page',
  standalone: true,
  imports: [AccordionComponent, AlertsComponent, BadgesComponent, ButtonsComponent, 
    CardsComponent, BreadcrumbComponent, CheckboxComponent, 
    FormsModule, DropdownsComponent,InputsComponent, ListgroupComponent, ModalComponent,PaginationComponent ],
  templateUrl: './components-page.html',
  styleUrl: './components-page.css'
})
export class ComponentsPageComponent {
  activeComponent = 'accordion';
  loadingBtn = false;

  navItems: ComponentNav[] = [
    { label: 'Accordion',    icon: 'bi bi-chevron-down',         key: 'accordion' },
    { label: 'Alerts',       icon: 'bi bi-exclamation-triangle', key: 'alerts' },
    // { label: 'Badges',       icon: 'bi bi-patch-check',          key: 'badges' },
    { label: 'Buttons',      icon: 'bi bi-hand-index',           key: 'buttons' },
    { label: 'Cards',        icon: 'bi bi-card-text',            key: 'cards' },
    { label: 'Breadcrumb',   icon: 'bi bi-signpost-split',       key: 'breadcrumb' },
    { label: 'Checkbox',     icon: 'bi bi-check-square',         key: 'checkbox' },
    { label: 'Dropdowns',    icon: 'bi bi-chevron-down',         key: 'dropdowns' },
    { label: 'Inputs',       icon: 'bi bi-input-cursor-text',    key: 'inputs' },
    { label: 'List Group',   icon: 'bi bi-list-ul',              key: 'listgroup' },
    { label: 'Modal',        icon: 'bi bi-window',               key: 'modal' },
    { label: 'Pagination',   icon: 'bi bi-123',                  key: 'pagination' },
    { label: 'Popover',      icon: 'bi bi-chat-square-text',     key: 'popover' },
    { label: 'Progress Bar', icon: 'bi bi-bar-chart-steps',      key: 'progressbar' },
    { label: 'Select',       icon: 'bi bi-caret-down-square',     key: 'select' },
    { label: 'Stepper',      icon: 'bi bi-diagram-3',            key: 'stepper' },
    { label: 'Tabs',         icon: 'bi bi-folder-symlink',       key: 'tabs' },
  ];

  get activeLabel(): string {
    return this.navItems.find(i => i.key === this.activeComponent)?.label ?? '';
  }

  get activeIcon(): string {
    return this.navItems.find(i => i.key === this.activeComponent)?.icon ?? '';
  }

  setActive(key: string) {
    this.activeComponent = key;
  }

  ngOnInit() {
  console.log('badges test:', new BadgesComponent().getClasses());
}

  // Accordion data
  defaultItems: AccordionItem[] = [
    { title: 'What is TwaibuCore?',           icon: 'bi bi-info-circle', content: 'TwaibuCore is a powerful Angular 20 admin dashboard built with Tailwind CSS and Bootstrap Icons. It provides a clean, modern interface for managing your application data.' },
    { title: 'How do I change the theme?',    icon: 'bi bi-palette',     content: 'Click the floating palette button on the right side of the screen to open the theme settings panel. You can change primary color, sidebar color, topbar color and font size.' },
    { title: 'Is dark mode supported?',       icon: 'bi bi-moon',        content: 'Yes! TwaibuCore fully supports dark mode. Click the moon icon in the header to toggle between light and dark mode. All components are fully styled for both modes.' },
    { title: 'How does the lockscreen work?', icon: 'bi bi-lock',        content: 'The lockscreen triggers automatically after 2 minutes of inactivity. A warning banner appears 15 seconds before locking.' },
  ];

  borderedItems: AccordionItem[] = [
    { title: 'Bordered accordion variant',  content: 'The active item gets a primary color background highlight making it easy to identify the expanded section.' },
    { title: 'Multiple items supported',    content: 'You can configure the accordion to allow multiple items to be open at the same time using the allowMultiple input property.' },
    { title: 'Icons are optional',          content: 'Icons on accordion items are completely optional. Simply omit the icon property from the AccordionItem to show just the title text.' },
  ];

  separatedItems: AccordionItem[] = [
    { title: 'Separated card style',  content: 'Each accordion item is a separate card with rounded corners. The active item gets a primary border and subtle shadow.' },
    { title: 'Smooth animations',     content: 'All accordion variants have smooth open/close animations with opacity and max-height transitions.' },
    { title: 'Fully responsive',      content: 'The accordion component is fully responsive and works perfectly on mobile, tablet and desktop screen sizes.' },
  ];

  flushItems: AccordionItem[] = [
    { title: 'Flush borderless style', content: 'The flush variant has no outer border or background, just simple dividers between items. Great for embedding inside other cards.' },
    { title: 'Clean minimal look',     content: 'Perfect for FAQ sections or inside settings panels where you want a clean minimal appearance without card borders.' },
  ];

  toggleLoading() {
  this.loadingBtn = true;
  setTimeout(() => this.loadingBtn = false, 2000);
}

// Add breadcrumb data
basicItems: BreadcrumbItem[] = [
  { label: 'Home',       icon: 'bi bi-house-fill' },
  { label: 'Dashboard' },
  { label: 'Analytics' },
];

iconItems: BreadcrumbItem[] = [
  { label: 'Home',       icon: 'bi bi-house-fill' },
  { label: 'Settings',   icon: 'bi bi-gear-fill' },
  { label: 'Profile',    icon: 'bi bi-person-fill' },
];

deepItems: BreadcrumbItem[] = [
  { label: 'Home',       icon: 'bi bi-house-fill' },
  { label: 'Admin' },
  { label: 'Users' },
  { label: 'John Doe' },
  { label: 'Edit Profile' },
];

// Checkbox state
cb1 = true;
cb2 = false;
cb3 = true;
cb4 = false;
cb5 = true;


// Dropdown data
basicDropdownItems: DropdownItem[] = [
  { label: 'View Profile',  icon: 'bi bi-person' },
  { label: 'Edit Profile',  icon: 'bi bi-pencil' },
  { label: 'Settings',      icon: 'bi bi-gear' },
  { divider: true, label: '' },
  { label: 'Logout',        icon: 'bi bi-box-arrow-right', color: 'danger' },
];

actionDropdownItems: DropdownItem[] = [
  { label: 'Download',  icon: 'bi bi-download' },
  { label: 'Share',     icon: 'bi bi-share' },
  { label: 'Duplicate', icon: 'bi bi-copy' },
  { divider: true, label: '' },
  { label: 'Archive',   icon: 'bi bi-archive',    color: 'warning' },
  { label: 'Delete',    icon: 'bi bi-trash',       color: 'danger' },
];

statusDropdownItems: DropdownItem[] = [
  { label: 'Mark Active',   icon: 'bi bi-check-circle',  color: 'success' },
  { label: 'Mark Pending',  icon: 'bi bi-clock',         color: 'warning' },
  { label: 'Mark Inactive', icon: 'bi bi-x-circle',      color: 'danger' },
];

disabledDropdownItems: DropdownItem[] = [
  { label: 'Edit',     icon: 'bi bi-pencil' },
  { label: 'Export',   icon: 'bi bi-download', disabled: true },
  { label: 'Share',    icon: 'bi bi-share',    disabled: true },
  { divider: true, label: '' },
  { label: 'Delete',   icon: 'bi bi-trash', color: 'danger' },
];

// Input state
inputValue = '';
phoneValue = '';
searchValue = '';
textareaValue = '';
rangeValue = '50';



// List Group data
basicListItems: ListGroupItem[] = [
  { label: 'Dashboard',   icon: 'bi bi-speedometer2' },
  { label: 'Users',       icon: 'bi bi-people' },
  { label: 'Settings',    icon: 'bi bi-gear' },
  { label: 'Reports',     icon: 'bi bi-bar-chart' },
  { label: 'Help',        icon: 'bi bi-question-circle' },
];

activeListItems: ListGroupItem[] = [
  { label: 'Dashboard',   icon: 'bi bi-speedometer2', active: true },
  { label: 'Users',       icon: 'bi bi-people' },
  { label: 'Settings',    icon: 'bi bi-gear', disabled: true },
  { label: 'Reports',     icon: 'bi bi-bar-chart' },
  { label: 'Help',        icon: 'bi bi-question-circle' },
];

badgeListItems: ListGroupItem[] = [
  { label: 'Inbox',        icon: 'bi bi-inbox',         badge: '12',  badgeType: 'primary' },
  { label: 'Sent',         icon: 'bi bi-send',          badge: '3',   badgeType: 'success' },
  { label: 'Spam',         icon: 'bi bi-exclamation-triangle', badge: '5', badgeType: 'danger' },
  { label: 'Drafts',       icon: 'bi bi-file-earmark',  badge: '2',   badgeType: 'warning' },
  { label: 'Archived',     icon: 'bi bi-archive' },
];

avatarListItems: ListGroupItem[] = [
  { label: 'James Okafor',  description: 'Senior Developer',     avatarText: 'JO', meta: '2 min ago',   badge: 'Active',  badgeType: 'success' },
  { label: 'Amina Hassan',  description: 'UI/UX Designer',       avatarText: 'AH', meta: '15 min ago',  badge: 'Away',    badgeType: 'warning' },
  { label: 'Peter Njoroge', description: 'Project Manager',      avatarText: 'PN', meta: '1 hr ago',    badge: 'Offline', badgeType: 'danger' },
  { label: 'Grace Mwamba',  description: 'Data Analyst',         avatarText: 'GM', meta: '3 hr ago',    badge: 'Active',  badgeType: 'success' },
  { label: 'Hassan Omar',   description: 'Backend Developer',    avatarText: 'HO', meta: 'Yesterday' },
];

metaListItems: ListGroupItem[] = [
  { label: 'Project Alpha',   description: 'Angular dashboard project',  icon: 'bi bi-kanban',      meta: 'Feb 23',  badge: 'Active',     badgeType: 'success' },
  { label: 'Design System',   description: 'Component library',          icon: 'bi bi-palette',     meta: 'Feb 20',  badge: 'In Review',  badgeType: 'warning' },
  { label: 'API Integration', description: 'REST API setup',             icon: 'bi bi-plug',        meta: 'Feb 18',  badge: 'Pending',    badgeType: 'primary' },
  { label: 'Database Setup',  description: 'PostgreSQL configuration',   icon: 'bi bi-database',    meta: 'Feb 15',  badge: 'Done',       badgeType: 'success' },
];

// Modal states
modal1Open = false;
modal2Open = false;
modal3Open = false;
modal4Open = false;
modal5Open = false;
modal6Open = false;

// Pagination state
page1 = 1;
page2 = 3;
page3 = 5;
page4 = 1;
page5 = 1;
}