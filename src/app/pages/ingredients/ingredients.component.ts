import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SavonApiService } from '../../services/savon-api.service';
import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'app-ingredients',
  imports: [DecimalPipe],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css'
})
export class IngredientsComponent {
  private readonly api = inject(SavonApiService);

  ingredients: Ingredient[] = [];

  constructor() {
    this.api.getIngredients().subscribe((data) => {
      this.ingredients = data;
    });
  }
}
