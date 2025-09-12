import {
  Component,
  inject,
  Input,
} from '@angular/core';
import {
  MatCard,
  MatCardImage,
} from '@angular/material/card';
import {Movie} from '../../../models/Movie';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie',
  imports: [
    MatCard,
    MatCardImage,
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {

  private router= inject(Router);
  @Input() movie!: Movie;

  goToMovieDetail(id: number) {
    this.router.navigate([`movie/${id}`]);
  }
}
