import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SavonApiService } from '../../services/savon-api.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipes',
  imports: [DecimalPipe],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  private readonly api = inject(SavonApiService);

  recettes: Recipe[] = [];

  constructor() {
    this.api.getRecettes().subscribe((data) => {
      this.recettes = data;
    });
  }
}
