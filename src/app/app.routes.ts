import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { LoginComponent } from './pages/login/login.component';
import { SubscribeComponent } from './pages/subscribe/subscribe.component';
import { AboutComponent } from './pages/about/about.component';
import { LegalNoticeComponent } from './pages/legal-notice/legal-notice.component';
import { AccountManagerComponent } from './pages/account-manager/account-manager.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'calculateur', component: CalculatorComponent },
	{ path: 'recettes', component: RecipesComponent, canActivate: [authGuard] },
	{ path: 'ingredients', component: IngredientsComponent, canActivate: [authGuard] },
	{ path: 'account', component: AccountManagerComponent, canActivate: [authGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'subscribe', component: SubscribeComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'legal-notice', component: LegalNoticeComponent },
	{ path: '**', redirectTo: '' }
];
