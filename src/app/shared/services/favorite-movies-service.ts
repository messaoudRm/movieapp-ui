import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs';
import {Movie} from '../../models/Movie';

export interface MovieUserDto {
  userId: number | null;
  movieId: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteMoviesService {
  private http = inject(HttpClient);
  private SUFFIX = 'favorites';


  getAllFavoriteMovies(page: number, size: number) {
    return this.http.get<any>(environment.apiUrl + this.SUFFIX + `?page=${page}&size=${size}`).pipe(
      map(response => ({
        content: response.content.map(
          (movieJson: any) => Movie.fromJson(movieJson)),
        totalElements: response.totalElements,
        pageSize: response.pageable.pageSize,
        pageNumber: response.pageNumber,
      }))
    );
  }

  getFavoriteMoviesById(id: number | null) {
    return this.http.get<any>(environment.apiUrl + this.SUFFIX +'/users'+ '/' + id).pipe(
      map(response => response.map((movieJson: any) => Movie.fromJson(movieJson)))
    );
  }

  deleteFavoriteMovie(id: number) {
    return this.http.delete(environment.apiUrl + this.SUFFIX + '/' + id);
  }

  addToFavorite(movie: MovieUserDto) {
    return this.http.post(environment.apiUrl + this.SUFFIX , movie);
  }
}
