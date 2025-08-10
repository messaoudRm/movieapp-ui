import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Movie} from '../../../models/Movie';
import {MovieService} from '../../services/movie-service';
import {MovieComponent} from '../movie.component/movie.component';
import {Subscription} from 'rxjs';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';

@Component({
  selector: 'app-movie-list',
  imports: [
    MatPaginator,
    MovieComponent,
    MatGridList,
    MatGridTile,
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit, OnDestroy {

  private movieService=inject(MovieService);
  private moviesSubscription: Subscription | null = null;

  movies: Movie[] = [];
  totalElements = 0;
  pageIndex = 0;
  pageSize = 10;
  showFirstLastButtons = true;

  ngOnInit() {
    this.loadMovies(0, this.pageSize);
  }

  loadMovies(page: number, size: number) {
    this.movieService.getAllMovies(page, size).subscribe({
      next: response => {
        this.movies = response.content;
        this.totalElements = response.totalElements;
        this.pageSize = response.pageSize;
        this.pageIndex = response.pageNumber;
      },
      error: err => {
        console.error('Error loading movies', err);
      }
    });
  }

  ngOnDestroy() {
    this.moviesSubscription?.unsubscribe();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMovies(event.pageIndex, event.pageSize);
  }

}
