import { Component, inject } from '@angular/core';
import { LockscreenService } from '../../../core/services/lockscreen.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lockscreen',
  imports: [FormsModule],
  templateUrl: './lockscreen.html',
  styleUrl: './lockscreen.css',
})
export class LockscreenComponent {

  lockscreen = inject(LockscreenService);
  password = '';
  showPassword = false;
  errorMessage = '';

  onUnlock() {
    const success = this.lockscreen.unlock(this.password);
    if (!success) {
      this.errorMessage = 'Incorrect password. Please try again.';
      this.password = '';
    } else {
      this.errorMessage = '';
    }
  }

  onLogout() {
    this.lockscreen.logout();
  }

}
