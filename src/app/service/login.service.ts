import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider} from '@angular/fire/auth'
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  haveaccess:boolean;
  constructor(private fireauth : AngularFireAuth, private router : Router) { }
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        this.haveaccess = true;
        localStorage.setItem('token','true');
        if(res.user?.emailVerified == true) {  
          this.router.navigate(['/products']);
        }
    }, err => {
        this.haveaccess= false;
        alert(err.message);
        this.router.navigate(['/login']);    
    })
  }
  loggedIn(){
    if (this.haveaccess)
    {
      return true;
    }
    else{
      return false;
    }
  }
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.haveaccess = true;
      this.router.navigate(['/products']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }
}
