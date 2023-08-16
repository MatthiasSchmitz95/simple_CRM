import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { Firestore, collection, deleteDoc, docData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { AuthService } from '../services/auth.service';
import { DarkmodeService } from '../services/darkmode.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']

})
export class UserDetailsComponent implements OnInit {
  userId = '';
  user = new User();
  customerId;
  bDate;
  newNote = '';
  existingNotes = [];
  filledNotes = false;

  constructor(private route: ActivatedRoute, private crud: CrudService, public authService: AuthService, public dialog: MatDialog, public firestore: Firestore, public dm:DarkmodeService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.customerId = paramMap.get('id');
      this.getUserById(this.customerId);
    })
  }

  getUserById(customerId) {
    const userArr = this.crud.getUserById(customerId);
    userArr.subscribe((user) => {
      this.user = new User(user);
      this.existingNotes = this.user.notes;
      this.checkForNotes();

      if (this.user.birthDate != '') {
        this.user.birthDate = this.user.birthDate.toDate();
        this.convertDate();
      }

    })
  }

  checkForNotes() {
    if (this.existingNotes.length > 0) {
      this.filledNotes = true;
    }
    else this.filledNotes = false;

  }

  deleteNote(index: number) {
    this.existingNotes.splice(index, 1);
    this.crud.updateCustomerNotes(this.customerId, this.existingNotes)
    this.checkForNotes();

  }

  pushNote() {
    this.existingNotes.push(this.newNote);
    this.crud.updateCustomerNotes(this.customerId, this.existingNotes);
    this.newNote='';
  }





  convertDate() {
    const month = this.user.birthDate.getMonth() + 1;
    const day = this.user.birthDate.getDate();
    const year = this.user.birthDate.getFullYear();
    this.bDate = `${month}/${day}/${year}`;
    console.log(this.bDate);

  }

  openAddressDialog() {

  }

  openEdit() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userId = this.customerId;
  }

  openEditUser() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userId = this.customerId;

  }

  deleteUser() {
    this.crud.deleteUser(this.customerId);

  }

  copyToClipboard(id) {
    // Get the text you want to copy
    const textToCopyElement: HTMLElement | null = document.getElementById(id);
    const textToCopy: string = textToCopyElement ? textToCopyElement.textContent ?? '' : '';

    // Create a temporary textarea element to copy the text
    const tempTextarea: HTMLTextAreaElement = document.createElement('textarea');
    tempTextarea.style.position = 'absolute';
    tempTextarea.style.left = '-9999px';
    document.body.appendChild(tempTextarea);
    tempTextarea.value = textToCopy;

    // Select the text
    tempTextarea.select();

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the temporary textarea element
    document.body.removeChild(tempTextarea);

    // Optionally, you can provide some user feedback or notify that the text has been copied
    alert('Text copied to clipboard: ' + textToCopy);
  }


}
