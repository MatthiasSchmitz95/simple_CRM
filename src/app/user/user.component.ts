import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { AuthService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { SearchServiceService } from '../services/search-service.service';
import { DarkmodeService } from '../services/darkmode.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  loadedUser = [];
  userData: any;
  userId;


  constructor(public dialog: MatDialog, private crud: CrudService, public authService: AuthService, public search:SearchServiceService,public dm:DarkmodeService) {

  }

 ngOnInit() {
    this.authService.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = this.authService.userData.uid; 
        this.crud.getUser()
        .subscribe((result: User[]) => {
          this.loadedUser = result;
          console.log('customer data',result,user);
        });

      } 
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);

  }


}
