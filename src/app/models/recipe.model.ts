import { Ingredient } from './ingredient.model';

export interface Recipe {
  id: number;
  titre: string;
  categorie: 'Solide' | 'Liquide' | 'Exfoliant';
  surgras: number;
  concentration: number;
  auteur: string;
  ingredients: Array<{
    ingredient: Ingredient;
    pourcentage: number;
  }>;
}
