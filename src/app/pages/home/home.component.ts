import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SavonApiService } from '../../services/savon-api.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly api = inject(SavonApiService);

  readonly metrics = [
    { label: 'Recettes en stock', value: 0 },
    { label: 'Ingredients listes', value: 0 },
    { label: 'Niveau du projet', value: 'Simple' }
  ];

  readonly points = [
    'Consulter une liste de recettes enregistrees localement.',
    'Afficher les ingredients utilises pour la saponification.',
    'Simuler une recette simple avec un petit calculateur Angular.'
  ];

  constructor() {
    this.api.getRecettes().subscribe((recettes) => {
      this.metrics[0].value = recettes.length;
    });

    this.api.getIngredients().subscribe((ingredients) => {
      this.metrics[1].value = ingredients.length;
    });
  }
}
