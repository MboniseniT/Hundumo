import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import { KPI } from 'src/app/Models/Assessments/kpi';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { TableKPI } from 'src/app/Models/Assessments/TableKPI';
import { ActionTable } from 'src/app/Models/Assessments/actionTable';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrls: ['./edit-action.component.scss']
})
export class EditActionComponent implements OnInit {

  public editableRow: ActionTable;
  public saveButtonClicked: Subject<any> = new Subject();

  frmwrks: Array<any>;
  versions: Array<any>;
  variants: Array<any>;
  kpas: Array<any>;

  Status: Array<any>;
  Priority: Array<any>;
  Duration: Array<any>;
  Ease: Array<any>;
  Impact: Array<any>;
  users: Array<any>;

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    assess_id: new FormControl({value: '', disabled: true}),
    question: new FormControl({value: '', disabled: true}),
    action: new FormControl('', Validators.required),
    biz_impact: new FormControl('', Validators.required),
    ease_of_imp: new FormControl('', Validators.required),
    cost_of_imp: new FormControl('', Validators.required),
    time_to_imp: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    responsible_person: new FormControl('', Validators.required),
    target_date: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });

  constructor(private assessmentService: AssessmentsConfigService,
    private service: MainServiceService,
    public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.loadDropdowns();
    this.form.controls['id'].patchValue(this.editableRow.actionID);
    this.form.controls['assess_id'].patchValue(this.editableRow.actionAssessID);
    this.form.controls['question'].patchValue(this.editableRow.actionBpQuestion);
    this.form.controls['action'].patchValue(this.editableRow.actionAction);
    this.form.controls['biz_impact'].patchValue(this.editableRow.actionBizImpactID);
    this.form.controls['ease_of_imp'].patchValue(this.editableRow.actionEaseOfImpID);
    this.form.controls['cost_of_imp'].patchValue(this.editableRow.actionCostOfImp);
    this.form.controls['time_to_imp'].patchValue(this.editableRow.actionTimeToImpID);
    this.form.controls['priority'].patchValue(this.editableRow.actionPriorityID);
    this.form.controls['responsible_person'].patchValue(this.editableRow.actionResponsiblePersonID);
    this.form.controls['target_date'].patchValue(this.editableRow.actionTargetDate);
    this.form.controls['status'].patchValue(this.editableRow.actionStatusID);

  }

  loadDropdowns(){
    let statusData = [{id:1,name:"incomplete"},{id:2,name:"complete"}];
    this.Status = statusData.map((t:any) => {
      return {label:t.name, value:t.id}
    });

    let priorityData = [{id:1,name:"Highest"},{id:2,name:"High"},{id:3,name:"Medium"},{id:4,name:"Low"},{id:5,name:"Lowest"}];
    this.Priority = priorityData.map((t:any) => {
      return {label:t.name, value:t.id}
    });

    let durationData = [{id:1,name:"1 week"},{id:2,name:"2 weeks"},{id:3,name:"1 month"},{id:4,name:"2 months"},{id:5,name:"3 months"},{id:6,name:"longer than 3 months"}];
    this.Duration = durationData.map((t:any) => {
      return {label:t.name, value:t.id}
    });

    let easeData = [{id:1,name:"Very easy"},{id:2,name:"Easy"},{id:3,name:"Difficult"},{id:4,name:"Very Difficult"}];
    this.Ease = easeData.map((t:any) => {
      return {label:t.name, value:t.id}
    });

    let impactData = [{id:1,name:"Highest"},{id:2,name:"High"},{id:3,name:"Medium"},{id:4,name:"Low"},{id:5,name:"Lowest"}];
    this.Impact = impactData.map((t:any) => {
      return {label:t.name, value:t.id}
    });

    this.service.getUsers(JSON.parse(localStorage.getItem('currentAssessment')).user_id)
    .subscribe(resp => {
        this.users = resp.map((t: any) => {
          return { label: t.name + '-' + t.lastName, value: t.id }
    })
  });
  }

  editRow() {
    this.editableRow = this.form.getRawValue();
    //console.log(this.editableRow);
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  get action() { return this.form.get('action'); }
  get biz_impact() { return this.form.get('biz_impact'); }
  get ease_of_imp() { return this.form.get('ease_of_imp'); }
  get cost_of_imp() { return this.form.get('cost_of_imp'); }
  get time_to_imp() { return this.form.get('time_to_imp'); }
  get priority() { return this.form.get('priority'); }
  get responsible_person() { return this.form.get('responsible_person'); }
  get target_date() { return this.form.get('target_date'); }
  get status() { return this.form.get('status'); }

}
