import { Component, inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { CrudService } from '../services/crud.service';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { UserData } from '../services/user-data';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: Date;
  loading = false;
  userData: any;
  constructor(public dialog: MatDialog, public crud: CrudService, public firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>, public authService: AuthService) {
  }

  convertDate() {
    this.user.birthDate = this.birthDate.getTime();
  }

  saveUser() {
    this.loading = true;
    if (this.user.birthDate != '') {
      this.convertDate();
    }
    const userRef = collection(this.firestore, `users/${this.authService.userData.uid}/customer`);
    addDoc(userRef, this.user.toJson())
      .then((result: any) => {
        this.loading = false;
        console.log('user was saved', result, this.authService.userData.uid);
        this.closeDialog();
      });

  }

  closeDialog() {
    this.dialogRef.close();
  }
}




