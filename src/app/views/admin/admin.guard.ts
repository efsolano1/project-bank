import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../service/token.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.isAuthenticated()) {
    return true;
  }
  router.navigate(['']);
  return false;
};
