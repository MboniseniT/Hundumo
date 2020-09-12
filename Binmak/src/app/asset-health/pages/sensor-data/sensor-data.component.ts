import { Component, OnInit, OnChanges } from '@angular/core';
import { SensorDataMapper } from '../../models/sensor-data-mapper';
import { ActionType } from '../../enums/action-type.enum';
import { AssetHealthService } from 'src/app/services/asset-health.service';
import { PreffixUrl } from '../../enums/preffix-url.enum';

@Component({
  selector: 'app-sensor-data',
  templateUrl: './sensor-data.component.html',
  styleUrls: ['./sensor-data.component.scss']
})
export class SensorDataComponent implements OnChanges {
  dataTable: any;  
  data: any;  
  map = SensorDataMapper;
  preffixUrl: any;
  input=SensorDataMapper;
  visible = false;
  title:string;
  actionType:ActionType;
  constructor(private request: AssetHealthService) { 
    this.preffixUrl = PreffixUrl.SensorData;
    this.request.getAll(this.preffixUrl).subscribe(result => {
      this.request.getAll(PreffixUrl.Machine).subscribe(machineResult => {
        this.request.getAll(PreffixUrl.SensorCondtion).subscribe(sensorConditionResult => {
          this.dataTable = result.items;
          this.map.machineId.source = machineResult.items;
          this.map.conditionId.source = sensorConditionResult.items;
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
