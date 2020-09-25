import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts.src';

@Component({
  selector: 'app-radial-vibration-spectrum-charts',
  templateUrl: './radial-vibration-spectrum-charts.component.html',
  styleUrls: ['./radial-vibration-spectrum-charts.component.scss']
})
export class RadialVibrationSpectrumChartsComponent implements OnChanges {
  @Input() data: any;
  options: any;
  constructor() { }

  ngOnChanges(): void {
    this.options = {
      title: {
        text: 'Radial Vibration Frequency'
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
      tooltip: {
        formatter: function() {
            return '<b>Frequency Domain</b> <br/> Amplitude:<b>' + this.y + '</b> m/s/s<br/> Actual: <b>' + this.x*this.series.name+ '</b> Hz <br/>Normalised: <b>' + this.x + '</b> X';
        }
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
        name: this.data.revolutionPerMinute/60,
        data: this.data.zfft,
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
    Highcharts.chart('radialSpectrumContainer', this.options);
  }

}
