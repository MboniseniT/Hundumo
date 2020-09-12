import { Component, OnInit, OnChanges } from '@angular/core';
import { MachineNotificationSettingMapper } from '../../models/machine-notification-setting-mapper';
import { ActionType } from '../../enums/action-type.enum';
import { AssetHealthService } from 'src/app/services/asset-health.service';
import { PreffixUrl } from '../../enums/preffix-url.enum';

@Component({
  selector: 'app-machine-notification-setting',
  templateUrl: './machine-notification-setting.component.html',
  styleUrls: ['./machine-notification-setting.component.scss']
})
export class MachineNotificationSettingComponent implements OnChanges {
  dataTable: any;  
  data: any;  
  map = MachineNotificationSettingMapper;
  preffixUrl: any;
  input=MachineNotificationSettingMapper;
  visible = false;
  title:string;
  actionType:ActionType;
  constructor(private request: AssetHealthService) { 
    this.preffixUrl = PreffixUrl.MachineNotificationSetting;
    this.request.getAll(this.preffixUrl).subscribe(result => {
      this.request.getAll(PreffixUrl.Machine).subscribe(machineResult => {
        this.dataTable = result.items;
        this.map.machineId = machineResult;

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
    //this.dataModal.show();
    this.title='Add';
    this.actionType= ActionType.add;
    this.visible = true;
  }

  result(data){
    this.visible = data.success;
    this.dataTable = data.data;  
  }
}
