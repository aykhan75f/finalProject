import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';

export const loggedinguardGuard: CanActivateFn = (route, state) => {
  const log = inject(LoginService);
  const router = inject(Router);
  const toast = inject(ToastrService);
  if (sessionStorage.getItem('isLoggedIn') == 'true'){
    var a = confirm("Are you sure you want to proceed, because all your progress will be lost.")
    if (a)
    {
      toast.error("You have already logged In, hence you are not required to access the signup page");
      router.navigateByUrl('/products');
      return false;
    }
    else
    {
      router.navigate(['/products']);
    }
    
  }
  else{
    return true;
  }
};
