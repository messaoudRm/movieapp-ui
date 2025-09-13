import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MovieComponent} from "../movie.component/movie.component";
import {AuthService} from '../../../auth/services/auth-service';
import {Subject, takeUntil} from 'rxjs';
import {Movie} from '../../../models/Movie';
import {WatchLaterMoviesService} from '../../services/watch-later-movies-service';

@Component({
  selector: 'app-watch-later-movies-lists',
    imports: [
        MatGridList,
        MatGridTile,
        MovieComponent
    ],
  templateUrl: './watch-later-movies-list.component.html',
  styleUrl: './watch-later-movies-list.component.scss'
})
export class WatchLaterMoviesListComponent implements OnInit, OnDestroy {

  private watchLaterService = inject(WatchLaterMoviesService);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  movies: Movie[] = [];

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.watchLaterService.getWatchLaterMoviesById(this.authService.getUserId())
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

