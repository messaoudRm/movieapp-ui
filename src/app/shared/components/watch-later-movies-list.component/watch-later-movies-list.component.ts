import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MovieComponent} from "../movie.component/movie.component";
import {AuthService} from '../../../auth/services/auth-service';
import {Subject, takeUntil} from 'rxjs';
import {Movie} from '../../../models/Movie';
import {GenericUserMoviesService} from '../../services/generic-user-movies-service';

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

  private watchLaterService = inject(GenericUserMoviesService);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();
  private SUFFIX = 'watch-later';

  movies: Movie[] = [];

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.watchLaterService.getUserMoviesById(this.SUFFIX, this.authService.getUserId())
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

