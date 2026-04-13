import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'recettes', component: RecipesComponent },
	{ path: 'ingredients', component: IngredientsComponent },
	{ path: '**', redirectTo: '' }
];
