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
  maxDate: Date = new Date();
  birthDate;
  birthDay;
  loading = false;
  userData: any;
  addCustomer: FormGroup;
  constructor(public dialog: MatDialog, public crud: CrudService, public firestore: Firestore,
    public dialogRef: MatDialogRef<DialogAddUserComponent>, public authService: AuthService,
    public dm: DarkmodeService, public fb: FormBuilder) {

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

    this.loading = true;
    const userRef = collection(this.firestore, `users/${this.authService.userData.uid}/customer`);
    addDoc(userRef, this.user.toJson())
      .then(() => {
        this.loading = false;
        this.closeDialog();
      });

  }

  onSubmit() {
    debugger
    this.updateUserData();
    this.saveUser();
  }

  updateUserData() {
    this.user.firstName = this.addCustomer.get('firstName').value;
    this.user.lastName = this.addCustomer.get('lastName').value;
    this.user.birthDate = this.addCustomer.get('born').value;
    this.user.street = this.addCustomer.get('street').value;
    this.user.zipCode = this.addCustomer.get('zip').value;
    this.user.city = this.addCustomer.get('city').value;
    this.user.email = this.addCustomer.get('email').value;
    this.user.phone = this.addCustomer.get('phone').value;
    this.user.gender = this.addCustomer.get('gender').value;

  }

  closeDialog() {
    this.dialogRef.close();
  }
}




