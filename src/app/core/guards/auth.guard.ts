import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  authService.isAuthenticated.subscribe({
    next: (auth) => {
      if (!auth) {
        router.navigate(['/auth/login'])
      }
    }
  });

  return true;
};
