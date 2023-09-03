import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {
  isChecked;
  user:User[];

  constructor(public firestore:Firestore) { }


  turnDmOff() {
    this.isChecked = false;
  }

  changeRider() {
    if (this.isChecked) {
      const element = document.querySelector('.clicked');
      if (element) {
        element.classList.remove('clicked');

        // Add the 'clicked-dm' class
        element.classList.add('clicked-dm');
      }

    }
    if (!this.isChecked) {
      const element = document.querySelector('.clicked-dm');
      if (element) {
        element.classList.remove('clicked-dm');

        // Add the 'clicked-dm' class
        element.classList.add('clicked');
      }


    }
  }

}
