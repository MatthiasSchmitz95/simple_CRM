import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ChartService } from './services/chart.service';
import { DarkmodeService } from './services/darkmode.service';
import { CrudService } from './services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userId;
  isChecked;
  

  ngOnInit(): void {
    this.authService.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = this.authService.userData.uid;
        this.crud.userId =this.userId;
        console.log(this.authService.isLoggedIn,'logged!');
        
      }

    });

  }
  title = 'simple_CRM';

  constructor(public authService: AuthService, public dm: DarkmodeService, public chart: ChartService,public crud:CrudService) { }

  clickedRider(id) {
    this.removeStyle();
    if (this.dm.isChecked) {
      document.getElementById(id).classList.add('clicked-dm');
    }
    else
    document.getElementById(id).classList.add('clicked');
  }

  removeStyle() {
    document.getElementById('dashboard').classList.remove('clicked');
    document.getElementById('customer').classList.remove('clicked');
    document.getElementById('profile').classList.remove('clicked');
    document.getElementById('imprint').classList.remove('clicked');
    document.getElementById('policy').classList.remove('clicked');

    document.getElementById('dashboard').classList.remove('clicked-dm');
    document.getElementById('customer').classList.remove('clicked-dm');
    document.getElementById('profile').classList.remove('clicked-dm');
    document.getElementById('imprint').classList.remove('clicked-dm');
    document.getElementById('policy').classList.remove('clicked-dm');

  }

}
