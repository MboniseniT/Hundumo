import { Input, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-radial-vibration-charts',
  templateUrl: './radial-vibration-charts.component.html',
  styleUrls: ['./radial-vibration-charts.component.scss']
})
export class RadialVibrationChartsComponent implements OnChanges {
  options: any;
  @Input() data: any;
  constructor() { 
    
  }

  ngOnChanges(): void {    
    this.options = {

      title: {
        text: 'Radial Vibration Of Machine By Date'
      },

      subtitle: {
        text: 'Source: Binmak.com'
      },

      yAxis: {
        title: {
          text: 'Radial Vibration'
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
        name: 'Radial vibration',
        data: this.data.map(a=>a.radialRMS)
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
    Highcharts.chart('radialContainer', this.options);
  }
}
