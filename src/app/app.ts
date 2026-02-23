import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer';
import { HeaderComponent } from './layout/header/header';
import { SidebarComponent } from './layout/sidebar/sidebar';
import { LayoutService } from './core/services/layout-service';
import { LockscreenComponent } from './pages/authentication/lockscreen/lockscreen';
import { LockscreenService } from './core/services/lockscreen.service';


@Component({
  selector: 'app-root',
    standalone: true, // ✅ REQUIRED
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent, LockscreenComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
 constructor(
    private router: Router,
    public layout: LayoutService,
    public lockscreen: LockscreenService
  ) {}

  isAuthPage(): boolean {
    return this.router.url.startsWith('/pages/auth');
  }
}
