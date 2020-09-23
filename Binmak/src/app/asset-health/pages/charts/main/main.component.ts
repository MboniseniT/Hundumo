import { Component, OnInit } from '@angular/core';
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
  //selected: {startDate: Moment, endDate: Moment};
  dataTable: any;
  data: any;
  spectrumData:any;
  waterfallData:any;
  dateFrom:any;
  dateTo:any;
  assetId: any;
  deviceId: any;
  assetDetails: any;
  map = SensorDataMapper;
  preffixUrl: any;
  public loading = false;
  searchForm = {
    machineId:0,
    dateFrom: new Date('2020-06-22T13:18:33.427Z'),
    dateTo: new Date()
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
    this.searchForm.dateTo = new Date('2020-08-23T13:18:33.427Z');
    this.searchForm.dateFrom = new Date('2020-06-22T13:18:33.427Z');
    if(data.value.dateFrom!= null || data.value.dateFrom != undefined)
    this.searchForm.dateFrom = new Date(data.value.dateFrom);
    if(data.value.dateTo!= null || data.value.dateTo != undefined)
    this.searchForm.dateTo = new Date(data.value.dateTo);  
    this.getData(this.searchForm);
  }

  getData(data){
    this.request.post(data, this.preffixUrl).subscribe(result => {
      this.data = result;   
      this.assetId =this.data.machineName
      this.deviceId =this.data.deviceId
      this.assetDetails =this.data.assetName
    },error=>{
      console.log(error);     
    });
    this.request.post(data, PreffixUrl.MachineSpectrum).subscribe(result => {
      this.spectrumData = result;
    },error=>{    
      console.log(error);     
    });
    this.request.post(data, PreffixUrl.MachineWaterfall).subscribe(result => {
      this.waterfallData = result;
    },error=>{
      console.log(error);      
    });
  }
}
