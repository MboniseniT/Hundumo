import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMyOptions } from 'ng-uikit-pro-standard/public_api';
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
  dateFrom:any;
  dateTo:any;
  assetId: any;
  deviceId: any;
  assetDetails: any;
  map = SensorDataMapper;
  preffixUrl: any;
  searchForm = {
    machineId:0,
    dateFrom:new Date('0001-01-01T00:00:00Z'),
    dateTo:new Date('2100-01-01Z00:00:00:000')
  }
  constructor(private request: AssetHealthService, private route: ActivatedRoute) {
    this.preffixUrl = PreffixUrl.SensorDataMachine;
    this.route.params.subscribe(params => {
      this.searchForm.machineId =params['id']
      this.getData(this.searchForm);
    });
  }
  ngOnInit(): void {
  }

  public myDatePickerOptions: IMyOptions = {
    // Your options
    };

  search(data){
    this.searchForm.dateTo = new Date('2100-01-01Z00:00:00:000');
    this.searchForm.dateFrom = new Date('0001-01-01T00:00:00Z');
    if(data.value.dateFrom!= null || data.value.dateFrom != undefined)
    this.searchForm.dateFrom = new Date(data.value.dateFrom);
    if(data.value.dateTo!= null || data.value.dateTo != undefined)
    this.searchForm.dateTo = new Date(data.value.dateTo);  
    this.getData(this.searchForm);
  }

  getData(data){
    this.request.post(data, this.preffixUrl).subscribe(result => {
      this.data = result;
      this.assetId =this.data[0]?.machineName
      this.deviceId =this.data[0]?.deviceId
      this.assetDetails =this.data[0]?.assetName
    })
  }
}
