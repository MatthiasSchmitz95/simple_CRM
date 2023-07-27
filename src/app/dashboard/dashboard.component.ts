import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { Firestore, collection, getCountFromServer } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userCount;
  user = new User()
  constructor(public crud:CrudService,public  firestore: Firestore, public authService: AuthService){

  }
ngOnInit(){
  this.authService.afAuth.authState.subscribe((user) => {
    if (user) {
      this.countCollection(user.uid);
    } 
  });

}

async countCollection(useruid) {
  const coll = collection(this.firestore, `users/${useruid}/customer`);
  const snapshot = await getCountFromServer(coll);
  this.userCount= snapshot.data().count;

}
}
