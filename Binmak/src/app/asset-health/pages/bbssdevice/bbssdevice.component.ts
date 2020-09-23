import { Component, OnChanges } from '@angular/core';
import { ActionType } from '../../enums/action-type.enum';
import { AssetHealthService } from 'src/app/services/asset-health.service';
import { PreffixUrl } from '../../enums/preffix-url.enum';
import { BbssdeviceMapper } from '../../models/bbssdevice-mapper';

@Component({
  selector: 'app-bbssdevice',
  templateUrl: './bbssdevice.component.html',
  styleUrls: ['./bbssdevice.component.scss']
})
export class BBSSDeviceComponent implements OnChanges {
  dataTable: any;  
  data: any;  
  map = BbssdeviceMapper;
  preffixUrl: any;
  input=BbssdeviceMapper;
  visible = false;
  title:string;
  actionType:ActionType;
  constructor(private request: AssetHealthService) { 
    this.preffixUrl = PreffixUrl.BBSSDevice;
    this.request.getAll(this.preffixUrl).subscribe(result => {
      this.request.getAll(PreffixUrl.Application).subscribe(applicationResult => {
        this.request.getAll(PreffixUrl.BinmakTechnology).subscribe(binmakTechnologyResult => {
          this.dataTable = result.items;
          this.map.applicationId.source = applicationResult.items;
          this.map.binmakTechnologyId.source = binmakTechnologyResult.items;
        }, error => {
          this.dataTable = [];
         // this.message.error(error.error);
          //this.isSpinning=false;
        });
      }, error => {
        this.dataTable = [];
       // this.message.error(error.error);
        //this.isSpinning=false;
      });
    }, error => {
      this.dataTable = [];
     // this.message.error(error.error);
      //this.isSpinning=false;
    });
  }

  ngOnChanges (): void {
  }

  tableResult(data){
    if(data.ActionType===ActionType.delete){
      this.dataTable = data.Info;
      this.actionType= ActionType.delete;
    }
    if(data.ActionType===ActionType.edit){
      this.title='Update';
      this.input = data.Info;
      this.actionType= ActionType.edit;
      this.visible = true;
    }   
  }

  open(){
    this.title='Add';
    this.actionType= ActionType.add;
    this.visible = true;
  }

  result(data){
    this.visible = data.success;
    this.dataTable = data.data;  
  }
}
