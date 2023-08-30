import { Component } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { AuthService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-dialog-edit-contract',
  templateUrl: './dialog-edit-contract.component.html',
  styleUrls: ['./dialog-edit-contract.component.scss']
})
export class DialogEditContractComponent {

  user: User;
  loading = false;
  userId;
  newContract = {};
  customerId;
  name;
  income = 0;
  expense = 0;

  constructor(public dialogRef: MatDialogRef<DialogEditContractComponent>, public crud: CrudService, public firestore: Firestore, public authService:AuthService) { }

  closeDialog() {
    this.dialogRef.close();
  }

  pushContract(){

  }

  deleteContract(){
    
  }

}
