import { Component } from '@angular/core';
import { AccordionComponent, AccordionItem } from '../../../shared/components/accordion/accordion';
import { AlertsComponent } from '../../../shared/components/alerts/alerts';

interface ComponentNav {
  label: string;
  icon: string;
  key: string;
}

@Component({
  selector: 'app-components-page',
  standalone: true,
  imports: [AccordionComponent, AlertsComponent],
  templateUrl: './components-page.html',
  styleUrl: './components-page.css'
})
export class ComponentsPageComponent {
  activeComponent = 'accordion';

  navItems: ComponentNav[] = [
    { label: 'Accordion',    icon: 'bi bi-chevron-down',         key: 'accordion' },
    { label: 'Alerts',       icon: 'bi bi-exclamation-triangle', key: 'alerts' },
    { label: 'Badges',       icon: 'bi bi-patch-check',          key: 'badges' },
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
}