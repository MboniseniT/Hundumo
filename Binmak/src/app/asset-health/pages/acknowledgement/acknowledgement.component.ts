import { Component, OnInit, OnChanges } from '@angular/core';
import { AcknowledgementMapper } from '../../models/acknowledgement-mapper';
import { ActionType } from '../../enums/action-type.enum';
import { AssetHealthService } from 'src/app/services/asset-health.service';
import { PreffixUrl } from '../../enums/preffix-url.enum';

@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.scss']
})
export class AcknowledgementComponent implements OnChanges {
  isSpinning = false;
  dataTable: any;  
  data: any;  
  map = AcknowledgementMapper;
  preffixUrl: any;
  input=AcknowledgementMapper;
  visible = false;
  title:string;
  actionType:ActionType;
  constructor(private request: AssetHealthService) { 
    this.preffixUrl = PreffixUrl.Acknowledgement;
    this.request.getAll(this.preffixUrl).subscribe(result => {
      this.request.getAll(PreffixUrl.Machine).subscribe(machineResult => {
        this.request.getAll(PreffixUrl.MachineCondition).subscribe(machineConditionResult => {
          this.request.getAll(PreffixUrl.User).subscribe(userResult => {
            this.dataTable = result;
            this.map.machineId.source = machineResult.items;
            this.map.conditionId.source = machineConditionResult.items;
            this.map.userId.source = userResult.items;
          }, error => {
            this.dataTable = [];
          });
        }, error => {
          this.dataTable = [];
        });
      }, error => {
        this.dataTable = [];
      });
    }, error => {
      this.dataTable = [];
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
