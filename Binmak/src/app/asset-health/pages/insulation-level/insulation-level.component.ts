import { Component, OnChanges } from '@angular/core';
import { InsulationLevelMapper } from '../../models/insulation-level-mapper';
import { ActionType } from '../../enums/action-type.enum';
import { AssetHealthService } from 'src/app/services/asset-health.service';
import { PreffixUrl } from '../../enums/preffix-url.enum';

@Component({
  selector: 'app-insulation-level',
  templateUrl: './insulation-level.component.html',
  styleUrls: ['./insulation-level.component.scss']
})
export class InsulationLevelComponent implements OnChanges {
  dataTable: any;  
  data: any;  
  map = InsulationLevelMapper;
  preffixUrl: any;
  input=InsulationLevelMapper;
  visible = false;
  title:string;
  actionType:ActionType;
  constructor(private request: AssetHealthService) { 
    this.preffixUrl = PreffixUrl.InsulationLevel;
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
