import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tangential-vibration-spectrum-charts',
  templateUrl: './tangential-vibration-spectrum-charts.component.html',
  styleUrls: ['./tangential-vibration-spectrum-charts.component.scss']
})
export class TangentialVibrationSpectrumChartsComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
