import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Chart, registerables } from 'chart.js';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { CrudService } from '../services/crud.service';
import { AuthService } from '../services/auth.service';
import { DarkmodeService } from '../services/darkmode.service';
Chart.register(...registerables);

@Component({
  selector: 'app-customer-chart',
  templateUrl: './customer-chart.component.html',
  styleUrls: ['./customer-chart.component.scss']
})
export class CustomerChartComponent  {
  userCount;
  user = new User()
  customers$: Observable<any[]>;
  cityList = [];
  cityData =[];
  myChart;

  constructor(public crud: CrudService, public firestore: Firestore, public authService: AuthService, public dm:DarkmodeService) {

  }
  ngOnInit() {
    this.authService.afAuth.authState.subscribe((user) => {
      if (user) {
        this.getCityNames(user.uid);
      }
    });
  }


  async getCityNames(useruid){
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

    
    this.createChart()
  }

  async countCity(useruid,city) {
    const cityRef = collection(this.firestore, `users/${useruid}/customer`);
    const q = query(cityRef, where("city", "==", city));
    const querySnapshot = await getDocs(q);
   
    this.cityData.push(querySnapshot.size);
    
    ;
    
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
     // console.log('suche ist', doc.id, " => ", doc.data());
    });
  }
  @ViewChild('myChartCanvas') myChartCanvas!: ElementRef<HTMLCanvasElement>;


  createChart() {
    const ctx = this.myChartCanvas.nativeElement.getContext('2d');
    if (ctx) {
    this.myChart =  new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.cityList,
          datasets: [{
            label: 'customers',
            data: this.cityData,
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(107, 71, 10,1)',
              'rgba(188, 246, 255,1)'
            ],
            borderColor: [
              'rgba(0, 0, 0, 1)', // This is where the error is pointing to
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              display: false
            }
          },
          plugins: {
            legend: {
              labels: {
                color: this.dm.isChecked ? 'white' : 'black'
              }
            }
          }
        }
      });
      this.myChart.update();
      console.log('chart updated');
      
    }
  }
  


}