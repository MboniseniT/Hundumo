import { Component, Output, EventEmitter, Input, OnChanges, ViewChild } from '@angular/core';
import { ActionType } from '../../enums/action-type.enum';
import { DatePipe } from '@angular/common';
import { InputType } from '../../enums/input-type.enum';
import { AssetHealthService } from 'src/app/services/asset-health.service';
import { ModalDirective, ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-shared-form',
  templateUrl: './shared-form.component.html',
  styleUrls: ['./shared-form.component.scss']
})
export class SharedFormComponent implements OnChanges {
  formData: any[];
  @Output() result = new EventEmitter<any>();
  @Input() mapper: any;
  @Input() input: any;
  @Input() list: any;
  @Input() url: any;
  @Input() title: string;
  @Input() actionType: ActionType; 
  @Input() visible: boolean;
  isSpinning = false;
  checked = true;
  value = 3;
  loading = false;
  avatarUrl?: string;
  @ViewChild('dataModal', { static: false }) dataModal: ModalDirective;
  constructor( private request: AssetHealthService, public datepipe: DatePipe,private toastService: ToastService) {}

  ngOnChanges(): void {
    if(this.visible)this.dataModal.show();
    this.formData = [];
    let value = '';
    let disabled = false;
    for (const prop in this.input) {
      if (!this.input.hasOwnProperty(prop)) {continue; }
      if (this.input[prop] == null) {continue; }
      if (this.mapper[prop].type === null) {continue; }
      const source = this.mapper[prop].source;      
      let sourceName = 'name';
      let sourceId = 'id';
      let visible =this.mapper[prop].visible
      if (this.mapper[prop].sourceName) {
        sourceName = this.mapper[prop].sourceName; }
        if (this.mapper[prop].sourceId) {
          sourceId = this.mapper[prop].sourceId;
        }
      if (this.mapper[prop].type === InputType.image.toString()) {this.avatarUrl = this.input[prop]; }
      if (this.actionType === ActionType.edit) {
        disabled =  this.mapper[prop].disabled;
        value = this.input[prop];
        if (this.input[prop] !== '' && this.mapper[prop].type === InputType.date.toString()) {
          value = this.datepipe.transform(new Date(this.input[prop]), 'yyyy-MM-dd'); }
      } else {
        disabled = this.input[prop].hideOnAdd
        value = this.input[prop].defaultValue;
      }
      this.formData.push({
        visible,
        id: prop,
        value,
        type: this.mapper[prop].type,
        display: this.mapper[prop].display,
        source,
        sourceName,
        sourceId,
        disabled,
        pattern: this.mapper[prop].regex,
        required: this.mapper[prop].required
      });
    }

  }

  close(): void {
    this.dataModal.hide();
    this.visible = false;
    this.result.emit({
      data: this.list,
      actionType: this.actionType,
      success: this.visible
    });
  }
  getId(data){
    let id = data.id;
    if(id === undefined){
       this.formData.forEach(body=>{
         if(body.sourceId === 'id' && body.display === 'Id'){
          id= data[body.id]; 
         }
       });
    }
    return id;
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

  update(data) {
    this.isSpinning = true;
    if(this.avatarUrl)
    data.value.image = this.avatarUrl;
    let id =this.getId(data.value);
    this.request.put(this.input.id, data.value, this.url).subscribe(response => {
      this.isSpinning = false;
      const updateItem = this.list.find(a=> this.getId(a) === id);
      const index = this.list.indexOf(updateItem);
      this.list[index] = response.data;
      this.result.emit({
        data: this.list,
        actionType: this.actionType,
        success: true
      });
      this.toastService.success(response.message); 
      this.visible = false;  
      this.dataModal.hide();
    }, error => {
      this.isSpinning = false;
      this.toastService.error(error.error);     
      this.result.emit({
        data: this.list,
        actionType: this.actionType,
        success: true
      });
    });
  }

  create(data) {
    this.isSpinning = true;
    if(this.avatarUrl)
    data.value.image = this.avatarUrl;
    this.request.post(data.value, this.url).subscribe(response => {
      this.isSpinning = false;
      if(this.list)
      this.list.unshift(response.data);
      else{
        this.list = [];
        this.list.add(response);
      }
      this.result.emit({
        data: this.list,
        actionType: this.actionType,
        success: true
      });
     this.toastService.success(response.message);  
     this.visible = false;
     this.dataModal.hide();
    }, error => {
      this.isSpinning = false;
      this.result.emit({
        data: this.list,
        actionType: this.actionType,
        success: true
      });
      this.toastService.error(error.error);
    });
  }
}
