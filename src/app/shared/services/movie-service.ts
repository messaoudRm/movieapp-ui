import {inject, Injectable} from '@angular/core';
import {Movie} from '../../models/Movie';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  private SUFFIX = 'movies';


  getAllMovies(page: number, size: number) {
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

  getMovieById(id: number) {
    return this.http.get<any>(environment.apiUrl + this.SUFFIX + '/' + id).pipe(
      map(movieJson => Movie.fromJson(movieJson))
    );
  }

  searchMovies(title: string) {
    return this.http
      .get<Movie[]>(environment.apiUrl + this.SUFFIX + `/search?title=${encodeURIComponent(title)}`).pipe(
        map((response: any[]) =>
          response ? response
            .map(movieJson => Movie.fromJson(movieJson)) : []
        )
      );
  }


  addMovie(movie: Movie) {
  }

  deleteMovie(id: number) {
    return this.http.delete(environment.apiUrl + this.SUFFIX + '/' + id);
  }

  editMovie(id: number, movie: Movie) {
  }


}
