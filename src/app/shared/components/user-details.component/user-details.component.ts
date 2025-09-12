import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {UserService} from '../../services/user-service';
import {User} from '../../../models/User';
import {AuthService} from '../../../auth/services/auth-service';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog.component/dialog.component';

@Component({
  selector: 'app-user-details',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();
  private router = inject(Router);
  private dialog = inject(MatDialog);

  user!: User;
  errorMessage = '';

  ngOnInit(): void {
    this.userService.getUserById(this.authService.getUserId())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: user => {
          this.user = user;
        },
        error: err => {
          this.errorMessage = 'Failed to load user';
          console.error(err);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Delete Account',
        text: 'Are you sure you want to delete your account?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser();
      }
    });
  }

  deleteUser(): void {
    this.userService.deleteUser(this.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log('User deleted successfully');
          this.router.navigate(['/login']);
        },
        error: err => {
          this.errorMessage = 'Failed to delete user';
          console.error(err);
        }
      });
  }
}
