import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreffixUrl } from 'src/app/asset-health/enums/preffix-url.enum';
import { SensorDataMapper } from 'src/app/asset-health/models/sensor-data-mapper';
import { AssetHealthService } from 'src/app/services/asset-health.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  dataTable: any;
  data: any;
  map = SensorDataMapper;
  preffixUrl: any;
  constructor(private request: AssetHealthService, private route: ActivatedRoute) {
    this.preffixUrl = PreffixUrl.SensorDataMachine;
    this.route.params.subscribe(params => {
      this.request.get(params["id"], this.preffixUrl).subscribe(result => {
        this.data = result;
      })
    });
  }
  ngOnInit(): void {
  }

}
