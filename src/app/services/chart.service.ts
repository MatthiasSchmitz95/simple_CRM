import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { AnimationSpec, Chart, registerables } from 'chart.js';
import { DarkmodeService } from './darkmode.service';
Chart.register(...registerables);
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  myChart: any = null;
  cityList: string[] = []; // Store the current cityList
  cityData: number[] = []; // Store the current cityData

  

  constructor(public dm:DarkmodeService) { }

  setChartData(cityList: string[], cityData: number[]) {
    this.cityList = cityList;
    this.cityData = cityData;
  }



  recreateChart() {
    if (this.myChart) {
      const ctx = this.myChart.canvas.getContext('2d');
      if (ctx) {
        this.myChart.destroy();
        this.createChart(ctx);
      }
    }
  }

   createChart(ctx: CanvasRenderingContext2D) {
    if (this.myChart) {
      this.myChart.destroy();
    }
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

      
    }
  }
  


}
