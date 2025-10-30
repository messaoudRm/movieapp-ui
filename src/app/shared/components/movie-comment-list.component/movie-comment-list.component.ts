import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {CommentComponent} from "../comment.component/comment.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {CommentService} from '../../services/comment-service';
import {AuthService} from '../../../auth/services/auth-service';
import {Subject, takeUntil} from 'rxjs';
import {Comment} from '../../../models/Comment';
import {MatList, MatListItem} from '@angular/material/list';

@Component({
  selector: 'app-movie-comment-list',
  imports: [
    CommentComponent,
    FormsModule,
    MatCard,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatTooltip,
    ReactiveFormsModule,
    MatList,
    MatListItem
  ],
  templateUrl: './movie-comment-list.component.html',
  styleUrl: './movie-comment-list.component.scss'
})
export class MovieCommentListComponent implements OnInit, OnDestroy {

  @Input() movieId!: number;

  private commentService = inject(CommentService);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  private destroy$ = new Subject<void>();
  protected movieTitle = '';
  protected comments: Comment[] = [];
  protected commentFormGroup!: FormGroup;
  protected invalidComment = false;


  ngOnInit() {
    this.commentFormGroup = this.formBuilder.group({
      content: ['', [Validators.required]]
    });
    this.loadComments();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadComments() {
    this.commentService
      .getCommentsByMovieId(this.movieId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.movieId = response.movieId;
          this.movieTitle = response.movieTitle;
          this.comments = this.sortCommentsByDateDesc(response.comments);
        },
        error: (err) => {
          console.error('Error while loading comments', err)
        }
      });
  }

  private sortCommentsByDateDesc(comments: Comment[]): Comment[] {
    return comments.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  submitComment() {
    const content = this.commentFormGroup.value.content;
    const userId = this.authService.getUserId();

    if (this.commentFormGroup.invalid) {
      this.invalidComment = true;
      return;
    }

    this.commentService
      .addComment(content, userId, this.movieId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.commentFormGroup.reset();
          this.invalidComment = false;
          this.loadComments();
        },
        error: (err) => {
          console.error('Failed to add the comment', err);
          this.invalidComment = true;
        }
      });
  }
}


