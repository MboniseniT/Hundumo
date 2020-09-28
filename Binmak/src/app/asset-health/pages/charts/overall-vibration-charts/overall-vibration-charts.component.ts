import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-overall-vibration-charts',
  templateUrl: './overall-vibration-charts.component.html',
  styleUrls: ['./overall-vibration-charts.component.scss']
})
export class OverallVibrationChartsComponent implements OnChanges {
  options: any;
  @Input() data: any;
  constructor() { 
    
  }

  ngOnChanges(): void {    
    this.options = {

      title: {
        text: 'Overall Vibration Of Machine By Date'
      },

      subtitle: {
        text: 'Source: Binmak.com'
      },

      yAxis: {
        title: {
          text: 'Machine Vibration'
        }
      },

      xAxis: {
        categories: this.data.map(a=>new Date(a.timeStamp)),
        
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
        name: 'Overall vibration',
        data: this.data.map(a=>a.overallRMS),
        color:'#00457d'
      }, 
      {
        name: 'Alert',
        data: this.data.map(a=>a.rmsAlert),
        color:'#ffa500',
        dashStyle:'Dash'     
      },
      {
        name: 'Alarm',
        data: this.data.map(a=>a.rmsAlarm), 
        color:'#ff0000',
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
    Highcharts.chart('overAllcontainer', this.options);
  }

}
