import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
})
export class ServerErrorComponent {

    constructor(private router: Router) {}
goHome() { this.router.navigate(['/dashboard/admin']); }
retry()  { window.location.reload(); }

}
