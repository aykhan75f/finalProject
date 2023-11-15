import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../Validators/noSpaceAllowed.Validator';
import { matchpassword } from '../Validators/matchpassword.validator';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formStatus: string = '';
  formdata: any = {};
  reactiveForm: FormGroup;
  loginobj:any ={
    email:'',
    password:'',
    };
    ngOnInit(): void {
    }
  constructor(private router:Router,private loginservice:LoginService){
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required,Validators.minLength(8),Validators.maxLength(16)]), 
    },
  ); 
  }

  OnFormSubmitted(){
    this.loginservice.login(this.loginobj.email,this.loginobj.password);
    console.log(this.loginobj.email);
    console.log(this.loginobj.password);
    this.reactiveForm.reset();
    }
    signInWithGoogle() {
      this.loginservice.googleSignIn();
    }
   
  }

