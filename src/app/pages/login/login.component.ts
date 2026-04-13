import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public credentials = { identifier: '', password: '' };
  public errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = null;
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/recettes']);
      },
      error: () => {
        this.errorMessage = 'Identifiants invalides ou serveur indisponible.';
      }
    });
  }
}
