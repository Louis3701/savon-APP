import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-subscribe',
  imports: [CommonModule, FormsModule],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css',
})
export class SubscribeComponent {
  public userInfo = { username: '', email: '', password: '' };
  public doubleInputPwd = '';
  public errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = null;
    this.authService.subscribe(this.userInfo).subscribe({
      next: () => {
        this.router.navigate(['/calculateur']);
      },
      error: () => {
        this.errorMessage = 'Erreur durant la création du compte.';
      }
    });
  }
}
