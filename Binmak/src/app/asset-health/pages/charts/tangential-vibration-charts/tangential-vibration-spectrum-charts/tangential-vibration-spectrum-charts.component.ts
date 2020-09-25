import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts.src';

@Component({
  selector: 'app-tangential-vibration-spectrum-charts',
  templateUrl: './tangential-vibration-spectrum-charts.component.html',
  styleUrls: ['./tangential-vibration-spectrum-charts.component.scss']
})
export class TangentialVibrationSpectrumChartsComponent implements OnChanges {
  @Input() data: any;
  options: any;
  constructor() { }

  ngOnChanges(): void {
    this.options = {
      title: {
        text: 'Tangential Vibration Frequency'
      },

      subtitle: {
        text: 'Source: Binmak.com'
      },

      yAxis: {
        title: {
          text: 'Acceleration'
        }
      },
      tooltip: {
        formatter: function() {
            return '<b>Frequency Domain</b> <br/> Amplitude:<b>' + this.y + '</b> m/s/s<br/> Actual: <b>' + this.x*this.series.name+ '</b> Hz <br/>Normalised: <b>' + this.x + '</b> X';
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
        name: this.data.revolutionPerMinute/60,
        data: this.data.yfft,
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
    Highcharts.chart('tangentialSpectrumContainer', this.options);
  }

}
