import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../Validators/noSpaceAllowed.Validator';
import { matchpassword } from '../Validators/matchpassword.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formStatus: string = '';
  formdata: any = {};
  signupusers:any[]=[];
  reactiveForm: FormGroup;
  loginobj:any ={
    email:'',
    password:'',
    };
    ngOnInit(): void {
      const localdata = localStorage.getItem('signupusers');
      if(localdata!=null){
        this.signupusers = JSON.parse(localdata)
        console.log(this.signupusers);
      }
    }
  constructor(private router:Router){
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
      lastname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required,Validators.minLength(8),Validators.maxLength(16)]),
      Cpassword: new FormControl(null, [Validators.required]),
      gender: new FormControl('male'),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl('India', Validators.required),
        city: new FormControl(null),
        region: new FormControl(null),
        postal: new FormControl(null, Validators.required),
      }), 
    },
    {
      validators:matchpassword
    }); 
  }

  OnFormSubmitted(){
    console.log(this.loginobj.email);
    console.log(this.loginobj.password);
    const isUserExist = this.signupusers.find(m => m.email == this.loginobj.email && m.password == this.loginobj.password);
    if (isUserExist !=undefined){
      alert('User Login Successfull');
      this.router.navigate(['/products'])
    }
    else{
      alert('Oops!!! Wrong credentials,Try Again');
    }
    console.log(this.reactiveForm);
    this.formdata = this.reactiveForm.value;
    this.reactiveForm.reset();
  }
}
