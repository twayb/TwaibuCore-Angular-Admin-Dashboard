import { Component, inject, signal, computed } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { FooterComponent } from './layout/footer/footer';
import { HeaderComponent } from './layout/header/header';
import { SidebarComponent } from './layout/sidebar/sidebar';
import { LayoutService } from './core/services/layout-service';
import { LockscreenComponent } from './pages/authentication/lockscreen/lockscreen';
import { LockscreenService } from './core/services/lockscreen.service';
import { ThemeService } from './core/services/theme.service';
import { ThemeSettingsComponent } from './layout/theme-settings/theme-settings';
import { ToastComponent } from './shared/components/toast/toast';
import { filter } from 'rxjs/operators';
import { AppLoaderComponent } from './shared/components/app-loader/app-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent, LockscreenComponent, ThemeSettingsComponent, ToastComponent, AppLoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

private noLayoutRoutes = ['/pages/auth', '/errors/', '/landing/'];
  private currentUrl = signal('');
   isLoading              = signal(true);

  // Computed signal — template reacts automatically
  isAuthPage = computed(() => {
    const url = this.currentUrl();
    return this.noLayoutRoutes.some(route => url.startsWith(route));
  });

  constructor(
    private router: Router,
    public layout: LayoutService,
    public lockscreen: LockscreenService,
    public themeService: ThemeService
  ) {
    // Set initial URL immediately
    this.currentUrl.set(this.router.url);

    // Update on every navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl.set(event.urlAfterRedirects);
    });

     // Hide loader after theme + app initialized
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1800);
  }
  }
