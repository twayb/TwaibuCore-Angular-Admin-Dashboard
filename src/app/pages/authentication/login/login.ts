import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  errorMessage = '';

  constructor(private router: Router) { }
  onLogin() {
    if (this.email === 'admin@mail.com' && this.password === 'admin') {
      this.router.navigate(['/dashboard/admin']);
    } else {
      this.errorMessage = 'Invalid email or password. Please try again.';
    }
  }
}


