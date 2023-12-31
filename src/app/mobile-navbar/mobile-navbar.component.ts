import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ChartService } from '../services/chart.service';
import { DarkmodeService } from '../services/darkmode.service';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss']
})
export class MobileNavbarComponent implements OnInit {
  userId;
  constructor(public authService: AuthService, public dm:DarkmodeService, public chart: ChartService) {}

  ngOnInit(): void {
    this.authService.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = this.authService.userData.uid;    
      }});
  }



  select(id){
    this.deleteSelection()
    document.getElementById(id).classList.add('teal');
  }

  deleteSelection(){
    document.getElementById('account').classList.remove('teal');
    document.getElementById('user').classList.remove('teal');
    document.getElementById('dashboardm').classList.remove('teal');
    document.getElementById('more').classList.remove('teal');

  }

}
