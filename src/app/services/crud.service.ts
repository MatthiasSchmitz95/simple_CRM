import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, QuerySnapshot, addDoc, collection, collectionData, deleteDoc, doc, docData, getCountFromServer, setDoc, updateDoc } from '@angular/fire/firestore';
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

  updateUserById(userId) {
    const userIdRef = doc(this.firestore, 'user', `${userId}`);
    return updateDoc(userIdRef, this.user.toJson())

  }

  deleteUser(userId) {
    const userIdRef = doc(this.firestore, `user/${userId}`);
    return deleteDoc(userIdRef);
  }

  async countCollection() {
    const coll = collection(this.firestore, 'user');
    const snapshot = await getCountFromServer(coll);
    console.log('count: ', snapshot.data().count);

  }

}
