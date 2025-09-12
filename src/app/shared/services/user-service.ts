import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs';
import {User} from '../../models/User';
import {Movie} from '../../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private SUFFIX = 'users';

  getAllUsers(page: number, size: number) {
    return this.http.get<any>(environment.apiUrl + this.SUFFIX + `?page=${page}&size=${size}`).pipe(
      map(response => ({
        content: response.content.map((userJson: any) => User.fromJson(userJson)),
        totalElements: response.totalElements,
        pageSize: response.pageable.pageSize,
        pageNumber: response.pageNumber,
      }))
    );
  }

  getUserById(id: number | null) {
    return this.http.get<any>(environment.apiUrl + this.SUFFIX + '/' + id).pipe(
      map(userJson => User.fromJson(userJson))
    );
  }

  deleteUser(id: number) {
    return this.http.delete(environment.apiUrl + this.SUFFIX + '/' + id);
  }

}
