import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/User';
import {Observable, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import {TokenService} from '../../core/services/token.service';

export interface Credentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private SUFFIX = 'auth/';

  login(credentials: Credentials):Observable<any> {
    return this.http.post(environment.apiUrl + this.SUFFIX + 'login', credentials).pipe(
      tap((result: any) => {
        this.tokenService.setUserToken(result.token, result.type);
      })
    )
  }

  register(user: User): Observable<any> {
    const payload = { ...user, role: user.role ?? 'USER' };
    return this.http.post(environment.apiUrl + this.SUFFIX + 'register', payload);
  }

  getUserId(): number | null {
    const token = this.tokenService.getUserToken();
    if (!token) {
      return null;
    }
    try {
      const decoded: any = jwtDecode(token);
      return decoded.id ?? null;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

}
