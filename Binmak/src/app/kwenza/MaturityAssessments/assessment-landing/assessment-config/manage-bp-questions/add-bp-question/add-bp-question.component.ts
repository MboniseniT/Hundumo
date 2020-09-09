import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { Assessment } from 'src/app/Models/Assessments/assessment';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { BpTable } from 'src/app/Models/Assessments/bpTable';

@Component({
  selector: 'app-add-bp-question',
  templateUrl: './add-bp-question.component.html',
  styleUrls: ['./add-bp-question.component.scss']
})
export class AddBpQuestionComponent implements OnInit {
  public editableRow: Assessment;
  public saveButtonClicked: Subject<any> = new Subject();

  frmwrks: Array<any>;
  versions: Array<any>;
  variants: Array<any>;
  kpas: Array<any>;

  public form: FormGroup = new FormGroup({
    bp_id: new FormControl('', Validators.required),
    question: new FormControl('', Validators.required),
    description: new FormControl(''),
    user_id: new FormControl({value: '', disabled: true}),
    frmwrk_id: new FormControl('', Validators.required),
    version_id: new FormControl('', Validators.required),
    variant_id: new FormControl('', Validators.required)
  });

  constructor(
    private assessmentService: AssessmentsConfigService,
    public modalRef: MDBModalRef) { }

    ngOnInit() {
      this.loadDropdowns();
    }

    onSave() {
      this.form.controls['user_id'].patchValue(JSON.parse(localStorage.getItem('currentUser')).userId);
      this.editableRow = this.form.getRawValue();
      //console.log(this.editableRow);
      this.saveButtonClicked.next(this.editableRow);
      this.modalRef.hide();
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
          this.kpas = data.map((t: any) => {
            return { label: t.bpName, value: t.bpID }
          })
        }, error => {
          console.log('httperror: ');
          console.log(error);
        }
      );
    }

      get bp_id() { return this.form.get('bp_id'); }
      get question() { return this.form.get('question'); }
      get description() { return this.form.get('description'); }
      get frmwrk_id() { return this.form.get('frmwrk_id'); }
      get variant_id() { return this.form.get('variant_id'); }
      get version_id() { return this.form.get('version_id'); }

}
