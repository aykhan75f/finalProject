import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../Validators/noSpaceAllowed.Validator';
import { matchpassword } from '../Validators/matchpassword.validator';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formStatus: string = '';
  formdata: any = {};
  reactiveForm: FormGroup;
  signupusers:any[]=[];
  signupobj:any ={
    firstname:'',
    lastname:'',
    email:'',
    password:'',
  };
  constructor(){
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
    this.signupusers.push(this.signupobj);
    localStorage.setItem('signupusers',JSON.stringify(this.signupusers));
    this.signupobj ={
      firstname:'',
      lastname:'',
      email:'',
      password:'',
    };
    console.log(this.reactiveForm);
    this.formdata = this.reactiveForm.value;
    alert('User Registration Successful')
    this.reactiveForm.reset();
    
  }

}
