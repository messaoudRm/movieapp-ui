import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommentService} from '../../services/comment-service';
import {AuthService} from '../../../auth/services/auth-service';
import {Subject, takeUntil} from 'rxjs';
import {Comment} from '../../../models/Comment';
import {NotificationSnackBarService} from '../../services/notification-snack-bar-service';
import {Router} from '@angular/router';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatChip} from '@angular/material/chips';
import {DatePipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-user-comment-list.component',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatChip,
    DatePipe,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  templateUrl: './user-comment-list.component.html',
  styleUrl: './user-comment-list.component.scss'
})
export class UserCommentListComponent implements OnInit, OnDestroy {

  private commentService = inject(CommentService);
  private authService = inject(AuthService);
  private router=inject(Router);
  private notificationService = inject(NotificationSnackBarService);


  private destroy$ = new Subject<void>();
  protected comments: Comment[] = [];
  protected isUserCommentsRoute = false;
  protected displayedColumns: string[] = ['movie', 'content', 'sentiment', 'createdAt', 'hour', 'action'];


  ngOnInit() {
    this.isUserCommentsRoute = this.router.url.includes('/comments');
    this.loadComments();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadComments() {
    const userId = this.authService.getUserId();
    this.commentService
      .getCommentsByUserId(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.comments = response;
        },
        error: (err) => {
          console.error('Error while loading comments', err);
        }
      });
  }

  deleteComment(commentId: number) {
    this.commentService
      .deleteComment(commentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.comments = this.comments.filter(comment => comment.id !== commentId);
          this.notificationService.openSnackBar("Comment deleted");
        },
        error: (err) => {
          console.error("Error while deleting the comment",err);
          this.notificationService.openSnackBar("Error while deleting the comment");
        }
      });
  }
}
