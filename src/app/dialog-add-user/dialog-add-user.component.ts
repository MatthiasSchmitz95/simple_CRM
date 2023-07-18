import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

import { User } from 'src/models/user.class';
import { CrudService } from '../crud.service';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: Date;
  loading = false;

  constructor(public dialog: MatDialog, private crudService: CrudService, private firestore: Firestore){

 

  }

 saveUser(){
  this.loading = true;
    const userInstance = collection(this.firestore, 'user')
    addDoc(userInstance, this.user.toJson())
    .then(()=> {
      this.loading = false;
      console.log("User saved");
    })
    .catch((e)=>{
      console.log(e);
      
    })
  }
}


