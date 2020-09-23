import { OnChanges } from '@angular/core';
import { Component } from '@angular/core';
import { AssetHealthService } from 'src/app/services/asset-health.service';
import { ActionType } from '../../enums/action-type.enum';
import { PreffixUrl } from '../../enums/preffix-url.enum';
import { BearingMapper } from '../../models/bearing-mapper';

@Component({
  selector: 'app-bearing',
  templateUrl: './bearing.component.html',
  styleUrls: ['./bearing.component.scss']
})
export class BearingComponent implements OnChanges {
  dataTable: any;  
  data: any;  
  map = BearingMapper;
  preffixUrl: any;
  input=BearingMapper;
  visible = false;
  title:string;
  actionType:ActionType;
  constructor(private request: AssetHealthService) { 
    this.preffixUrl = PreffixUrl.Bearing;
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
