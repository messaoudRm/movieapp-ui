import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  getUserToken(): string | null {
    return localStorage.getItem('token')
  }

  setUserToken(userToken: string): void {
    localStorage.setItem('token', userToken);
  }
}
