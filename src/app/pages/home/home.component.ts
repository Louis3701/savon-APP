import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly metrics = [
    { label: 'Recettes disponibles', value: 28 },
    { label: 'Ingredients references', value: 64 },
    { label: 'Ateliers actifs', value: 4 }
  ];
}
