import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [],
  templateUrl: './forbidden.html',
  styleUrl: './forbidden.css',
})
export class ForbiddenComponent{
   constructor(private router: Router) {}
goHome() { this.router.navigate(['/dashboard/admin']); }
goBack() { window.history.back(); }

}
