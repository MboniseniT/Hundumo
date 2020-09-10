import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import { KPI } from 'src/app/Models/Assessments/kpi';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { TableKPI } from 'src/app/Models/Assessments/TableKPI';
import { BpQuestionTable } from 'src/app/Models/Assessments/bpQuestionTable';
import { BpTable } from 'src/app/Models/Assessments/bpTable';

@Component({
  selector: 'app-edit-bp-question',
  templateUrl: './edit-bp-question.component.html',
  styleUrls: ['./edit-bp-question.component.scss']
})
export class EditBpQuestionComponent implements OnInit {

  public editableRow: BpQuestionTable;
  public saveButtonClicked: Subject<any> = new Subject();

  frmwrks: Array<any>;
  versions: Array<any>;
  variants: Array<any>;
  bps: Array<any>;

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    frmwrk_id: new FormControl('', Validators.required),
    version_id: new FormControl('', Validators.required),
    variant_id: new FormControl('', Validators.required),
    bp_id: new FormControl('', Validators.required),
    question: new FormControl('', Validators.required),
    description: new FormControl(''),
    user_id: new FormControl('')
  });

  constructor(private assessmentService: AssessmentsConfigService,
    public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.loadDropdowns();
    this.form.controls['id'].patchValue(this.editableRow.qstnID);
    this.form.controls['frmwrk_id'].patchValue(this.editableRow.qstnFrmwrkID);
    this.form.controls['version_id'].patchValue(this.editableRow.qstnVersionID);
    this.form.controls['variant_id'].patchValue(this.editableRow.qstnVariantID);
    this.form.controls['bp_id'].patchValue(this.editableRow.qstnBpID);
    this.form.controls['question'].patchValue(this.editableRow.qstnQuestion);
    this.form.controls['description'].patchValue(this.editableRow.qstnDescription);
    this.form.controls['user_id'].patchValue(JSON.parse(localStorage.getItem('currentUser')).userId);

  }

  loadDropdowns(){
    //retrieve Frameworks from Database
    this.assessmentService.getFrameworks().subscribe(
      resp => {
        this.frmwrks = resp.map((t: any) => {
          return { label: t.name, value: t.id }
        })
      }
    );
    //retrieve Version from Database
    this.assessmentService.getVersions().subscribe(
      resp => {
        this.versions = resp.map((t: any) => {
          return { label: t.name, value: t.id }
        })
      }
    );

    //retrieve Variants from Database
    this.assessmentService.getVariants().subscribe(
      resp => {
        this.variants = resp.map((t: any) => {
          return { label: t.name, value: t.id }
        })
      }
    );

    this.assessmentService.GetBPs().subscribe(
      (data:BpTable[]) => {
        this.bps = data.map((t: any) => {
          return { label: t.bpName, value: t.bpID }
        })
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

  editRow() {
    this.editableRow = this.form.getRawValue();
    //console.log(this.editableRow);
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

      get bp_id() { return this.form.get('bp_id'); }
      get question() { return this.form.get('question'); }
      get description() { return this.form.get('description'); }
      get frmwrk_id() { return this.form.get('frmwrk_id'); }
      get variant_id() { return this.form.get('variant_id'); }
      get version_id() { return this.form.get('version_id'); }
      get userId() { return JSON.parse(localStorage.getItem('currentUser')).firstName; }

}
