import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, QuerySnapshot, addDoc, collection, collectionData, deleteDoc, doc, docData, getCountFromServer, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  user = new User();
  userData: any;

  constructor(public firestore: Firestore, public authService: AuthService) { }

  saveUser() {
    const userRef = collection(this.firestore, `users/${this.authService.userData.uid}/customer`);
    addDoc(userRef, this.user.toJson())
      .then((result: any) => {
        console.log(this.authService.userData.uid, result);
      });
  }

  getUser(): Observable<User[]> {
    const userRef = collection(this.firestore, 'users', `${this.authService.userData.uid}/customer`);
    return collectionData(userRef, { idField: 'id' }) as Observable<User[]>;
  }

  getUserById(userId) {
    const userIdRef = doc(this.firestore, `users/${this.authService.userData.uid}/customer/${userId}`);
    return docData(userIdRef, { idField: 'id' }) as Observable<User[]>;

  }

  updateUserById(userId) {
    const userIdRef = doc(this.firestore, 'users', `${this.authService.userData.uid}/customer/${userId}`);
    return updateDoc(userIdRef, this.user.toJson())

  }

  deleteUser(userId) {
    const userIdRef = doc(this.firestore, `users/${this.authService.userData.uid}/customer/${userId}`);
    return deleteDoc(userIdRef);
  }

  async countCollection() {
    const coll = collection(this.firestore, 'user');
    const snapshot = await getCountFromServer(coll);
    console.log('count: ', snapshot.data().count);

  }

}
