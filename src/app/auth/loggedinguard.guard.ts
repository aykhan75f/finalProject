import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';

export const loggedinguardGuard: CanActivateFn = (route, state) => {
  const log = inject(LoginService);
  const router = inject(Router);
  const toast = inject(ToastrService);
  if (sessionStorage.getItem('token')!=null){
    toast.error("You have already logged In, hence you are not required to access the signup page")
    router.navigateByUrl('/products');
    return true;
  }
  else{
    return false;
  }
};
