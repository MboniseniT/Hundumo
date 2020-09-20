import { Input } from '@angular/core';
import { Component, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-axial-vibration-charts',
  templateUrl: './axial-vibration-charts.component.html',
  styleUrls: ['./axial-vibration-charts.component.scss']
})
export class AxialVibrationChartsComponent implements OnChanges {
  options: any;
  @Input() data: any;
  constructor() { 
    
  }

  ngOnChanges(): void {    
    this.options = {
      title: {
        text: 'Axial Vibration Of Machine By Date'
      },

      subtitle: {
        text: 'Source: Binmak.com'
      },

      yAxis: {
        title: {
          text: 'Machine Axial Vibration'
        }
      },

      xAxis: {
        categories: this.data.map(a=>a.regiDate),
        
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
        }
      },

      series: [{
        name: 'Axial vibration',
        data: this.data.map(a=>a.axialRMS)
      }, 
      // {
      //   name: 'Manufacturing',
      //   data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      // },
    ],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }

    };
    Highcharts.chart('axialContainer', this.options);
  }
}
