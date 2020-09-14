import { Component, OnInit, OnChanges } from '@angular/core';
import { MachineMapper } from '../../models/machine-mapper';
import { ActionType } from '../../enums/action-type.enum';
import { AssetHealthService } from 'src/app/services/asset-health.service';
import { PreffixUrl } from '../../enums/preffix-url.enum';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnChanges {
  dataTable: any;  
  data: any;  
  map = MachineMapper;
  preffixUrl: any;
  input=MachineMapper;
  visible = false;
  title:string;
  actionType:ActionType;
  constructor(private request: AssetHealthService) { 
    this.preffixUrl = PreffixUrl.Machine;    
    this.request.getAll(this.preffixUrl).subscribe(result => {
      this.request.getAll(PreffixUrl.SizeCategory).subscribe(categoryResult => {
        this.request.getAll(PreffixUrl.MachineType).subscribe(machineTypeResult => {
          this.request.getAll(PreffixUrl.AssetNode).subscribe(assetnodeResult => {
            this.request.getAll(PreffixUrl.BBSSDevice).subscribe(bbssDeviceResult => {
              this.request.getAll(PreffixUrl.FrequencyPeriod).subscribe(frequencyPeriodResult => {
                this.request.getAll(PreffixUrl.InsulationLevel).subscribe(insulationLevelResult => {
                  this.request.getAll(PreffixUrl.MachineLoad).subscribe(machineLoadResult => {
                    this.dataTable = result.items;
                    console.log(this.dataTable);
                    
                    this.map.assetNodeId.source = assetnodeResult;
                    this.map.bbssDeviceId.source = bbssDeviceResult.items;
                    this.map.machineTypeId.source = machineTypeResult.items;
                    this.map.frequencyPeriodId.source = frequencyPeriodResult.items;
                    this.map.insulationLevelId.source = insulationLevelResult.items;
                    this.map.machineLoadId.source = machineLoadResult.items;
                    this.map.sizeCategoryId.source = categoryResult.items;
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
