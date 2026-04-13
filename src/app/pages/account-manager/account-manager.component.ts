import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account-manager',
  imports: [DatePipe],
  templateUrl: './account-manager.component.html',
  styleUrl: './account-manager.component.css',
})
export class AccountManagerComponent {
  public authService = inject(AuthService);
}
