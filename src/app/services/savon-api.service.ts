import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class SavonApiService {
  private readonly storageKey = 'sav-app-recettes';
  private readonly recettes: Recipe[];

  constructor() {
    this.recettes = this.loadRecettes();
  }

  getIngredients(): Observable<Ingredient[]> {
    return of(this.mockIngredients);
  }

  getRecettes(): Observable<Recipe[]> {
    return of(this.recettes.map((recipe) => ({ ...recipe, ingredients: [...recipe.ingredients] })));
  }

  createRecette(recipe: Omit<Recipe, 'id'>): Observable<Recipe> {
    const createdRecipe: Recipe = {
      ...recipe,
      id: this.getNextRecipeId()
    };

    this.recettes.unshift(createdRecipe);
    this.saveRecettes();

    return of(createdRecipe);
  }

  private loadRecettes(): Recipe[] {
    const storedValue = globalThis.localStorage?.getItem(this.storageKey);

    if (!storedValue) {
      return [...this.mockRecettes];
    }

    try {
      return JSON.parse(storedValue) as Recipe[];
    } catch {
      return [...this.mockRecettes];
    }
  }

  private saveRecettes(): void {
    globalThis.localStorage?.setItem(this.storageKey, JSON.stringify(this.recettes));
  }

  private getNextRecipeId(): number {
    const maxId = this.recettes.reduce((highest, recipe) => Math.max(highest, recipe.id), 0);
    return maxId + 1;
  }

  private readonly mockIngredients: Ingredient[] = [
    { id: 1, nom: 'Huile d\'olive', description: 'Nourrissante et douce', douceur: 8.8, iode: 7.5, ins: 111 },
    { id: 2, nom: 'Huile de coco', description: 'Mousse abondante', douceur: 4.2, iode: 11.2, ins: 258 },
    { id: 3, nom: 'Beurre de karite', description: 'Cremosite et protection', douceur: 7.6, iode: 4.8, ins: 118 }
  ];

  private readonly mockRecettes: Recipe[] = [
    {
      id: 1,
      titre: 'Brise Marine',
      categorie: 'Solide',
      surgras: 7,
      concentration: 33,
      auteur: 'Atelier Savon Nova',
      ingredients: [
        { ingredient: this.mockIngredients[0], pourcentage: 45 },
        { ingredient: this.mockIngredients[1], pourcentage: 35 },
        { ingredient: this.mockIngredients[2], pourcentage: 20 }
      ]
    },
    {
      id: 2,
      titre: 'Rituel Amande',
      categorie: 'Exfoliant',
      surgras: 6,
      concentration: 31,
      auteur: 'Atelier Savon Nova',
      ingredients: [
        { ingredient: this.mockIngredients[0], pourcentage: 55 },
        { ingredient: this.mockIngredients[2], pourcentage: 45 }
      ]
    }
  ];
}
