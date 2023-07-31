import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserData } from '../../models/user-data';
import { getAuth } from '@angular/fire/auth';
import { Firestore, collection, doc, docData, getDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})


export class AuthService {
  userData: any; // Save logged in user data
  userId;
  displayName;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public firestore: Firestore
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      console.log('Test', user);
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
// Sign in with email/password
 async SignIn(email: string, password: string) {
   try {
     const result = await this.afAuth.signInWithEmailAndPassword(email, password);
     console.log('Ergebnis', result);
     // Wait for the getUserName() function to finish before proceeding
     await new Promise((resolve, reject) => {
       this.afAuth.authState.subscribe((user) => {
         if (user) {
           console.log("user is", user);
           resolve(user);
         } else {
           reject(new Error("User not found"));
         }
       });
     });
     await this.getUserName(result.user.uid); // Wait for this.getUserName() to finish
     this.SetUserData(result.user, this.displayName);
     this.router.navigate(['dashboard/' + result.user.uid]);
   } catch (error) {
     console.error("Sign-in failed:", error);
   }
 }


  async getUserName(id) {
    let userRef = doc(this.firestore, 'users', `${id}`);
    const docSnapshot = await getDoc(userRef);
    const user = docSnapshot.data();
    console.log('Data', user)
    this.displayName = user.displayName;
  }


  // Sign up with email/password
  SignUp(email: string, password: string, name) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user, name);
        console.log(result.user);

      })
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);

      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any, name) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: UserData = {
      uid: user.uid,
      email: user.email,
      displayName: name,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }
}
