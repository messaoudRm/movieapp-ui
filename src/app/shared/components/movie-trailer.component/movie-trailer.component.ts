import {Component, Input} from '@angular/core';
import {YouTubePlayer} from '@angular/youtube-player';

@Component({
  selector: 'app-movie-trailer',
  imports: [
    YouTubePlayer
  ],
  templateUrl: './movie-trailer.component.html',
  styleUrl: './movie-trailer.component.scss'
})
export class MovieTrailerComponent {
  @Input() videoId: string | null = null;
}
