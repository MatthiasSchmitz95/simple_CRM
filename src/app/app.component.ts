import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ChartService } from './services/chart.service';
import { DarkmodeService } from './services/darkmode.service';

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
      console.log('uid is',this.userId)
    }

   });
  
}
  title = 'simple_CRM';

  constructor(public authService: AuthService, public dm: DarkmodeService, public chart: ChartService) {}
  
}
