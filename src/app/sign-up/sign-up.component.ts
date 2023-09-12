import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { DarkmodeService } from '../services/darkmode.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent  {
  signUpForm:FormGroup;
  constructor(public authService: AuthService, public dm:DarkmodeService, public fb:FormBuilder) {
    this.signUpForm=this.fb.group({
      name:['', [Validators.required]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, this.passwordLengthValidator]]
    })
   }

   passwordLengthValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value as string;
    if (password && password.length < 6) {
      return { 'passwordLength': true }; // Password is too short
    }
    return null; // Password is valid
  }




  onSubmit(){
    const name= this.signUpForm.get('name')!.value;
    const email= this.signUpForm.get('email')!.value;
    const password= this.signUpForm.get('password')!.value;
    this.authService.SignUp(email, password , name);
  }
}