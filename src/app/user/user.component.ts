import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { AuthService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  loadedUser = [];
  userData: any;


  constructor(public dialog: MatDialog, private crud: CrudService, public authService: AuthService) {

  }

  async ngOnInit() {
    if (!this.authService.userData.uid) {
      // If the uid is not available, set the user data first
      await this.authService.SetUserData(this.user);
    }
    this.crud.getUser()
      .subscribe((result: User[]) => {
        this.loadedUser = result;
        console.log(result);
      })


  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);

  }


}
