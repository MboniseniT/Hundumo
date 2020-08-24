import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import { Frmwrk } from 'src/app/Models/Assessments/frmwrk';
import { Variant } from 'src/app/Models/Assessments/variant';
import { Version } from 'src/app/Models/Assessments/version';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { Assessment } from 'src/app/Models/Assessments/assessment';
import { KPA } from 'src/app/Models/Assessments/kpa';


@Component({
  selector: 'app-add-exec-assessment',
  templateUrl: './add-exec-assessment.component.html',
  styleUrls: ['./add-exec-assessment.component.scss']
})
export class AddExecAssessmentComponent implements OnInit {

  public editableRow: Assessment;
  public saveButtonClicked: Subject<any> = new Subject();

  frmwrks: Array<any>;
  versions: Array<any>;
  variants: Array<any>;
  assetNodes: Array<any>;

  opName:string;

  kpa: KPA[] = [];
  initKPA: KPA[] = [
    {"id":0,"name":"KPA1","description": "","user_id": null},
    {"id":0,"name":"KPA2","description": "","user_id": null},
    {"id":0,"name":"KPA3","description": "","user_id": null},
    {"id":0,"name":"KPA4","description": "","user_id": null},
    {"id":0,"name":"KPA5","description": "","user_id": null},
    {"id":0,"name":"KPA6","description": "","user_id": null},
    {"id":0,"name":"KPA7","description": "","user_id": null},
    {"id":0,"name":"KPA8","description": "","user_id": null},
    {"id":0,"name":"KPA9","description": "","user_id": null},
    {"id":0,"name":"KPA10","description": "","user_id": null},
    {"id":0,"name":"KPA11","description": "","user_id": null},
    {"id":0,"name":"KPA12","description": "","user_id": null},
    {"id":0,"name":"KPA13","description": "","user_id": null},
    {"id":0,"name":"KPA14","description": "","user_id": null},
    {"id":0,"name":"KPA15","description": "","user_id": null},
    {"id":0,"name":"KPA16","description": "","user_id": null},
    {"id":0,"name":"KPA17","description": "","user_id": null},
  ];

  KPAtotalRecords:number;

  public form: FormGroup = new FormGroup({
    assetNodeId: new FormControl('', Validators.required),
    assess_date: new FormControl('', Validators.required),
    assess_name: new FormControl({value: '', disabled: true}),
    user_id: new FormControl({value: '', disabled: true}),
    frmwrk_id: new FormControl('', Validators.required),
    version_id: new FormControl('', Validators.required),
    variant_id: new FormControl('', Validators.required),
    kpa1: new FormControl('', Validators.required),
    kpa2: new FormControl('', Validators.required),
    kpa3: new FormControl('', Validators.required),
    kpa4: new FormControl('', Validators.required),
    kpa5: new FormControl('', Validators.required),
    kpa6: new FormControl('', Validators.required),
    kpa7: new FormControl('', Validators.required),
    kpa8: new FormControl('', Validators.required),
    kpa9: new FormControl('', Validators.required),
    kpa10: new FormControl('', Validators.required),
    kpa11: new FormControl('', Validators.required),
    kpa12: new FormControl('', Validators.required),
    kpa13: new FormControl('', Validators.required),
    kpa14: new FormControl('', Validators.required),
    kpa15: new FormControl('', Validators.required),
    kpa16: new FormControl('', Validators.required),
    kpa17: new FormControl('', Validators.required)
  });

  constructor(
    private assessmentService: AssessmentsConfigService,
    public modalRef: MDBModalRef) { }

    ngOnInit() {
      this.loadDropdowns();
      this.loadKPAs();
      this.kpa1.disable();
      this.kpa2.disable();
      this.kpa3.disable();
      this.kpa4.disable();
      this.kpa5.disable();
      this.kpa6.disable();
      this.kpa7.disable();
      this.kpa8.disable();
      this.kpa9.disable();
      this.kpa10.disable();
      this.kpa11.disable();
      this.kpa12.disable();
      this.kpa13.disable();
      this.kpa14.disable();
      this.kpa15.disable();
      this.kpa16.disable();
      this.kpa17.disable();
    }

    onSave() {
      this.form.controls['user_id'].patchValue(JSON.parse(localStorage.getItem('currentUser')).userId);
      this.editableRow = this.form.getRawValue();
      //console.log(this.editableRow);
      this.saveButtonClicked.next(this.editableRow);
      this.modalRef.hide();
    }

    loadKPAs(){
      this.assessmentService.GetExecKPAs().subscribe(
        (data:KPA[]) => {
          this.kpa = data;
          //console.log(data);
          this.KPAtotalRecords = data.length;
        }, error => {
          console.log('httperror: ');
          console.log(error);
        }
      );

      setTimeout(() => {
      if(this.KPAtotalRecords){
        this.initKPA = this.kpa;
      }
    },500);
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
      this.assessmentService.getAssestNodes().subscribe(
        resp => {
          console.log(resp);
          this.assetNodes = resp.map((t: any) => {
            return { label: t.name, value: t.assetNodeId }
          })
        }
      );
    }

      get assetNodeId() { return this.form.get('assetNodeId'); }
      get assess_date() { return this.form.get('assess_date'); }
      get assess_name() { return this.form.get('assess_name'); }
      get frmwrk_id() { return this.form.get('frmwrk_id'); }
      get variant_id() { return this.form.get('variant_id'); }
      get version_id() { return this.form.get('version_id'); }
      get kpa1() { return this.form.get('kpa1'); }
      get kpa2() { return this.form.get('kpa2'); }
      get kpa3() { return this.form.get('kpa3'); }
      get kpa4() { return this.form.get('kpa4'); }
      get kpa5() { return this.form.get('kpa5'); }
      get kpa6() { return this.form.get('kpa6'); }
      get kpa7() { return this.form.get('kpa7'); }
      get kpa8() { return this.form.get('kpa8'); }
      get kpa9() { return this.form.get('kpa9'); }
      get kpa10() { return this.form.get('kpa10'); }
      get kpa11() { return this.form.get('kpa11'); }
      get kpa12() { return this.form.get('kpa12'); }
      get kpa13() { return this.form.get('kpa13'); }
      get kpa14() { return this.form.get('kpa14'); }
      get kpa15() { return this.form.get('kpa15'); }
      get kpa16() { return this.form.get('kpa16'); }
      get kpa17() { return this.form.get('kpa17'); }

      textBoxDisabled1 = true;
      textBoxDisabled2 = true;
      textBoxDisabled3 = true;
      textBoxDisabled4 = true;
      textBoxDisabled5 = true;
      textBoxDisabled6 = true;
      textBoxDisabled7 = true;
      textBoxDisabled8 = true;
      textBoxDisabled9 = true;
      textBoxDisabled10 = true;
      textBoxDisabled11 = true;
      textBoxDisabled12 = true;
      textBoxDisabled13 = true;
      textBoxDisabled14 = true;
      textBoxDisabled15 = true;
      textBoxDisabled16 = true;
      textBoxDisabled17 = true;

      toggleRadio1(kpaName:string){
        this.textBoxDisabled1 = !this.textBoxDisabled1;
        if(this.textBoxDisabled1){
          this.kpa1.reset();
          this.kpa1.disable();
        }else{
          this.form.controls['kpa1'].patchValue(kpaName);
          this.kpa1.enable();
        }
      }

      toggleRadio2(kpaName:string){
        this.textBoxDisabled2 = !this.textBoxDisabled2;
        if(this.textBoxDisabled2){
          this.kpa2.reset();
          this.kpa2.disable();
        }else{
          this.form.controls['kpa2'].patchValue(kpaName);
          this.kpa2.enable();
        }
      }

      toggleRadio3(kpaName:string){
        this.textBoxDisabled3 = !this.textBoxDisabled3;
        if(this.textBoxDisabled3){
          this.kpa3.reset();
          this.kpa3.disable();
        }else{
          this.form.controls['kpa3'].patchValue(kpaName);
          this.kpa3.enable();
        }
      }

      toggleRadio4(kpaName:string){
        this.textBoxDisabled4 = !this.textBoxDisabled4;
        if(this.textBoxDisabled4){
          this.kpa4.reset();
          this.kpa4.disable();
        }else{
          this.form.controls['kpa4'].patchValue(kpaName);
          this.kpa4.enable();
        }
      }

      toggleRadio5(kpaName:string){
        this.textBoxDisabled5 = !this.textBoxDisabled5;
        if(this.textBoxDisabled5){
          this.kpa5.reset();
          this.kpa5.disable();
        }else{
          this.form.controls['kpa5'].patchValue(kpaName);
          this.kpa5.enable();
        }
      }

      toggleRadio6(kpaName:string){
        this.textBoxDisabled6 = !this.textBoxDisabled6;
        if(this.textBoxDisabled6){
          this.kpa6.reset();
          this.kpa6.disable();
        }else{
          this.form.controls['kpa6'].patchValue(kpaName);
          this.kpa6.enable();
        }
      }

      toggleRadio7(kpaName:string){
        this.textBoxDisabled7 = !this.textBoxDisabled7;
        if(this.textBoxDisabled7){
          this.kpa7.reset();
          this.kpa7.disable();
        }else{
          this.form.controls['kpa7'].patchValue(kpaName);
          this.kpa7.enable();
        }
      }

      toggleRadio8(kpaName:string){
        this.textBoxDisabled8 = !this.textBoxDisabled8;
        if(this.textBoxDisabled8){
          this.kpa8.reset();
          this.kpa8.disable();
        }else{
          this.form.controls['kpa8'].patchValue(kpaName);
          this.kpa8.enable();
        }
      }

      toggleRadio9(kpaName:string){
        this.textBoxDisabled9 = !this.textBoxDisabled9;
        if(this.textBoxDisabled9){
          this.kpa9.reset();
          this.kpa9.disable();
        }else{
          this.form.controls['kpa9'].patchValue(kpaName);
          this.kpa9.enable();
        }
      }

      toggleRadio10(kpaName:string){
        this.textBoxDisabled10 = !this.textBoxDisabled10;
        if(this.textBoxDisabled10){
          this.kpa10.reset();
          this.kpa10.disable();
        }else{
          this.form.controls['kpa10'].patchValue(kpaName);
          this.kpa10.enable();
        }
      }

      toggleRadio11(kpaName:string){
        this.textBoxDisabled11 = !this.textBoxDisabled11;
        if(this.textBoxDisabled11){
          this.kpa11.reset();
          this.kpa11.disable();
        }else{
          this.form.controls['kpa11'].patchValue(kpaName);
          this.kpa11.enable();
        }
      }

      toggleRadio12(kpaName:string){
        this.textBoxDisabled12 = !this.textBoxDisabled12;
        if(this.textBoxDisabled12){
          this.kpa12.reset();
          this.kpa12.disable();
        }else{
          this.form.controls['kpa12'].patchValue(kpaName);
          this.kpa12.enable();
        }
      }

      toggleRadio13(kpaName:string){
        this.textBoxDisabled13 = !this.textBoxDisabled13;
        if(this.textBoxDisabled13){
          this.kpa13.reset();
          this.kpa13.disable();
        }else{
          this.form.controls['kpa13'].patchValue(kpaName);
          this.kpa13.enable();
        }
      }

      toggleRadio14(kpaName:string){
        this.textBoxDisabled14 = !this.textBoxDisabled14;
        if(this.textBoxDisabled14){
          this.kpa14.reset();
          this.kpa14.disable();
        }else{
          this.form.controls['kpa14'].patchValue(kpaName);
          this.kpa14.enable();
        }
      }

      toggleRadio15(kpaName:string){
        this.textBoxDisabled15 = !this.textBoxDisabled15;
        if(this.textBoxDisabled15){
          this.kpa15.reset();
          this.kpa15.disable();
        }else{
          this.form.controls['kpa15'].patchValue(kpaName);
          this.kpa15.enable();
        }
      }

      toggleRadio16(kpaName:string){
        this.textBoxDisabled16 = !this.textBoxDisabled16;
        if(this.textBoxDisabled16){
          this.kpa16.reset();
          this.kpa16.disable();
        }else{
          this.form.controls['kpa16'].patchValue(kpaName);
          this.kpa16.enable();
        }
      }

      toggleRadio17(kpaName:string){
        this.textBoxDisabled17 = !this.textBoxDisabled17;
        if(this.textBoxDisabled17){
          this.kpa17.reset();
          this.kpa17.disable();
        }else{
          this.form.controls['kpa17'].patchValue(kpaName);
          this.kpa17.enable();
        }
      }


}
