import {Component, inject, OnDestroy} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service';
import {Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {User} from '../../../models/User';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-register',
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatCard
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

  private fromBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  invalidUser = false;

  registerFromGroup = this.fromBuilder.group({
    'username': ['', [Validators.required]],
    'password': ['', [Validators.required]],
    'email': ['', [Validators.required]],
  });

  register() {
    this.authService.register(this.registerFromGroup.value as User)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: result => {
          this.navigateLogin();
        },
        error: error => {
          this.invalidUser = true;
        }
      })

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateLogin() {
    this.router.navigate(['login']);
  }

}
