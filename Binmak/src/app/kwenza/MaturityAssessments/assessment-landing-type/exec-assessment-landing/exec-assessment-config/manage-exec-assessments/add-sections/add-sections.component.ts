import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import { Frmwrk } from 'src/app/Models/Assessments/frmwrk';
import { Variant } from 'src/app/Models/Assessments/variant';
import { Version } from 'src/app/Models/Assessments/version';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { Assessment } from 'src/app/Models/Assessments/assessment';

@Component({
  selector: 'app-add-sections',
  templateUrl: './add-sections.component.html',
  styleUrls: ['./add-sections.component.scss']
})
export class AddSectionsComponent implements OnInit {

  public editableRow:Assessment;
  public sections: {assess_id:number, sect_1:string, sect_2:string, sect_3:string, sect_4:string, sect_5:string, sect_6:string};
  public saveButtonClicked: Subject<any> = new Subject();

  frmwrks: Array<any>;
  versions: Array<any>;
  variants: Array<any>;
  assetNodes: Array<any>;

  public form: FormGroup = new FormGroup({
    assess_id: new FormControl(''),
    sect_1: new FormControl('', Validators.required),
    sect_2: new FormControl(''),
    sect_3: new FormControl(''),
    sect_4: new FormControl(''),
    sect_5: new FormControl(''),
    sect_6: new FormControl('')
  });

  constructor(
    private assessmentService: AssessmentsConfigService,
    public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.loadDropdowns();
    this.form.controls['assess_id'].patchValue(this.editableRow.id);
    // this.form.controls['sect_1'].patchValue(this.editableRow.frmwrk_id);
    //   this.form.controls['version_id'].patchValue(this.editableRow.version_id);
    //   this.form.controls['variant_id'].patchValue(this.editableRow.variant_id);
  }

  editRow() {
    this.sections = this.form.getRawValue();
    //console.log(this.sections);
    this.saveButtonClicked.next(this.sections);
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

    //retrieve AssetNodes from Database
    this.assessmentService.getSectionNodes(this.editableRow.assetNodeId).subscribe(
      resp => {
        //console.log(resp);
        this.assetNodes = resp.map((t: any) => {
          return { label: t.name, value: t.assetNodeId }
        })
      }
    );
  }

    get sect_1() { return this.form.get('sect_1'); }
    get sect_2() { return this.form.get('sect_2'); }
    get sect_3() { return this.form.get('sect_3'); }
    get sect_4() { return this.form.get('sect_4'); }
    get sect_5() { return this.form.get('sect_5'); }
    get sect_6() { return this.form.get('sect_6'); }

}
