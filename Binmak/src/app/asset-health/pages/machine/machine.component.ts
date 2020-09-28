import { Component, OnInit, OnChanges } from '@angular/core';
import { MachineMapper } from '../../models/machine-mapper';
import { ActionType } from '../../enums/action-type.enum';
import { AssetHealthService } from 'src/app/services/asset-health.service';
import { PreffixUrl } from '../../enums/preffix-url.enum';
import { ViewChild } from '@angular/core';
import { ModalDirective, ToastService } from 'ng-uikit-pro-standard';
import { Machine } from '../../interface/machine';

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
  
  url :any="data:image/jpeg;base64,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";
  input:Machine ={
    id:0,
    drivingEndId:0,
    nonDrivingEndId:0,
    conditionId:1,
    imageUrl: '',
    insulationLevelId:0,
    assetNodeId:'',
    deviceId:'',
    machineLoadId:0,
    machineTypeId:0,
    sizeCategoryId:0,
    frequencyPeriodId:0,
    revolutionPerMinute:0,
    name:'',
    bbssDeviceId:0,
    criticality:''
  };
  visible = false;
  title: string;
  actionType: ActionType;
  @ViewChild('dataModal', { static: false }) dataModal: ModalDirective;
  constructor(private request: AssetHealthService, private toastService: ToastService) {
    this.preffixUrl = PreffixUrl.Machine;
    this.request.getAll(this.preffixUrl).subscribe(result => {
      this.request.getAll(PreffixUrl.SizeCategory).subscribe(categoryResult => {
        this.request.getAll(PreffixUrl.MachineType).subscribe(machineTypeResult => {
          this.request.getAll(PreffixUrl.AssetNode).subscribe(assetnodeResult => {
            this.request.getAll(PreffixUrl.BBSSDevice).subscribe(bbssDeviceResult => {
              this.request.getAll(PreffixUrl.FrequencyPeriod).subscribe(frequencyPeriodResult => {
                this.request.getAll(PreffixUrl.InsulationLevel).subscribe(insulationLevelResult => {
                  this.request.getAll(PreffixUrl.MachineLoad).subscribe(machineLoadResult => {
                    this.request.getAll(PreffixUrl.SensorCondtion).subscribe(sensorConditionResult => {
                      this.request.getAll(PreffixUrl.Bearing).subscribe(bearingResult => {
                        this.dataTable = result.items;
                        this.map.assetNodeId.source = assetnodeResult;
                        this.map.bbssDeviceId.source = bbssDeviceResult.items;
                        this.map.machineTypeId.source = machineTypeResult.items;
                        this.map.frequencyPeriodId.source = frequencyPeriodResult.items;
                        this.map.insulationLevelId.source = insulationLevelResult.items;
                        this.map.machineLoadId.source = machineLoadResult.items;
                        this.map.sizeCategoryId.source = categoryResult.items;
                        this.map.nonDrivingEndId.source = bearingResult.items;
                        this.map.drivingEndId.source = bearingResult.items;
                        this.map.conditionId.source = sensorConditionResult.items;
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
      }, error => {
        this.dataTable = [];
      });
    }, error => {
      this.dataTable = [];
    });
  }

  ngOnChanges(): void {
  }

  tableResult(data) {
    if (data.ActionType === ActionType.delete) {
      this.dataTable = data.Info;
      this.actionType = ActionType.delete;
    }
    if (data.ActionType === ActionType.edit) {
      this.title = 'Update';
      this.input = data.Info;

      var nonDrivingEnd= this.map.nonDrivingEndId.source.filter(device => device.id ===  data.Info.nonDrivingEndId)[0];
      this.input.nonDrivingEndId = nonDrivingEnd.bearingId;
  
      var drivingEnd= this.map.drivingEndId.source.filter(device => device.id ===  data.Info.drivingEndId)[0];
      this.input.drivingEndId = drivingEnd.bearingId;
      this.dataModal.show();
      this.actionType = ActionType.edit;
      this.visible = true;
    }
  }

  open() {
    this.dataModal.show();
    this.title = 'Add';
    this.actionType = ActionType.add;
    this.visible = true;
  }


  close(): void {
    this.dataModal.hide();
    this.visible = false;
    this.actionType = ActionType.add;
  }

  result(data) {
    this.visible = data.success;
    this.dataTable = data.data;
  }

  onSubmit(data) {
    switch (this.actionType) {
      case ActionType.edit:
        this.update(data);
        break;

      case ActionType.add:
        this.create(data);
        break;
    }
  }
  initialise(){
    this.input ={
      id:0,
      drivingEndId:0,
      nonDrivingEndId:0,
      conditionId:1,
      imageUrl: '',
      insulationLevelId:0,
      assetNodeId:'',
      deviceId:'',
      machineLoadId:0,
      machineTypeId:0,
      sizeCategoryId:0,
      frequencyPeriodId:0,
      revolutionPerMinute:0,
      name:'',
      bbssDeviceId:0,
      criticality:''
    };
  }

  update(data) {
    data.value.imageUrl=this.url;
    this.map.bbssDeviceId.source
    var device= this.map.bbssDeviceId.source.filter(device => device.deviceId === data.value.deviceId)[0];
    if(!device) return this.toastService.error("Device sensor does not exist");
    data.value.bbssDeviceId = device.id;

    var nonDrivingEnd= this.map.nonDrivingEndId.source.filter(device => device.bearingId === data.value.nonDrivingEndId)[0];
    if(!nonDrivingEnd) return this.toastService.error("Non driving end bearing does not exist");
    data.value.nonDrivingEndId = nonDrivingEnd.id;

    var drivingEnd= this.map.drivingEndId.source.filter(device => device.bearingId === data.value.drivingEndId)[0];
    if(!drivingEnd) return this.toastService.error("Driving end bearing does not exist");
    data.value.drivingEndId = drivingEnd.id;
    this.request.put(this.input.id, data.value, this.preffixUrl).subscribe(response => {
      const updateItem = this.dataTable.find(a => a.id === this.input.id);
      const index = this.dataTable.indexOf(updateItem);
      this.dataTable[index] = response.data;
      this.toastService.success(response.message);
      this.visible = false;
      this.initialise();
      this.dataModal.hide();
    }, error => {
      this.visible = false;
      this.toastService.error(error.error);
    });
  }

  create(data) {
    data.value.imageUrl=this.url;
    var machine= this.dataTable.filter(device => device.deviceId === data.value.deviceId)[0];
    if(machine) return this.toastService.error("Device sensor is already attached to another machine"); 

    var device= this.map.bbssDeviceId.source.filter(device => device.deviceId === data.value.deviceId)[0];
    if(!device) return this.toastService.error("Device sensor does not exist");
    data.value.bbssDeviceId = device.id;

    var nonDrivingEnd= this.map.nonDrivingEndId.source.filter(device => device.bearingId === data.value.nonDrivingEndId)[0];
    if(!nonDrivingEnd) return this.toastService.error("Non driving end bearing does not exist");
    data.value.nonDrivingEndId = nonDrivingEnd.id;

    var drivingEnd= this.map.drivingEndId.source.filter(device => device.bearingId === data.value.drivingEndId)[0];
    if(!drivingEnd) return this.toastService.error("Driving end bearing does not exist");
    data.value.drivingEndId = drivingEnd.id;

    this.request.post(data.value, this.preffixUrl).subscribe(response => {
      if (this.dataTable)
        this.dataTable.unshift(response.data);
      else {
        this.dataTable = [];
        this.dataTable.add(response);
      }
      this.toastService.success(response.message);
      this.visible = false;
      this.initialise();
      this.dataModal.hide();
    }, error => {
      this.toastService.error(error.error);
    });
  }
  
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
}
