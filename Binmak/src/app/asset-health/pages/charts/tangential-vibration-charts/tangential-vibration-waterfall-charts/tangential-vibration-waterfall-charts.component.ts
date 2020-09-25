import { Input, OnChanges } from '@angular/core';
import { Component, } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts.src';
import highcharts3D from 'highcharts/highcharts-3d.src';
highcharts3D(Highcharts);

@Component({
  selector: 'app-tangential-vibration-waterfall-charts',
  templateUrl: './tangential-vibration-waterfall-charts.component.html',
  styleUrls: ['./tangential-vibration-waterfall-charts.component.scss']
})
export class TangentialVibrationWaterfallChartsComponent implements  OnChanges {
  @Input() data: any;
  options: any;
  constructor() { }

  ngOnChanges(): void {
    this.options = {      
      chart: {         
         type: 'scatter',
         marginBottom: 100,
         marginRight: 50,
         options3d: {
            enabled: true,
            alpha: 10,
            beta: 30,
            depth: 250,
            viewDistance: 5,
            frame:{
               bottom :{
                  size: 1,
                  color: 'rgba(0, 0, 0, 0.02)'
               },
               back :{
                  size: 1,
                  color: 'rgba(0, 0, 0, 0.04)'
               },
               side :{
                  size: 1,
                  color: 'rgba(0, 0, 0, 0.06)'
               }
            }
         }
      },         
      title : {
         text: 'Tangential Vibration Spectrum Waterfall'   
      },
      series : this.data.map(a=>a.yWaterfallSeries)
   };
    Highcharts.chart('tangentialWaterfallContainer', this.options);
  }

}