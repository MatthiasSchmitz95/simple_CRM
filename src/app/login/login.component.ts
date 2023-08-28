import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { DarkmodeService } from '../services/darkmode.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('userName') userName: ElementRef;
  @ViewChild('userPassword') userPassword: ElementRef;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  // Method to handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      // Perform login logic here
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;
      this.loginCheck(email,password);
    }
    else{
      alert('password or email invalid')
    }
  }


  constructor(public authService: AuthService,public firestore:Firestore, public dm:DarkmodeService) { }

  ngOnInit() {  }



  loginCheck(email, password) {

    this.authService.SignIn(email, password)
      .catch((error) => {
        window.alert(error.message);
        this.userName.nativeElement.classList.add('custom-border-red');
        this.userPassword.nativeElement.classList.add('custom-border-red');
      }
      );


  }

}
