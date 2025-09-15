import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MovieComponent} from "../movie.component/movie.component";
import {AuthService} from '../../../auth/services/auth-service';
import {Subject, takeUntil} from 'rxjs';
import {Movie} from '../../../models/Movie';
import {GenericUserMoviesService} from '../../services/generic-user-movies-service';

@Component({
  selector: 'app-watched-movies-list',
    imports: [
        MatGridList,
        MatGridTile,
        MovieComponent
    ],
  templateUrl: './watched-movies-list.component.html',
  styleUrl: './watched-movies-list.component.scss'
})
export class WatchedMoviesListComponent implements OnInit, OnDestroy {

  private watchedService = inject(GenericUserMoviesService);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();
  private SUFFIX = 'watched';

  movies: Movie[] = [];

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.watchedService.getUserMoviesById(this.SUFFIX, this.authService.getUserId())
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


