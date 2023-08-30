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
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255,0.7)',
              'rgba(255, 159, 64, 0.7)',
              'rgba(107, 71, 10,  0.7)',
              'rgba(188, 246, 255,0.7)',
              'rgba(89, 83, 163, 0.8)',
              'rgba(50, 241, 168, 0.5)',
              'rgba(81, 99, 233, 0.9)',
              'rgba(32, 136, 168, 0.8)',
              'rgba(243, 101, 15, 0.9)',
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
