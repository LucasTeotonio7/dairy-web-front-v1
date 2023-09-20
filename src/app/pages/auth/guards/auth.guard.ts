import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const is_authenticated = authService.is_authenticated();

  if(state.url === '/login'){
    return is_authenticated ? router.parseUrl('/') : true;
  }

  return is_authenticated || router.parseUrl('/login');
};
