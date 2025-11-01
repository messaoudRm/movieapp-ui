import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MovieService} from '../../services/movie-service';
import {Movie} from '../../../models/Movie';
import {catchError, debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap, takeUntil} from 'rxjs';
import {MiniMovieCardComponent} from '../mini-movie-card.component/mini-movie-card.component';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [
    MiniMovieCardComponent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
    MatIconButton,
    MatIcon,
    FormsModule,
    MatSuffix,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit, OnDestroy {

  private movieService = inject(MovieService);
  private router = inject(Router);

  movies: Movie[] = [];
  searchControl = new FormControl<string | Movie>('');
  filteredMovies = of<Movie[]>([]);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.initSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initSearch(): void {
    this.filteredMovies = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.fetchFilteredMovies(value)),
      takeUntil(this.destroy$)
    );
  }

  private fetchFilteredMovies(value: string | Movie | null): Observable<Movie[]> {
    const title = this.extractTitle(value);
    return title ? this.movieService
        .searchMovies(title)
        .pipe(catchError(() => of([]))) : of([]);
  }

  private extractTitle(value: string | Movie | null): string {
    if (!value) return '';
    if (typeof value === 'string') return value.trim();
    return value.title?.trim() || '';
  }

  displayMovieTitle(movie: Movie | string): string {
    if (!movie) return '';
    return typeof movie === 'string' ? movie : movie.title ?? '';
  }

  onMovieSelected(event: any): void {
    const movie: Movie = event.option.value;
    if (movie && movie.id) {
      this.router.navigate(['/movie', movie.id]);
    }
  }

  onEnterKey(): void {
    const value = this.searchControl.value;
    if (value && typeof value === 'object' && value.id) {
      this.router.navigate(['/movie', value.id]);
    }
  }

  onSubmitSearch(): void {
    this.onEnterKey();
  }

}
