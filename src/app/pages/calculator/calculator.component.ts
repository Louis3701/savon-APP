import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Ingredient } from '../../models/ingredient.model';
import { Recipe } from '../../models/recipe.model';
import { SavonApiService } from '../../services/savon-api.service';

type RecipeLineForm = {
  ingredientId: number;
  pourcentage: number;
};

type SimulationResult = {
  insMoyen: number;
  quantiteSoude: number;
  quantiteEau: number;
  recette: Omit<Recipe, 'id'>;
};

@Component({
  selector: 'app-calculator',
  imports: [FormsModule, DecimalPipe, RouterLink],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  private readonly savonService = inject(SavonApiService);

  ingredients: Ingredient[] = [];
  simulation: SimulationResult | null = null;
  savedMessage = '';

  form = {
    titre: 'Ma recette simple',
    categorie: 'Solide' as Recipe['categorie'],
    auteur: 'Projet perso',
    totalHuiles: 1000,
    surgras: 6,
    concentration: 30,
    lignes: [
      { ingredientId: 1, pourcentage: 50 },
      { ingredientId: 2, pourcentage: 30 },
      { ingredientId: 3, pourcentage: 20 }
    ] as RecipeLineForm[]
  };

  constructor() {
    this.savonService.getIngredients().subscribe((ingredients) => {
      this.ingredients = ingredients;
    });
  }

  get totalPourcentage(): number {
    return this.form.lignes.reduce((sum, line) => sum + Number(line.pourcentage || 0), 0);
  }

  simuler(): void {
    if (!this.ingredients.length || this.totalPourcentage !== 100) {
      this.savedMessage = '';
      this.simulation = null;
      return;
    }

    const recipeIngredients = this.form.lignes.map((line) => {
      const ingredient = this.ingredients.find((item) => item.id === Number(line.ingredientId));
      return {
        ingredient: ingredient!,
        pourcentage: Number(line.pourcentage)
      };
    });

    const insMoyen = recipeIngredients.reduce(
      (sum, line) => sum + line.ingredient.ins * (line.pourcentage / 100),
      0
    );
    const quantiteSoude = this.form.totalHuiles * 0.135 * (1 - this.form.surgras / 100);
    const quantiteEau = quantiteSoude * ((100 - this.form.concentration) / this.form.concentration);

    this.simulation = {
      insMoyen,
      quantiteSoude,
      quantiteEau,
      recette: {
        titre: this.form.titre,
        categorie: this.form.categorie,
        auteur: this.form.auteur,
        surgras: this.form.surgras,
        concentration: this.form.concentration,
        ingredients: recipeIngredients
      }
    };
    this.savedMessage = '';
  }

  enregistrer(): void {
    if (!this.simulation) {
      return;
    }

    this.savonService.createRecette(this.simulation.recette).subscribe(() => {
      this.savedMessage = 'Recette enregistree dans le navigateur.';
    });
  }
}
