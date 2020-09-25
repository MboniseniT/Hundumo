import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts.src';
import highcharts3D from 'highcharts/highcharts-3d.src';
highcharts3D(Highcharts);


@Component({
  selector: 'app-axial-vibration-waterfall-charts',
  templateUrl: './axial-vibration-waterfall-charts.component.html',
  styleUrls: ['./axial-vibration-waterfall-charts.component.scss']
})
export class AxialVibrationWaterfallChartsComponent implements OnChanges {
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
         text: 'Axial Vibration Spectrum Waterfall'   
      },
      series : this.data.map(a=>a.xWaterfallSeries)
   };
    Highcharts.chart('axialWaterfallContainer', this.options);
  }

}
