import { Component, inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { CrudService } from '../services/crud.service';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { UserData } from '../../models/user-data';
import { Timestamp } from 'firebase/firestore';
import { DarkmodeService } from '../services/darkmode.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';






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
  addCustomer:FormGroup;
  constructor(public dialog: MatDialog, public crud: CrudService, public firestore: Firestore,
     public dialogRef: MatDialogRef<DialogAddUserComponent>, public authService: AuthService,
     public dm:DarkmodeService, public fb:FormBuilder) {

      this.addCustomer = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: [''],
        born: [''],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        street: [''],
        zip: [''],
        city: [''],
      });
      
  }

  convertDate() {
    this.birthDay = this.user.birthDate.getTime();  
    const month = this.user.birthDate.getMonth() + 1;
    const day = this.user.birthDate.getDate();
    const year = this.user.birthDate.getFullYear();
    this.birthDay = `${month}/${day}/${year}`;
  }

  saveUser() {
    const user = {
      firstName: this.addCustomer.get('firstName').value,
      lastName: this.addCustomer.get('lastName').value,
      birthDate: this.addCustomer.get('born').value,
      street: this.addCustomer.get('street').value,
      zipCode: this.addCustomer.get('zip').value,
      city: this.addCustomer.get('city').value,
      email: this.addCustomer.get('email').value,
      phone: this.addCustomer.get('phone').value,
      gender: this.addCustomer.get('gender').value,
      // other fields...
    };
    this.loading = true;
    const userRef = collection(this.firestore, `users/${this.authService.userData.uid}/customer`);
    addDoc(userRef, user)
      .then(() => {
        this.loading = false;
        this.closeDialog();
      });

  }

  onSubmit(){

  }

  closeDialog() {
    this.dialogRef.close();
  }
}




