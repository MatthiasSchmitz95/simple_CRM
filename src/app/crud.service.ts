import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class CrudService {


  constructor(private firestore:Firestore) { }

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
}
