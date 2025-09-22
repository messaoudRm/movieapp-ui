import {Component, inject, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {MovieService} from '../../services/movie-service';
import {Subject, takeUntil} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../../../models/Movie';
import {MatButton} from '@angular/material/button';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {UpperCasePipe} from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatList} from '@angular/material/list';
import {AuthService} from '../../../auth/services/auth-service';
import {NotificationSnackBarService} from '../../services/notification-snack-bar-service';
import {GenericUserMoviesService, MovieUserDto} from '../../services/generic-user-movies-service';


@Component({
  selector: 'app-movie-details',
  imports: [
    MatButton,
    MatChip,
    MatChipSet,
    UpperCasePipe,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatList,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit, OnDestroy, OnChanges {
  private movieService = inject(MovieService);
  private userMoviesService = inject(GenericUserMoviesService);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationSnackBarService);
  private destroy$ = new Subject<void>();
  private route = inject(ActivatedRoute);

  movie!: Movie;
  genres: string[] = [];
 errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.movieService.getMovieById(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: movie => {
            this.movie = movie;
            if (movie.genre) {
              this.genres = movie.genre
                .split(',')
                .map((elem: string) => elem.trim())
            }
          },
          error: err => {
            this.errorMessage = 'Failed to load movie';
            console.error(err);
          }
        });
    } else {
      this.errorMessage = 'Invalid movie ID';
    }
  }

  ngOnChanges(): void {
    this.updateGenres();
  }

  private updateGenres(): void {
    if (this.movie?.genre) {
      this.genres = this.movie.genre
        .split(',')
        .map(elem => elem.trim());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addToFavorite(movieId: number | null) {
    const SUFFIX ="favorites";
    this.addToUserMovies(SUFFIX, movieId);
  }

  addToWatchLater(movieId: number | null) {
    const SUFFIX ="watch-later";
    this.addToUserMovies(SUFFIX, movieId);
  }

  addToWatched(movieId: number | null) {
    const SUFFIX ="watched";
    this.addToUserMovies(SUFFIX, movieId);
  }

  addToUserMovies(SUFFIX: string, movieId: number | null) {
    const userId = this.authService.getUserId();
    const movieUserDto: MovieUserDto = {userId, movieId};
    this.userMoviesService.addToUserMovies(SUFFIX,movieUserDto)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notificationService.openSnackBar(`Movie added to ${SUFFIX}`);
        },
        error: err => {
          console.error(err);
          this.notificationService.openSnackBar(`Failed to add ${SUFFIX}`);
        }
      });
  }

  deleteFromFavorite(movieId: number | null) {
    const SUFFIX ="favorites";
    this.deleteFromUserMovies(SUFFIX, movieId);
  }

  deleteFromWatchLater(movieId: number | null) {
    const SUFFIX ="watch-later";
    this.deleteFromUserMovies(SUFFIX, movieId);
  }

  deleteFromWatched(movieId: number | null) {
    const SUFFIX ="watched";
    this.deleteFromUserMovies(SUFFIX, movieId);
  }

  deleteFromUserMovies(SUFFIX: string, movieId: number | null) {
    const userId = this.authService.getUserId();
    this.userMoviesService.deleteUserMovie(SUFFIX,userId,movieId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notificationService.openSnackBar(`Movie deleted from ${SUFFIX}`);
        },
        error: err => {
          console.error(err);
          this.notificationService.openSnackBar(`Failed deleted from ${SUFFIX}`);
        }
      });
  }
}
