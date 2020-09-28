import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActionType } from '../../enums/action-type.enum';
import { AssetHealthService } from 'src/app/services/asset-health.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss']
})
export class SharedTableComponent implements OnChanges {
  @Input() change : boolean;
  headings: any[] = [];
  @Output() result = new EventEmitter<any>();
  @Input() input: any;
  @Input() mapper: any;
  @Input() url: any;
  selectedRow: number = -1;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor( private request: AssetHealthService) {
  }
  
  ngOnChanges() {  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      destroy:true
    }; 
     for (const key in this.input) {
      if (!this.input.hasOwnProperty(key)) { continue; }
      this.headings = [];
      for (const prop in this.mapper) {
        if (!this.mapper.hasOwnProperty(prop)) { continue; }
        let sourceName = 'name';
        let sourceId = 'id';
        let extraAction = false;
        let nested = false;
        let nestedName = 'name';
        let nestedObjectName = 'name';
        if (this.mapper[prop].sourceName) {
          sourceName = this.mapper[prop].sourceName;
        }
        if (this.mapper[prop].extraAction) {
          extraAction = this.mapper[prop].extraAction;
        }
        if (this.mapper[prop].sourceId) {
          sourceId = this.mapper[prop].sourceId;
        }
        if (this.mapper[prop].nested) {
          nested = true;
        }
        if (this.mapper[prop].nestedName) {
          nestedName = this.mapper[prop].nestedName;
        }
        if (this.mapper[prop].nestedObjectName) {
          nestedObjectName = this.mapper[prop].nestedObjectName;
        }
        this.headings.push({
          value: this.mapper[prop].display,
          key: prop,
          visible: this.mapper[prop].visible,
          type: this.mapper[prop].type,
          source: this.mapper[prop].source,
          sourceName,
          sourceId,
          extraAction,
          nested,
          nestedObjectName,
          nestedName
        });
      }
      break;
    }
    this.dtTrigger.next();    
  }
  findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  deleteRow(id, selectedRow) {
    this.selectedRow = selectedRow;
    this.request.delete(id, this.url).subscribe(result => {
      this.input = this.input.filter(d => d.id !== id);
      this.result.emit({ Info: this.input, ActionType: ActionType.delete });
     // this.message.create('success', `Deleted successfully`);
      this.ngOnChanges()
    }, error => {
    //  this.message.error(error.error);
    });
  }
  
  editRow(data, selectedRow) {
    this.selectedRow = selectedRow;
    this.result.emit({ Info: data, ActionType: ActionType.edit });
  }

  viewRow(data, selectedRow){
    this.selectedRow = selectedRow;
    this.result.emit({ Info: data, ActionType: ActionType.info, Visible:true });
  }

}
