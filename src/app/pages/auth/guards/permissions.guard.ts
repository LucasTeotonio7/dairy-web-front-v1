import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

export const permissionsGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const defaultRoute = router.parseUrl('/');

  const hasGroupAccess = (user: User, groupName: string): boolean => {
    return user.available_groups.some(group => group.name === groupName && user.groups.includes(group.id));
  };

  const routeGroupMap: { [key: string]: string } = {
    '/users': 'Usuários',
    '/weekly-control': 'Planilhas',
    '/suppliers': 'Fornecedores',
    '/products': 'Produtos',
    '/dashboard': 'Dashboard'
  };

  return userService.getLoggedUser().pipe(
    map((user: User) => {
      const groupName = routeGroupMap[state.url];
      if (groupName) {
        return user.is_superuser || hasGroupAccess(user, groupName) ? true : defaultRoute;
      }
      return defaultRoute;
    }),
    catchError((err: any) => {
      console.error(err);
      return of(defaultRoute);
    })
  );
};
