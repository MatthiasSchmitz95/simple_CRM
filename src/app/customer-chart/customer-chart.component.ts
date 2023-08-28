import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Chart, registerables } from 'chart.js';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { CrudService } from '../services/crud.service';
import { AuthService } from '../services/auth.service';
import { DarkmodeService } from '../services/darkmode.service';
import { ChartService } from '../services/chart.service';
Chart.register(...registerables);

@Component({
  selector: 'app-customer-chart',
  templateUrl: './customer-chart.component.html',
  styleUrls: ['./customer-chart.component.scss']
})
export class CustomerChartComponent {
  userCount;
  user = new User()
  customers$: Observable<any[]>;
  cityList = [];
  cityData = [];


  constructor(public crud: CrudService, public firestore: Firestore, public authService: AuthService, public dm: DarkmodeService, public chart: ChartService) {

  }
  @ViewChild('myChartCanvas') myChartCanvas!: ElementRef<HTMLCanvasElement>;
  ngAfterViewInit() {
    const ctx = this.myChartCanvas.nativeElement.getContext('2d');

    this.authService.afAuth.authState.subscribe((user) => {
      if (user) {
        this.getCityNames(user.uid);
        this.chart.setChartData(this.cityList, this.cityData);
      }
    });
  }



  async getCityNames(useruid) {
    const cityRef = collection(this.firestore, `users/${useruid}/customer`);
    const querySnapshot = await getDocs(cityRef);
    // Create an array to store the countCity promises
    const countPromises = [];

    querySnapshot.forEach((doc) => {
      const city = doc.data().city;
      if (!this.cityList.includes(city)) {
        this.cityList.push(city);
        // Push the promise returned by countCity into the array
        countPromises.push(this.countCity(useruid, city));
      }
    });
    // Await all the countCity promises
    await Promise.all(countPromises);

    const ctx = this.myChartCanvas.nativeElement.getContext('2d');
    this.chart.createChart(ctx)

  }

  async countCity(useruid, city) {
    const cityRef = collection(this.firestore, `users/${useruid}/customer`);
    const q = query(cityRef, where("city", "==", city));
    const querySnapshot = await getDocs(q);
    this.cityData.push(querySnapshot.size);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log('suche ist', doc.id, " => ", doc.data());
    });
  }

}