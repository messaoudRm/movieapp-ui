import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MovieComponent} from '../movie.component/movie.component';
import {Subject, takeUntil} from 'rxjs';
import {Movie} from '../../../models/Movie';
import {FavoriteMoviesService} from '../../services/favorite-movies-service';
import {AuthService} from '../../../auth/services/auth-service';

@Component({
  selector: 'app-favorite-movies-list',
  imports: [
    MatGridList,
    MatGridTile,
    MovieComponent
  ],
  templateUrl: './favorite-movies-list.component.html',
  styleUrl: './favorite-movies-list.component.scss'
})
export class FavoriteMoviesListComponent implements OnInit, OnDestroy {

  private favoriteService = inject(FavoriteMoviesService);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  movies: Movie[] = [];

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.favoriteService.getFavoriteMoviesById(this.authService.getUserId())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.movies = response;
        },
        error: err => {
          console.error('Error loading movies', err);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
