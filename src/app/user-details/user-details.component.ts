import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { Firestore, deleteDoc, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']

})
export class UserDetailsComponent implements OnInit {

  userId = '';
  user = new User();

  constructor(private route: ActivatedRoute, private crud: CrudService, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get(':id');
      console.log('ID is', this.userId);
      this.getUserById(this.userId);
    })
  }


  getUserById(userId) {
    const userArr = this.crud.getUserById(userId);
    userArr.subscribe((user) => {
      this.user = new User(user);
      console.log(this.user);
    })

  }

  openAddressDialog() {

  }

  openEdit() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userId = this.userId;
  }

  openEditUser() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userId = this.userId;

  }

  deleteUser() {
    this.crud.deleteUser(this.userId);

  }
}
