import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { BP } from 'src/app/Models/Assessments/bp';

@Component({
  selector: 'app-add-bp',
  templateUrl: './add-bp.component.html',
  styleUrls: ['./add-bp.component.scss']
})
export class AddBpComponent implements OnInit {
  public editableRow: BP;
  public saveButtonClicked: Subject<any> = new Subject();

  kpas: Array<any>;

  public form: FormGroup = new FormGroup({
    kpa_id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    user_id: new FormControl({value: '', disabled: true})
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

      get kpa_id() { return this.form.get('kpa_id'); }
      get name() { return this.form.get('name'); }
      get description() { return this.form.get('description'); }

}
