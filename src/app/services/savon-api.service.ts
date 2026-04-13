import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class SavonApiService {
  private readonly apiBaseUrl = 'http://localhost:8080';

  constructor(private readonly http: HttpClient) {}

  getIngredients(): Observable<Ingredient[]> {
    return this.http
      .get<Ingredient[]>(`${this.apiBaseUrl}/api-savon/v1/ingredient`)
      .pipe(catchError(() => of(this.mockIngredients)));
  }

  getRecettes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(`${this.apiBaseUrl}/api-savon/v1/recette`)
      .pipe(catchError(() => of(this.mockRecettes)));
  }

  createRecette(recipe: Omit<Recipe, 'id'>): Observable<Recipe> {
    const payload = {
      titre: recipe.titre,
      categorie: recipe.categorie,
      surgras: recipe.surgras,
      concentration: recipe.concentration,
      auteur: recipe.auteur,
      ingredients: recipe.ingredients.map((line) => ({
        ingredientId: line.ingredient.id,
        pourcentage: line.pourcentage
      }))
    };

    return this.http
      .post<Recipe>(`${this.apiBaseUrl}/api-savon/v1/recette`, payload)
      .pipe(catchError(() => of({ ...recipe, id: this.mockRecettes.length + 1 })));
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
