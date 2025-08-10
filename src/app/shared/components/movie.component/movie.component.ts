import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  MatCard, MatCardActions,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Movie} from '../../../models/Movie';
import {MovieService} from '../../services/movie-service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-movie',
  imports: [
    MatCardHeader,
    MatCard,
    MatCardSubtitle,
    MatCardImage,
    MatCardActions,
    MatButton,
    DatePipe
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent implements OnInit, OnDestroy{

  private movieService = inject(MovieService);
  private movieSubscription: Subscription | null = null;
  private route = inject(ActivatedRoute);
  private router= inject(Router);
  @Input() movie!: Movie;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.movieSubscription = this.movieService.getMovieById(id).subscribe({
        next: movie => {
          this.movie = movie;
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

  ngOnDestroy(): void {
    this.movieSubscription?.unsubscribe();
  }

  goToMovieDetail(id: number) {
    this.router.navigate([`movie/${id}`]);
  }
}
