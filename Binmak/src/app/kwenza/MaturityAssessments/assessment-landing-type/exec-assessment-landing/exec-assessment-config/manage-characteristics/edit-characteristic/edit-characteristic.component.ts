import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import { Frmwrk } from 'src/app/Models/Assessments/frmwrk';
import { Variant } from 'src/app/Models/Assessments/variant';
import { Version } from 'src/app/Models/Assessments/version';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';

@Component({
  selector: 'app-edit-characteristic',
  templateUrl: './edit-characteristic.component.html',
  styleUrls: ['./edit-characteristic.component.scss']
})
export class EditCharacteristicComponent implements OnInit {

  public editableRow: { id: string, description: string, frmwrk_id:number, version_id:number, variant_id:number;};
  public saveButtonClicked: Subject<any> = new Subject();

  frmwrks: Frmwrk[] = [];
  versions: Version[] = [];
  variants: Variant[] = [];

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    description: new FormControl('', Validators.required),
    frmwrk_id: new FormControl('', Validators.required),
    version_id: new FormControl('', Validators.required),
    variant_id: new FormControl('', Validators.required)
  });

  constructor(
    private assessmentService: AssessmentsConfigService,
    public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.loadDropdowns();
    this.form.controls['frmwrk_id'].patchValue(this.editableRow.frmwrk_id);
      this.form.controls['version_id'].patchValue(this.editableRow.version_id);
      this.form.controls['variant_id'].patchValue(this.editableRow.variant_id);
    this.form.controls['id'].patchValue(this.editableRow.id);
      this.form.controls['description'].patchValue(this.editableRow.description);
  }

  editRow() {
    this.editableRow = this.form.getRawValue();
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  loadDropdowns(){
    //retrieve KPAs from Database
    this.assessmentService.getFrameworks().subscribe(
      (data:Frmwrk[]) => {
        this.frmwrks = data;
        console.log(data);
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    //retrieve Levels from Database
    this.assessmentService.getVersions().subscribe(
      (data:Version[]) => {
        this.versions = data;
        console.log(data);
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );

    //retrieve Levels from Database
    this.assessmentService.getVariants().subscribe(
      (data:Variant[]) => {
        this.variants = data;
        console.log(data);
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

    get description() { return this.form.get('description'); }
    get frmwrk_id() { return this.form.get('description'); }
    get variant_id() { return this.form.get('description'); }
    get version_id() { return this.form.get('description'); }

}
