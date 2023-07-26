import { Component, OnInit } from '@angular/core';
import { docData, Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { CrudService } from '../crud.service';
import { AuthService } from '../services/auth.service';
import { UserData } from '../services/user-data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: UserData;
  user = new User();
  constructor(public router: Router,public authService: AuthService, public crud: CrudService, public firestore: Firestore) {

  }
 async  ngOnInit() {
    if (!this.authService.userData.uid) {
      // If the uid is not available, set the user data first
      await this.authService.SetUserData(this.user);
    }
    this.getUserById()
      .subscribe((result) => {
        console.log(result);
        this.userData = result; 
        console.log(this.userData['email'])
      })
  }

  getUserById() {
    const userIdRef = doc(this.firestore, `users/${this.authService.userData.uid}`);
    return docData(userIdRef, { idField: 'id' }) as Observable<UserData>;
  }

  deleteUser() {
    const userIdRef = doc(this.firestore, `users/${this.authService.userData.uid}`);
    deleteDoc(userIdRef);
    this.router.navigateByUrl('/login');
  }
}
