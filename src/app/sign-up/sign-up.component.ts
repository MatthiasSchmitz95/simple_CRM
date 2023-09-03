import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { DarkmodeService } from '../services/darkmode.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm:FormGroup;
  constructor(public authService: AuthService, public dm:DarkmodeService, public fb:FormBuilder) {
    this.signUpForm=this.fb.group({
      name:['', [Validators.required]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]
    })
   }


  ngOnInit() { }

  onSubmit(){
    const name= this.signUpForm.get('name')!.value;
    const email= this.signUpForm.get('email')!.value;
    const password= this.signUpForm.get('password')!.value;
    this.authService.SignUp(email, password , name);
  }
}