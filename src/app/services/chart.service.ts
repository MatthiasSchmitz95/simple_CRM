import { ElementRef, Injectable, ViewChild, OnInit } from '@angular/core';
import { AnimationSpec, Chart, registerables } from 'chart.js';
import { DarkmodeService } from './darkmode.service';
Chart.register(...registerables);
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  myChart: any = null;
  cityList: string[] = [];
  cityData: number[] = [];
  kind = 'pie';
  y = false;


  constructor(public dm: DarkmodeService) {

  }


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
      this.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.cityList,
          datasets: [{
            barPercentage: 1,
            label: '',
            data: this.cityData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.4)',
              'rgba(54, 162, 235, 0.4)',
              'rgba(255, 206, 86, 0.4)',
              'rgba(75, 192, 192, 0.4)',
              'rgba(153, 102, 255,0.4)',
              'rgba(255, 159, 64, 0.4)',
              'rgba(107, 71, 10,  0.4)',
              'rgba(188, 246, 255,0.4)',
              'rgba(89, 83, 163,  0.4)',
              'rgba(50, 241, 168, 0.4)',
              'rgba(81, 99, 233,  0.4)',
              'rgba(32, 136, 168, 0.4)',
              'rgba(243, 101, 15, 0.4)',
            ],
            borderColor: [
              'rgba(0, 0, 0, 1)', // This is where the error is pointing to
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true, 
          maintainAspectRatio: false,
          transitions: {
            resize: {
              animation: {
                duration: 0, 
              },
            },
          },

          scales: {
            y: {
              display: true,
              beginAtZero: true, // Start the axis at 0
              ticks: {
                color: this.dm.isChecked ? 'white' : 'black',
                stepSize: 1, // Set the step size to 1
                precision: 0 // Optional: Set the number of decimal places to 0
              }
            },
            x: {
              ticks: {
                color: this.dm.isChecked ? 'white' : 'black', // Change X-axis label color to blue
              },
          },
          },
          plugins: {
            legend: {
              display: false,
              labels: {
                
              }
            }
          }

        }
      });


    }
  }



}
