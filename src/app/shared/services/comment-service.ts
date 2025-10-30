import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs';
import {Comment} from '../../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private http = inject(HttpClient);
  private SUFFIX = 'comments';

  addComment(content: string, userId: number | null, movieId: number) {
    const body = {
      user: { id: userId },
      movie: { id: movieId },
      content: content
    };
    return this.http.post<any>(environment.apiUrl + this.SUFFIX, body);
  }

  getCommentsByMovieId(movieId: number | null) {
    return this.http.get<any>(environment.apiUrl + this.SUFFIX + '/movie/' + movieId).pipe(
      map(response => ({
        movieId: response.movieId,
        movieTitle: response.movieTitle,
        comments: response.comments.map((commentJson: any) =>
          Comment.fromJson(commentJson, {
            id: response.movieId,
            title: response.movieTitle
          })
        )
      }))
    );
  }

  getCommentsByUserId(userId: number | null) {
    return this.http.get<any>(environment.apiUrl + this.SUFFIX + '/user/' + userId).pipe(
      map(response => ({
        userId: response.userId,
        username: response.username,
        comments: response.comments.map((commentJson: any) =>
          Comment.fromJson(commentJson,{
            id: response.movieId,
            title: response.movieTitle
          }))
      }))
    );
  }

  deleteComment(commentId: number | null) {
    return this.http.delete(environment.apiUrl + this.SUFFIX + '/' + commentId);
  }
}

