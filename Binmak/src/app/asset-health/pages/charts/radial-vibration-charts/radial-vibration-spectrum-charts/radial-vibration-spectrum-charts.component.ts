import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radial-vibration-spectrum-charts',
  templateUrl: './radial-vibration-spectrum-charts.component.html',
  styleUrls: ['./radial-vibration-spectrum-charts.component.scss']
})
export class RadialVibrationSpectrumChartsComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
