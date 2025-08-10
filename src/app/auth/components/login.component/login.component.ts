import {Component, inject, OnDestroy} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService, Credentials} from '../../services/auth-service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatError,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {

  ngOnDestroy(): void {
      this.loginSubscription?.unsubscribe();
  }

  private fromBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  private loginSubscription : Subscription | null = null;

  invalidCredentials = false;

  loginFromGroup = this.fromBuilder.group({
    'username': ['', [Validators.required]],
    'password': ['', [Validators.required]],
  });

  login(){
    this.loginSubscription = this.authService.login(this.loginFromGroup.value as Credentials)
      .subscribe({
        next: result => {
          this.navigateHome();
        },
        error: error => {
          this.invalidCredentials = true;
        }
      })

  }

  navigateHome(){
    this.router.navigate(['home']);
  }

}
