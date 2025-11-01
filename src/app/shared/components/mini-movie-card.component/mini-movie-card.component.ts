import {Component, Input} from '@angular/core';
import {Movie} from '../../../models/Movie';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';

@Component({
  selector: 'app-mini-movie-card',
  imports: [
    MatCard,
    MatCardImage,
    MatCardContent
  ],
  templateUrl: './mini-movie-card.component.html',
  styleUrl: './mini-movie-card.component.scss'
})
export class MiniMovieCardComponent {
  @Input() movie!: Movie;
}
