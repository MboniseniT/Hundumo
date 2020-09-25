import { Input } from '@angular/core';
import { Component, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-skin-temperature-charts',
  templateUrl: './skin-temperature-charts.component.html',
  styleUrls: ['./skin-temperature-charts.component.scss']
})
export class SkinTemperatureChartsComponent implements OnChanges {
  options: any;
  @Input() data: any;
  constructor() { 
    
  }

  ngOnChanges(): void {    
    this.options = {

      title: {
        text: 'Skin Temperature Of Machine By Date'
      },

      subtitle: {
        text: 'Source: Binmak.com'
      },

      yAxis: {
        title: {
          text: 'Skin Temperature'
        }
      },

      xAxis: {
        categories: this.data.machineStatistics.map(a=>new Date(a.timeStamp)),
        
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
        name: 'Skin Temperature',
        data: this.data.machineStatistics.map(a=>a.temperature),
        color:'#00457d'
      }, 
      {
        name: 'Alert',
        data: this.data.machineStatistics.map(a=>a.rmsAlert),
        color:'#ffa500',
        dashStyle:'Dash'     
      },
      {
        name: 'Alarm',
        data: this.data.machineStatistics.map(a=>a.rmsAlarm), 
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
    Highcharts.chart('skinTemperatureContainer', this.options);
  }
}
