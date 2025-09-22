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
export class GenericUserMoviesService {
  private http = inject(HttpClient);

  getAllUserMovies(SUFFIX: string, page: number, size: number) {
    return this.http.get<any>(environment.apiUrl + SUFFIX + `?page=${page}&size=${size}`).pipe(
      map(response => ({
        content: response.content.map((movieJson: any) => Movie.fromJson(movieJson)),
        totalElements: response.totalElements,
        pageSize: response.pageable.pageSize,
        pageNumber: response.pageNumber,
      }))
    );
  }

  getUserMoviesById(SUFFIX: string, userId: number | null) {
    return this.http.get<any>(environment.apiUrl + SUFFIX + '/users/' + userId).pipe(
      map(response => response.map((movieJson: any) => Movie.fromJson(movieJson)))
    );
  }

  deleteUserMovie(SUFFIX: string, userId: number | null, moviesId: number | null) {
    return this.http.delete(environment.apiUrl + SUFFIX + '/users/' + userId + '/movies/' + moviesId);
  }

  addToUserMovies(SUFFIX: string, movie: MovieUserDto) {
    return this.http.post(environment.apiUrl + SUFFIX, movie);
  }
}
