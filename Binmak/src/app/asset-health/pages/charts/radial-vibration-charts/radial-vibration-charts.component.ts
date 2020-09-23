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
        categories: this.data.machineStatistics.map(a=> new Date(a.timeStamp *1000)),
        
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
        data: this.data.machineStatistics.map(a=>a.radialRMS),
        color:'#00457d'
      }, 
      {
        name: 'Alert',
        data: this.data.machineStatistics.map(a=>a.rmsAlert),
        color:'#ff0000',
        dashStyle:'Dash'     
      },
      {
        name: 'Alarm',
        data: this.data.machineStatistics.map(a=>a.rmsAlarm), 
        color:'#ffa500',
        dashStyle:'Dash'     
      },
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
