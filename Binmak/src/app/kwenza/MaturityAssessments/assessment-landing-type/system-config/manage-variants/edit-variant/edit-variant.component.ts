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
import { VariantTable } from 'src/app/Models/Assessments/variantTable';

@Component({
  selector: 'app-edit-variant',
  templateUrl: './edit-variant.component.html',
  styleUrls: ['./edit-variant.component.scss']
})
export class EditVariantComponent implements OnInit {

  public editableRow: VariantTable;
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
    this.form.controls['id'].patchValue(this.editableRow.variantID);
    this.form.controls['name'].patchValue(this.editableRow.variantName);
    this.form.controls['description'].patchValue(this.editableRow.variantDescription);
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
