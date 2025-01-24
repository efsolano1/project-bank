import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../service/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  if (tokenService.isAuthenticated()) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${tokenService.getToken()}`
      }
    });
    console.log("Auth Request", authReq);
    return next(authReq);
  }
  return next(req);
};
