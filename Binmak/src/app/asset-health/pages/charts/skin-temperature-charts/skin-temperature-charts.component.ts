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
        name: 'Skin Temperature',
        data: this.data.map(a=>a.temperature)
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
    Highcharts.chart('skinTemperatureContainer', this.options);
  }
}
