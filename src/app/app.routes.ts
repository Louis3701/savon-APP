import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'calculateur', component: CalculatorComponent },
	{ path: 'recettes', component: RecipesComponent },
	{ path: 'ingredients', component: IngredientsComponent },
	{ path: '**', redirectTo: '' }
];
