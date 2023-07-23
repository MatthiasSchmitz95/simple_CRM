import { Component } from '@angular/core';
import { Firestore, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user: User;
  loading = false;
  userId;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, public crud: CrudService, public firestore: Firestore) { }
  saveUser() {
    this.loading = true;
    const userIdRef = doc(this.firestore, 'user', `${this.userId}`);
    return updateDoc(userIdRef, this.user.toJson())
      .then(() => {
        this.loading = false;
        this.closeDialog();
      });

  }


  closeDialog() {
    this.dialogRef.close();
  }

}
