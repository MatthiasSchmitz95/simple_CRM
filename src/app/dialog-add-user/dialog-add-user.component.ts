import { Component, inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { CrudService } from '../services/crud.service';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { UserData } from '../../models/user-data';
import { Timestamp } from 'firebase/firestore';






@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate;
  birthDay;
  loading = false;
  userData: any;
  constructor(public dialog: MatDialog, public crud: CrudService, public firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>, public authService: AuthService) {
  }

  convertDate() {
    this.birthDay = this.user.birthDate.getTime();  
    const month = this.user.birthDate.getMonth() + 1;
    const day = this.user.birthDate.getDate();
    const year = this.user.birthDate.getFullYear();
    this.birthDay = `${month}/${day}/${year}`;
  }

  saveUser() {
    this.loading = true;
    console.log(this.user.birthDate);
    
    //if (this.user.birthDate != '') {
    //  this.convertDate();
    //}
    const userRef = collection(this.firestore, `users/${this.authService.userData.uid}/customer`);
    addDoc(userRef, this.user.toJson())
      .then(() => {
        this.loading = false;
        this.closeDialog();
      });

  }

  closeDialog() {
    this.dialogRef.close();
  }
}




