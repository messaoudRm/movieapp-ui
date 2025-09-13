import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {UserService} from '../../services/user-service';
import {User} from '../../../models/User';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {DialogComponent} from '../dialog.component/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {NotificationSnackBarService} from '../../services/notification-snack-bar-service';

@Component({
  selector: 'app-user-list',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatPaginator,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, OnDestroy {

  private userService = inject(UserService);
  private destroy$ = new Subject<void>();
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private notificationService = inject(NotificationSnackBarService);

  users: User[] = [];
  totalElements = 0;
  pageIndex = 0;
  pageSize = 5;
  showFirstLastButtons = true;

  displayedColumns: string[] = ['id', 'username', 'password', 'email', 'role', 'action'];
  errorMessage = '';

  ngOnInit() {
    this.loadUsers(0, this.pageSize);
  }

  loadUsers(page: number, size: number) {
    this.userService.getAllUsers(page, size)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.users = response.content;
          this.totalElements = response.totalElements;
          this.pageSize = response.pageSize;
          this.pageIndex = response.pageNumber;
        },
        error: err => {
          console.error('Error loading users', err);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers(event.pageIndex, event.pageSize);
  }

  viewUserInfo(id: number) {
    this.router.navigate([`me`]);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log('User deleted successfully');
          this.loadUsers(this.pageIndex, this.pageSize);
          this.notificationService.openSnackBar('User deleted');
        },
        error: err => {
          this.errorMessage = 'Failed to delete user';
          console.error(err);
          this.notificationService.openSnackBar('Failed to delete user');
        }
      });
  }

  editUserInfo(id: number) {

  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Delete user',
        text: 'Are you sure you want to delete this user?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(id);
      }
    });
  }
}
