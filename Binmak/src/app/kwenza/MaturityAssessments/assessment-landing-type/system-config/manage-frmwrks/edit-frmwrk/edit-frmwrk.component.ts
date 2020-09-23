import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import { KPI } from 'src/app/Models/Assessments/kpi';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { TableKPI } from 'src/app/Models/Assessments/TableKPI';
import { BpTable } from 'src/app/Models/Assessments/bpTable';
import { FrmwrkTable } from 'src/app/Models/Assessments/frmwrkTable';

@Component({
  selector: 'app-edit-frmwrk',
  templateUrl: './edit-frmwrk.component.html',
  styleUrls: ['./edit-frmwrk.component.scss']
})
export class EditFrmwrkComponent implements OnInit {

  public editableRow: FrmwrkTable;
  public saveButtonClicked: Subject<any> = new Subject();

  frmwrks: Array<any>;
  versions: Array<any>;
  variants: Array<any>;
  kpas: Array<any>;

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    user_id: new FormControl('')
  });

  constructor(private assessmentService: AssessmentsConfigService,
    public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.form.controls['id'].patchValue(this.editableRow.frmwrkID);
    this.form.controls['name'].patchValue(this.editableRow.frmwrkName);
    this.form.controls['description'].patchValue(this.editableRow.frmwrkDescription);
    this.form.controls['user_id'].patchValue(JSON.parse(localStorage.getItem('currentUser')).userId);

  }



  editRow() {
    this.editableRow = this.form.getRawValue();
    //console.log(this.editableRow);
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

      get name() { return this.form.get('name'); }
      get description() { return this.form.get('description'); }
      get userId() { return JSON.parse(localStorage.getItem('currentUser')).firstName; }

}
