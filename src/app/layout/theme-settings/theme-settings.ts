import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-theme-settings',
  imports: [FormsModule],
  templateUrl: './theme-settings.html',
  styleUrl: './theme-settings.css',
})
export class ThemeSettingsComponent {

    theme = inject(ThemeService);
  customColor = '#4F6EF7';

  onCustomColorChange(color: string) {
    this.theme.setPrimaryColor(color);
  }

}
