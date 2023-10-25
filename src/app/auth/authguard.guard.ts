import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';

export const authguardGuard: CanActivateFn = (route, state) => {
  const log = inject(LoginService);
  const router = inject(Router);
  if (log.loggedIn()){
    return true;
  }
  else{
    router.navigate(["/","notfound"]);
    return false;
  }
};
