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
  loading = false;
  lastDate:Date;
  searchForm = {
    machineId:0,
    dateFrom: new Date((new Date().getMonth()) + '/' + (new Date().getDate()) + '/' + (new Date().getFullYear())),
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
    this.searchForm.dateTo = new Date();
    this.searchForm.dateFrom = new Date((new Date().getMonth()-1) + '/' + (new Date().getDate()) + '/' + (new Date().getFullYear()));
    if(data.value.dateFrom!= null || data.value.dateFrom != undefined)
    this.searchForm.dateFrom = new Date(data.value.dateFrom);
    if(data.value.dateTo!= null || data.value.dateTo != undefined)
    this.searchForm.dateTo = new Date(data.value.dateTo);  
    this.getData(this.searchForm);
  }

  getData(data){
    this.loading = true;
    this.request.post(data, this.preffixUrl).subscribe(result => {
      this.data = result;   
      this.loading = false;
    },error=>{
      this.loading = false;   
      console.log(error);
      this.data = [];   
    });
    this.request.get(data.machineId,PreffixUrl.MachineDetail).subscribe(result => {   
      this.assetId =result.machineName
      this.deviceId =result.deviceId
      this.assetDetails =result.assetName
    },
    error=>{
      console.log(error);
      
    });

    this.request.getAll(PreffixUrl.SensorDataLastDate).subscribe(result => {
      this.lastDate = new Date(result)
    },
    error=>{
      console.log(error);
      
    });
    this.request.post(data, PreffixUrl.MachineSpectrum).subscribe(result => {
      this.spectrumData = result;
    },error=>{    
      console.log(error); 
      this.spectrumData = {
        xfft:[],
        yfft:[],
        zfft:[],
        modFreq:[]
      }    
    });
    this.request.post(data, PreffixUrl.MachineWaterfall).subscribe(result => {
      this.waterfallData = result;
    },error=>{
      console.log(error); 
      this.waterfallData = [];     
    });
  }
}
