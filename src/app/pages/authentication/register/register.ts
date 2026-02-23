import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {

  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;

  onRegister() {
    console.log('Register:', this.fullName, this.email);
  }

}
