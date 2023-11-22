import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../Validators/noSpaceAllowed.Validator';
import { matchpassword } from '../Validators/matchpassword.validator';
import { SignupService } from '../service/signup.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  formStatus: string = '';
  formdata: any = {};
  reactiveForm: FormGroup;
  signupobj: any = {
    email: '',
    password: '',
  };
  constructor(private signupservice: SignupService, private http: HttpClient) {
    this.reactiveForm = new FormGroup(
      {
        firstname: new FormControl(null, [
          Validators.required,
          CustomValidators.noSpaceAllowed,
        ]),
        lastname: new FormControl(null, [
          Validators.required,
          CustomValidators.noSpaceAllowed,
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          CustomValidators.passwordPattern,
        ]),
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
        validators: matchpassword,
      }
    );
  }

  OnFormSubmitted(postData: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    gender: string;
  }) {
    this.signupservice.register(this.signupobj.email, this.signupobj.password);
    this.signupobj.email = '';
    this.signupobj.password = '';
    console.log(this.reactiveForm);
    this.http
      .post(
        'https://project-4c073-default-rtdb.firebaseio.com/users.json',
        postData
      )
      .subscribe((responsedata) => {
        console.log(responsedata);
      });
    this.formdata = this.reactiveForm.value;
    this.reactiveForm.reset();
  }
}
