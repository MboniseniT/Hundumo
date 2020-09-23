import { Input } from '@angular/core';
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts.src';
import highcharts3D from 'highcharts/highcharts-3d.src';
import { OnChanges } from '@angular/core';
highcharts3D(Highcharts);

@Component({
  selector: 'app-axial-vibration-spectrum-charts',
  templateUrl: './axial-vibration-spectrum-charts.component.html',
  styleUrls: ['./axial-vibration-spectrum-charts.component.scss']
})
export class AxialVibrationSpectrumChartsComponent implements OnChanges {
  @Input() data: any;
  options: any;
  constructor() { }

  ngOnChanges(): void {
    this.options = {
      title: {
        text: 'Axial Vibration Frequency'
      },

      subtitle: {
        text: 'Source: Binmak.com'
      },

      yAxis: {
        title: {
          text: 'Acceleration'
        }
      },

      xAxis: {
        categories: this.data.modFreq,
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
        name: 'Frequency',
        data: this.data.xfft,
        color: '#00457d'
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
    Highcharts.chart('axialSpectrumContainer', this.options);
  }
}
