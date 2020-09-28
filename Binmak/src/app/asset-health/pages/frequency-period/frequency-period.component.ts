import { Component, OnChanges } from '@angular/core';
import { FrequencyPeriodMapper } from '../../models/frequency-period-mapper';
import { ActionType } from '../../enums/action-type.enum';
import { AssetHealthService } from 'src/app/services/asset-health.service';
import { PreffixUrl } from '../../enums/preffix-url.enum';

@Component({
  selector: 'app-frequency-period',
  templateUrl: './frequency-period.component.html',
  styleUrls: ['./frequency-period.component.scss']
})
export class FrequencyPeriodComponent implements OnChanges {
  dataTable: any;  
  data: any;  
  map = FrequencyPeriodMapper;
  preffixUrl: any;
  input=FrequencyPeriodMapper;
  visible = false;
  title:string;
  actionType:ActionType;
  constructor(private request: AssetHealthService) { 
    this.preffixUrl = PreffixUrl.FrequencyPeriod;
    this.request.getAll(this.preffixUrl).subscribe(result => {
      this.dataTable = result.items;
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
