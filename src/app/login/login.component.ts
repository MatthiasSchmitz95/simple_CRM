import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';


@Component({
  selector: 'app-sign-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('userName') userName: ElementRef;
  @ViewChild('userPassword') userPassword: ElementRef;


  constructor(public authService: AuthService,public firestore:Firestore) { }

  ngOnInit() {  }



  loginCheck(email, password) {

    this.authService.SignIn(email, password)
      .catch((error) => {
        window.alert(error.message);
        this.userName.nativeElement.classList.add('custom-border-red');
        this.userPassword.nativeElement.classList.add('custom-border-red');
      });


  }

}
