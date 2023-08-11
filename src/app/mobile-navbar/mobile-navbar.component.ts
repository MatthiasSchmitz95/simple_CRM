import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss']
})
export class MobileNavbarComponent implements OnInit {
  userId;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = this.authService.userData.uid;    
        console.log('uid is',this.userId)
      }
  
     });
    
  }

  select(id){
    this.deleteSelection()
    document.getElementById(id).classList.add('teal');
  }

  deleteSelection(){
    document.getElementById('account').classList.remove('teal');
    document.getElementById('user').classList.remove('teal');
    document.getElementById('dashboard').classList.remove('teal');

  }

}
