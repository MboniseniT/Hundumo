import { Component, OnInit, Version } from '@angular/core';
import {MDBModalRef} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { BP } from 'src/app/Models/Assessments/bp';

@Component({
  selector: 'app-add-version',
  templateUrl: './add-version.component.html',
  styleUrls: ['./add-version.component.scss']
})
export class AddVersionComponent implements OnInit {
  public editableRow: Version;
  public saveButtonClicked: Subject<any> = new Subject();

  kpas: Array<any>;

  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    user_id: new FormControl('')
  });

  constructor(
    private assessmentService: AssessmentsConfigService,
    public modalRef: MDBModalRef) { }

    ngOnInit() {
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

      get name() { return this.form.get('name'); }
      get description() { return this.form.get('description'); }

}
