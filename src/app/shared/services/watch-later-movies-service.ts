import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs';
import {Movie} from '../../models/Movie';
import {MovieUserDto} from './favorite-movies-service';

@Injectable({
  providedIn: 'root'
})
export class WatchLaterMoviesService {
  private http = inject(HttpClient);
  private SUFFIX = 'watch-later';

  getAllWatchLaterMovies(page: number, size: number) {
    return this.http.get<any>(environment.apiUrl + this.SUFFIX + `?page=${page}&size=${size}`).pipe(
      map(response => ({
        content: response.content.map((movieJson: any) => Movie.fromJson(movieJson)),
        totalElements: response.totalElements,
        pageSize: response.pageable.pageSize,
        pageNumber: response.pageNumber,
      }))
    );
  }

  getWatchLaterMoviesById(userId: number | null) {
    return this.http.get<any>(environment.apiUrl + this.SUFFIX + '/users/' + userId).pipe(
      map(response => response.map((movieJson: any) => Movie.fromJson(movieJson)))
    );
  }

  deleteWatchLaterMovie(id: number) {
    return this.http.delete(environment.apiUrl + this.SUFFIX + '/' + id);
  }

  addToWatchLater(movie: MovieUserDto) {
    return this.http.post(environment.apiUrl + this.SUFFIX, movie);
  }
}
