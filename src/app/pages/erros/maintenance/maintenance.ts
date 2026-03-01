import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css',
})
export class MaintenanceComponent  implements OnInit, OnDestroy {

    hours   = '02';
  minutes = '45';
  seconds = '30';

  private timer: any;
  private totalSeconds = 2 * 3600 + 45 * 60 + 30;

  constructor(private router: Router) {}

  ngOnInit() {
    this.timer = setInterval(() => {
      if (this.totalSeconds > 0) {
        this.totalSeconds--;
        const h = Math.floor(this.totalSeconds / 3600);
        const m = Math.floor((this.totalSeconds % 3600) / 60);
        const s = this.totalSeconds % 60;
        this.hours   = String(h).padStart(2, '0');
        this.minutes = String(m).padStart(2, '0');
        this.seconds = String(s).padStart(2, '0');
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  goHome() { this.router.navigate(['/dashboard/admin']); }

}
