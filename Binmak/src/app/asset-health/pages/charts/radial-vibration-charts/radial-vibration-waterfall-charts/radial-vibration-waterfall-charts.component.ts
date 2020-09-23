import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radial-vibration-waterfall-charts',
  templateUrl: './radial-vibration-waterfall-charts.component.html',
  styleUrls: ['./radial-vibration-waterfall-charts.component.scss']
})
export class RadialVibrationWaterfallChartsComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
