import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-app-loader',
  imports: [CommonModule],
  templateUrl: './app-loader.html',
  styleUrl: './app-loader.css',
})
export class AppLoaderComponent {

   @Input() visible = true;

}
