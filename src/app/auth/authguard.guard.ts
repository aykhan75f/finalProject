import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';

export const authguardGuard: CanActivateFn = (route, state) => {
  const log = inject(LoginService);
  const router = inject(Router);
  if (sessionStorage.getItem('isLoggedIn') == 'true'){
    return true;
  }
  else{
    router.navigate(["/","login"]);
    return false;
  }
};