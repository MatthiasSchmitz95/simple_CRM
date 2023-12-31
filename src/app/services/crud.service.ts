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
  userId;
  userData: any;
  customerId;
  existingContracts = [];

  constructor(public firestore: Firestore, public authService: AuthService, public route: ActivatedRoute) { }

  addUser(user) {
    const userInstance = collection(this.firestore, 'user')
    addDoc(userInstance, user.toJson())
      .then(() => {
        ("User saved");
      })
      .catch((e) => {
        (e);

      })
  }

  saveUser() {
    const userRef = collection(this.firestore, `users/${this.authService.userData.uid}/customer`);
    addDoc(userRef, this.user.toJson())
      .then((result: any) => {
        (this.authService.userData.uid, result);
      });
  }

  saveNews(newNews) {
    const newsRef = doc(this.firestore, 'news','OHVkJs8lyypaDo5TsJW6');
    updateDoc(newsRef, {news: newNews})
  }

  getNews(){
    const newsRef = doc(this.firestore,'news','OHVkJs8lyypaDo5TsJW6');
    return docData(newsRef, {idField: 'id'}) as Observable<any>;
  }

  getUser(): Observable<User[]> {
    const userRef = this.getSubCollectionRef('users', 'customer', this.authService.userData.uid);
    return collectionData(userRef, { idField: 'id' }) as Observable<User[]>;
  }

  getCollectionRef(collectionName: string) {
    return collection(this.firestore, collectionName);
  }

  pushContract(contract){
    this.existingContracts.push(contract);}

  getSubCollectionRef(collectionName: string, subCollectionName, collectionDocId: string) {
    return collection(this.firestore, collectionName, `${collectionDocId}/${subCollectionName}`);
  }


  getUserById(userId) {
    const userIdRef = doc(this.firestore, `users/${this.userId}/customer/${userId}`);    
    return docData(userIdRef, { idField: 'id' }) as Observable<User[]>;
  }

  getCustomerById(userId,customerId) {
    const userIdRef = doc(this.firestore, `users/${userId}/customer/${customerId}`);    
    return docData(userIdRef, { idField: 'id' }) as Observable<User[]>;
  }

  updateUserById(userId) {
    const userIdRef = doc(this.firestore, 'users', `${this.authService.userData.uid}/customer/${userId}`);
    return updateDoc(userIdRef, this.user.toJson())

  }

  updateCustomerNotes(userId, note) {
    const userIdRef = doc(this.firestore, 'users', `${this.authService.userData.uid}/customer/${userId}`);
    return updateDoc(userIdRef, { notes: note })

  }

  updateCustomerContract(userId, contract) {
    const userIdRef = doc(this.firestore, 'users', `${this.authService.userData.uid}/customer/${userId}`);
    return updateDoc(userIdRef, { contracts: contract })

  }
  setCustomerContract(userId, contract) {
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
  }

}
