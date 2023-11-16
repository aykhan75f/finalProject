import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider} from '@angular/fire/auth'
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  haveaccess:boolean = false;
  constructor(private fireauth : AngularFireAuth, private router : Router,private toast:ToastrService) { }
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        this.haveaccess = true;
        console.log(this.haveaccess); 
        this.showsuccess();
        this.router.navigate(['/products']);
        sessionStorage.setItem('isLoggedIn','true');
    }, err => {
        this.haveaccess= false;
        alert(err.message);
        this.router.navigate(['/login']);    
    })
  }
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.haveaccess = true;
      this.router.navigate(['/products']);
      sessionStorage.setItem('isLoggedIn','true');

    }, err => {
      alert(err.message);
    })
  }
  showsuccess(){
    this.toast.info("User Log-In Successful");
  }
}
