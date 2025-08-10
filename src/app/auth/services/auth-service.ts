import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/User';
import {Observable, tap} from 'rxjs';
import {environment} from '../../../environments/environment';

export interface Credentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private SUFFIX = 'auth/';

  login(credentials: Credentials):Observable<any> {
    return this.http.post(environment.apiUrl + this.SUFFIX + 'login', credentials).pipe(
      tap((result: any) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('token_type', result.type);
      })
    )
  }

  register(user: User): Observable<any> {
    const payload = { ...user, role: user.role ?? 'USER' };
    return this.http.post(environment.apiUrl + this.SUFFIX + 'register', payload);
  }

}
