import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import { KPI } from 'src/app/Models/Assessments/kpi';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { TableKPI } from 'src/app/Models/Assessments/TableKPI';
import { BpTable } from 'src/app/Models/Assessments/bpTable';

@Component({
  selector: 'app-edit-bp',
  templateUrl: './edit-bp.component.html',
  styleUrls: ['./edit-bp.component.scss']
})
export class EditBpComponent implements OnInit {

  public editableRow: BpTable;
  public saveButtonClicked: Subject<any> = new Subject();

  frmwrks: Array<any>;
  versions: Array<any>;
  variants: Array<any>;
  kpas: Array<any>;

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    kpa_id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    user_id: new FormControl('')
  });

  constructor(private assessmentService: AssessmentsConfigService,
    public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.loadDropdowns();
    this.form.controls['id'].patchValue(this.editableRow.bpID);
    this.form.controls['kpa_id'].patchValue(this.editableRow.bpKpaID);
    this.form.controls['name'].patchValue(this.editableRow.bpName);
    this.form.controls['description'].patchValue(this.editableRow.bpDescription);
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

    this.assessmentService.GetExecKPAs().subscribe(
      (data:KPA[]) => {
        this.kpas = data.map((t: any) => {
          return { label: t.name, value: t.id }
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

      get kpa_id() { return this.form.get('kpa_id'); }
      get name() { return this.form.get('name'); }
      get description() { return this.form.get('description'); }
      get userId() { return JSON.parse(localStorage.getItem('currentUser')).firstName; }

}
