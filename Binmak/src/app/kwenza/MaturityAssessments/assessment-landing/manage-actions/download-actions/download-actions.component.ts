import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { Assessment } from 'src/app/Models/Assessments/assessment';
import { KPA } from 'src/app/Models/Assessments/kpa';

@Component({
  selector: 'app-download-actions',
  templateUrl: './download-actions.component.html',
  styleUrls: ['./download-actions.component.scss']
})
export class DownloadActionsComponent implements OnInit {
  public editableRow: any;
  public saveButtonClicked: Subject<any> = new Subject();

  formats: Array<any>;
  versions: Array<any>;
  variants: Array<any>;
  kpas: Array<any>;

  public form: FormGroup = new FormGroup({
    format: new FormControl('', Validators.required)
  });

  constructor(
    private assessmentService: AssessmentsConfigService,
    public modalRef: MDBModalRef) { }

    ngOnInit() {
      this.loadDropdowns();
    }

    onSave() {
      this.editableRow = this.form.getRawValue();
      //console.log(this.editableRow);
      this.saveButtonClicked.next(this.editableRow);
      this.modalRef.hide();
    }

    loadDropdowns(){
      let formatsData:any[] = [{id:1, name:"PDF"},{id:2, name:"Excel"}];
      this.formats = formatsData.map((t:any) => {
        return {label: t.name, value: t.id}
      });
    }

      get format() { return this.form.get('format'); }

}
