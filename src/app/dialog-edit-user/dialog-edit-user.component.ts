import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { CrudService } from '../services/crud.service';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  user: User;
  loading = false;
  birthDate:Date;
  userId;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, public crud:CrudService, public firestore: Firestore, public authService:AuthService){}

  saveUser() {
    this.loading = true;
    const userIdRef = doc(this.firestore, `users/${this.authService.userData.uid}/customer/${this.userId}`);
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
