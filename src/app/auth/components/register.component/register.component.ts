import {Component, inject, OnDestroy} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {User} from '../../../models/User';

@Component({
  selector: 'app-register',
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }

  private fromBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  private registerSubscription : Subscription | null = null;

  invalidUser = false;

  registerFromGroup = this.fromBuilder.group({
    'username': ['', [Validators.required]],
    'password': ['', [Validators.required]],
    'email': ['', [Validators.required]],
  });

  register(){
    this.registerSubscription = this.authService.register(this.registerFromGroup.value as User)
      .subscribe({
        next: result => {
          this.navigateLogin();
        },
        error: error => {
          this.invalidUser = true;
        }
      })

  }

  navigateLogin(){
    this.router.navigate(['login']);
  }

}
