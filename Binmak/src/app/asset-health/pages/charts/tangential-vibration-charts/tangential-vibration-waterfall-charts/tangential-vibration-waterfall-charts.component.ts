import { Input, OnChanges } from '@angular/core';
import { Component, } from '@angular/core';

@Component({
  selector: 'app-tangential-vibration-waterfall-charts',
  templateUrl: './tangential-vibration-waterfall-charts.component.html',
  styleUrls: ['./tangential-vibration-waterfall-charts.component.scss']
})
export class TangentialVibrationWaterfallChartsComponent implements OnChanges {
  @Input() data: any;
  options: any;
  constructor() { }
  ngOnChanges(): void {
    
  }
}
