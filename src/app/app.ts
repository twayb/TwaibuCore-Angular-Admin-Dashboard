import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer';
import { HeaderComponent } from './layout/header/header';
import { SidebarComponent } from './layout/sidebar/sidebar';
import { LayoutService } from './core/services/layout-service';
import { LockscreenComponent } from './pages/authentication/lockscreen/lockscreen';
import { LockscreenService } from './core/services/lockscreen.service';
import { ThemeService } from './core/services/theme.service';
import { ThemeSettingsComponent } from './layout/theme-settings/theme-settings';


@Component({
  selector: 'app-root',
    standalone: true, // ✅ REQUIRED
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent, LockscreenComponent, ThemeSettingsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
 constructor(
    private router: Router,
    public layout: LayoutService,
    public lockscreen: LockscreenService,
    public themeService: ThemeService
  ) {}

  isAuthPage(): boolean {
    return this.router.url.startsWith('/pages/auth');
  }
}
