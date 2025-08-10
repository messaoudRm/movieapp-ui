import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const skipUrls = ['/login', '/register'];

  if (skipUrls.some(url => req.url.includes(url))) {
    return next(req);
  }

  const tokenService = inject(TokenService);
  let authReq = req;
  if (tokenService.getUserToken()) {
    authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${tokenService.getUserToken()}`
    }
  });
  }
  return next(authReq);
}
