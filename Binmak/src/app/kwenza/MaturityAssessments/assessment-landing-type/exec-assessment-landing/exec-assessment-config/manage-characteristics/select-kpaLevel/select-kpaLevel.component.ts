import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import { KPA } from 'src/app/Models/Assessments/kpa';
import { Level } from 'src/app/Models/Assessments/Level';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';

@Component({
  selector: 'app-select-kpaLevel',
  templateUrl: './select-kpaLevel.component.html',
  styleUrls: ['./select-kpaLevel.component.scss']
})
export class SelectKpaLevelComponent implements OnInit {

  public editableRow: { kpaID: number, levelID: number };
  public saveButtonClicked: Subject<any> = new Subject();

  kpas:KPA[] =[];
  level:Level[]= [];

  public form: FormGroup = new FormGroup({
    kpaID: new FormControl('', Validators.required),
    levelID: new FormControl('', Validators.required)
  });

  constructor(
    private assessmentService: AssessmentsConfigService,
    public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.loadDropdowns();
    this.form.controls['kpaID'].patchValue(this.editableRow.kpaID);
      this.form.controls['levelID'].patchValue(this.editableRow.levelID);
  }

  editRow() {
    this.editableRow = this.form.getRawValue();
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  loadDropdowns(){
    //retrieve KPAs from Database
    this.assessmentService.GetExecKPAs().subscribe(
      (data:KPA[]) => {
        this.kpas = data;
        console.log(data);
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    //retrieve Levels from Database
    this.assessmentService.getLevels().subscribe(
      (data:Level[]) => {
        this.level = data;
        console.log(data);
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

  get kpaID() { return this.form.get('kpaID'); }

    get levelID() { return this.form.get('levelID'); }

}
