import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { DarkmodeService } from '../services/darkmode.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('userName') userName: ElementRef;
  @ViewChild('userPassword') userPassword: ElementRef;
  loginForm: FormGroup;
  email;
  password;

  // Method to handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      // Perform login logic here
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;
      this.loginCheck(email, password);
    }
    else {
      alert('password or email invalid')
    }
  }


  constructor(public authService: AuthService, public firestore: Firestore, public dm: DarkmodeService,private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
   }

  ngOnInit() {

   }



  loginCheck(email, password) {
    this.authService.SignIn(email, password)

  }

}
