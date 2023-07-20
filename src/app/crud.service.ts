import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  user = new User();

  constructor(public firestore: Firestore) { }

  saveUser() {
    const userRef = collection(this.firestore, 'user');
    addDoc(userRef, this.user.toJson())
      .then((result: any) => {
        console.log('user was saved', result);
      });
  }

  getUser(): Observable<User[]> {
    const userRef = collection(this.firestore, 'user');
    return collectionData(userRef, { idField: 'id' }) as Observable<User[]>;
  }

  getUserById(userId) {
    const userIdRef = doc(this.firestore, `user/${userId}`);
    return docData(userIdRef, { idField: 'id' }) as Observable<User[]>;

  }
}
