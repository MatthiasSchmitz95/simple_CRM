import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, QuerySnapshot, addDoc, collection, collectionData, deleteDoc, doc, docData, getCountFromServer, setDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  user = new User();
  userData: any;
  customerId;
  existingContracts = [];

  constructor(public firestore: Firestore, public authService: AuthService, public route:ActivatedRoute) { }

  addUser(user){
    const userInstance = collection(this.firestore, 'user')
    addDoc(userInstance, user.toJson())
    .then(()=> {
      console.log("User saved");
    })
    .catch((e)=>{
      console.log(e);
      
    })
  }

  saveUser() {
    const userRef = collection(this.firestore, `users/${this.authService.userData.uid}/customer`);
    addDoc(userRef, this.user.toJson())
      .then((result: any) => {
        console.log(this.authService.userData.uid, result);
      });
  }

  getUser(): Observable<User[]> {
    const userRef = this.getSubCollectionRef('users', 'customer', this.authService.userData.uid);
    return collectionData(userRef, { idField: 'id' }) as Observable<User[]>;
  }

  getCollectionRef(collectionName: string){
    return collection(this.firestore, collectionName);
  }

  getSubCollectionRef(collectionName: string, subCollectionName, collectionDocId:string){
    return collection(this.firestore, collectionName, `${collectionDocId}/${subCollectionName}`);
  }
  

  getUserById(userId) {
    const userIdRef = doc(this.firestore, `users/${this.authService.userData.uid}/customer/${userId}`);
    return docData(userIdRef, { idField: 'id' }) as Observable<User[]>;
  }

  updateUserById(userId) {
    const userIdRef = doc(this.firestore, 'users', `${this.authService.userData.uid}/customer/${userId}`);
    return updateDoc(userIdRef, this.user.toJson())

  }

  updateCustomerNotes(userId,note) {
    const userIdRef = doc(this.firestore, 'users', `${this.authService.userData.uid}/customer/${userId}`);
    return updateDoc(userIdRef, {notes:note})

  }

  updateCustomerContract(userId,contract) {
    const userIdRef = doc(this.firestore, 'users', `${this.authService.userData.uid}/customer/${userId}`);
    return updateDoc(userIdRef, {contracts:contract})

  }
  setCustomerContract(userId,contract) {
    const userIdRef = doc(this.firestore, 'users', `${this.authService.userData.uid}/customer/${userId}`);
    return setDoc(userIdRef, contract)

  }

  deleteUser(Id) {
    const userIdRef = doc(this.firestore, `users/${this.authService.userData.uid}/customer/${Id}`);
    return deleteDoc(userIdRef);
  }

  async countCollection() {
    const coll = collection(this.firestore, 'user');
    const snapshot = await getCountFromServer(coll);
    console.log('count: ', snapshot.data().count);

  }

}
