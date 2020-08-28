import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import { Frmwrk } from 'src/app/Models/Assessments/frmwrk';
import { Variant } from 'src/app/Models/Assessments/variant';
import { Version } from 'src/app/Models/Assessments/version';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';

@Component({
  selector: 'app-add-characteristic',
  templateUrl: './add-characteristic.component.html',
  styleUrls: ['./add-characteristic.component.scss']
})
export class AddCharacteristicComponent implements OnInit {

  public editableRow: { kpa_id: number,level_id: number, description: string, frmwrk_id:number, version_id:number, variant_id:number;};
  public saveButtonClicked: Subject<any> = new Subject();

  frmwrks: Array<any>;
  versions: Array<any>;
  variants: Array<any>;

  public form: FormGroup = new FormGroup({
    kpa_id: new FormControl({value: '', disabled: true}),
    level_id: new FormControl({value: '', disabled: true}),
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
      this.form.controls['kpa_id'].patchValue(this.editableRow.kpa_id);
      this.form.controls['level_id'].patchValue(this.editableRow.level_id);
        this.form.controls['description'].patchValue(this.editableRow.description);
    }

    editRow() {
      this.editableRow = this.form.getRawValue();
      console.log(this.editableRow);
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
    }

      get description() { return this.form.get('description'); }
      get frmwrk_id() { return this.form.get('frmwrk_id'); }
      get variant_id() { return this.form.get('variant_id'); }
      get version_id() { return this.form.get('version_id'); }

}
