import { Component, OnChanges } from '@angular/core';
import { SizeCategoryMapper } from '../../models/size-category-mapper';
import { ActionType } from '../../enums/action-type.enum';
import { AssetHealthService } from 'src/app/services/asset-health.service';
import { PreffixUrl } from '../../enums/preffix-url.enum';

@Component({
  selector: 'app-size-category',
  templateUrl: './size-category.component.html',
  styleUrls: ['./size-category.component.scss']
})
export class SizeCategoryComponent implements OnChanges {
  dataTable: any;  
  data: any;  
  map = SizeCategoryMapper;
  preffixUrl: any;
  input=SizeCategoryMapper;
  visible = false;
  title:string;
  actionType:ActionType;
  constructor(private request: AssetHealthService) { 
    this.preffixUrl = PreffixUrl.SizeCategory;
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
