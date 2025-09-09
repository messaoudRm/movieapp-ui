import {Component, inject, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {MovieService} from '../../services/movie-service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
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
export class MovieDetailsComponent implements OnInit, OnDestroy, OnChanges{
  private movieService = inject(MovieService);
  private movieSubscription: Subscription | null = null;
  private route = inject(ActivatedRoute);
  private router= inject(Router);
  movie!: Movie;
  genres: string[]= [];
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.movieSubscription = this.movieService.getMovieById(id).subscribe({
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
    if (this.movie?.genre) {
      this.genres = this.movie.genre
        .split(',')
        .map((elem: string) => elem.trim())
    }
  }

  ngOnDestroy(): void {
    this.movieSubscription?.unsubscribe();
  }

  goToMovieDetail(id: number) {
    this.router.navigate([`movie/${id}`]);
  }
}
