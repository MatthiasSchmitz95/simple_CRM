import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { Firestore, collection, getCountFromServer } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userCount;
  constructor(public crud:CrudService,public  firestore: Firestore, public authService: AuthService){

  }
ngOnInit(){
this.countCollection();
}

async countCollection() {
  const coll = collection(this.firestore, `users/${this.authService.userData.uid}/customer`);
  const snapshot = await getCountFromServer(coll);
  this.userCount= snapshot.data().count;

}
}
