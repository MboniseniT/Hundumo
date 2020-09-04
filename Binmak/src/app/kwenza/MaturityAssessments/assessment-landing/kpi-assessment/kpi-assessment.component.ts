import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MDBModalService, ToastService, MDBModalRef } from 'ng-uikit-pro-standard';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { NgForm, NgModel, FormGroup, FormControl, Validators } from '@angular/forms';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { Level } from 'src/app/Models/Assessments/level';
import { Variant } from 'src/app/Models/Assessments/variant';
import { Version } from 'src/app/Models/Assessments/version';
import { Frmwrk } from 'src/app/Models/Assessments/frmwrk';
import { Result } from 'src/app/Models/Assessments/results';
import { LResult } from 'src/app/Models/Assessments/lResults';
import { Location } from '@angular/common';
import { Char } from 'src/app/Models/Assessments/char';
import { AppComponent } from 'src/app/app.component';
import { AreYouSureComponent } from '../../are-you-sure/are-you-sure.component';
import { KPI } from 'src/app/Models/Assessments/kpi';
import { Sections } from 'src/app/Models/Assessments/sections';
import { KpiResult } from 'src/app/Models/Assessments/kpiResult';

@Component({
  selector: 'app-kpi-assessment',
  templateUrl: './kpi-assessment.component.html',
  styleUrls: ['./kpi-assessment.component.scss']
})
export class KpiAssessmentComponent implements OnInit {

  @ViewChild('Form') addCharForm: NgForm;
  assessID:string = JSON.parse(localStorage.getItem("currentAssessment")).id;
  userID:string = JSON.parse(localStorage.getItem("currentUser")).userId;
  Frmwrk:string = JSON.parse(localStorage.getItem("currentAssessment")).frmwrk_id;
  Version:string = JSON.parse(localStorage.getItem("currentAssessment")).version_id;
  Variant:string = JSON.parse(localStorage.getItem("currentAssessment")).variant_id;
  kpa: KPA[] = [];
  kpi: KPI[] = [];
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
  iniKPI: KPI[] = []
  level: Level[] = [];
  char: any = {};
  selectedFrmwrk: number;
  selectedVersion: number;
  selectedVariant: number;
  frmwrk: Frmwrk[] = [];
  version: Version[] = [];
  variant: Variant[] = [];
  kpaLevel: any = {};
  level1:Char[];
  level2:Char[];
  level3:Char[];
  level4:Char[];
  level5:Char[];
  level1Results:LResult[];
  level2Results:LResult[];
  level3Results:LResult[];
  level4Results:LResult[];
  level5Results:LResult[];
  initlevel1Results:LResult[] = [
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false}
  ];
  initlevel2Results:LResult[] = [
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0}
  ];
  initlevel3Results:LResult[] = [
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0}
  ];
  initlevel4Results:LResult[] = [
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0}
  ];
  initlevel5Results:LResult[] = [
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0}
  ];
  runlevel1Results: LResult[] = [];
  runlevel2Results: LResult[] = [];
  runlevel3Results: LResult[] = [];
  runlevel4Results: LResult[] = [];
  runlevel5Results: LResult[] = [];
  results: any;
  iResult: Result;
  res: Result[];
  exists:boolean = false;

  restotalrecords: Number;
  level1totalRecords: Number; //might need to change type to string
  level2totalRecords: Number;
  level3totalRecords: Number;
  level4totalRecords: Number;
  level5totalRecords: Number;
  level1ResultstotalRecords: Number; //might need to change type to string
  level2ResultstotalRecords: Number;
  level3ResultstotalRecords: Number;
  level4ResultstotalRecords: Number;
  level5ResultstotalRecords: Number;
  frmwrktotalRecords: number;
  versiontotalRecords: number;
  varianttotalRecords: number;
  leveltotalRecords: number;
  KPAtotalRecords: number;
  KPItotalRecords: number;
  first:boolean;
  last:boolean;

  modalRef: MDBModalRef;

  // listen out for incoming message
  @Input() charID: string;
  @Input() kpaID: number;
  @Input() levelID: number;


  page:number = 0;
  isSaved:number;
  assessName:string = "";
  assessmentID: string;
  hasSections:boolean;
  sectCount:number;
  result:any;
  formRawValue:any;

  levels:Array<any>;

  public form: FormGroup = new FormGroup({
    kpaName: new FormControl({value: '', disabled: true}),
    kpiName: new FormControl({value: '', disabled: true}),
    description: new FormControl({value: '', disabled: true}),
    guideline: new FormControl({value: '', disabled: true}),
    innocence: new FormControl({value: '', disabled: true}),
    awareness: new FormControl({value: '', disabled: true}),
    understanding: new FormControl({value: '', disabled: true}),
    competence: new FormControl({value: '', disabled: true}),
    excellence: new FormControl({value: '', disabled: true}),
    all: new FormControl(''),
    sect_1: new FormControl({value:'',disabled:false}, Validators.required),
    sect_2: new FormControl('', Validators.required),
    sect_3: new FormControl('', Validators.required),
    sect_4: new FormControl('', Validators.required),
    sect_5: new FormControl('', Validators.required),
    sect_6: new FormControl('', Validators.required)
  });


  constructor(
    private route: ActivatedRoute,
    private assessmentService: AssessmentsConfigService,
    public _router: Router,
    public _location: Location,
    private modalService: MDBModalService,
    private toastrService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem('currentAssessment')){
      this.isSaved = Number(JSON.parse(localStorage.getItem('currentAssessment')).isSaved);
    this.assessName = JSON.parse(localStorage.getItem('currentAssessment')).assess_name;
    this.assessmentID = JSON.parse(localStorage.getItem('currentAssessment')).id;
    this.setHasSections();
    this.SavedProtect();
    this.NotAssignedProtect();
    }
    this.kpaID = this.route.snapshot.params['id'];
    this.getKPAs();
    this.getKPIs();
    this.getLevels();
    this.SectCount();
    this.kpaLevel = {
      "kpa_id": this.kpaID,
      "level_id": this.levelID
    };
    setTimeout(() => {
      if(this.kpaID === 1){
        this.first = true;
      }else{
        this.first = false;
      }

      if(this.kpaID === this.KPAtotalRecords){
        this.last = true;
      }else{
        this.last = false;
      }
    },500);
    setTimeout(() => {
      this.getResults();
      setTimeout(() => {
        this.setViewParams();
      },500);
    }, 500);
  }

  setHasSections(){
    if(JSON.parse(localStorage.getItem("currentAssessment"))[0]){
      this.hasSections = true;
      //console.log(this.hasSections);
    }else{
      this.hasSections = false;
      this.router.navigate(['/binmak/assessment-landing']);
      //console.log(this.hasSections);
    }
  }

  //refresh
  refresh(page: string): void{
    this._router.navigateByUrl("/"+page, {skipLocationChange:true}).then(() => {
      console.log(decodeURI(this._location.path()));
      this._router.navigate([decodeURI(this._location.path())]);
    });
  }

  //Init Methods
  getKPAs(){
    //retrieve KPAs from Database
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
  }

  getKPIs(){
    //retrieve KPAs from Database
    this.assessmentService.GetKPIs().subscribe(
      (data:KPI[]) => {
        this.kpi = data;
        //console.log(data);
        this.KPItotalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

  getLevels(){
     //retrieve Levels from Database
    this.assessmentService.getLevels().subscribe(
      resp => {
        this.levels = resp.map((t: any) => {
          return { label: t.name, value: t.id }
        })
      }
    );
  }

  SectCount(){
    this.sectCount = 6;
    if(!this.GetSections().section6){

      this.sectCount = this.sectCount - 1;
      this.sect_6.disable();
      console.log(this.sectCount);
    }else{
      this.sect_6.enable();
    }

    if(!this.GetSections().section5){

      this.sectCount = this.sectCount - 1;
      this.sect_5.disable();
      console.log(this.sectCount);
    }else{
      this.sect_5.enable();
    }

    if(!this.GetSections().section4){

      this.sectCount = this.sectCount - 1;
      this.sect_4.disable();
      console.log(this.sectCount);
    }else{
      this.sect_4.enable();
    }

    if(!this.GetSections().section3){

      this.sectCount = this.sectCount - 1;
      this.sect_3.disable();
      console.log(this.sectCount);
    }else{
      this.sect_3.enable();
    }

    if(!this.GetSections().section2){

      this.sectCount = this.sectCount - 1;
      this.sect_2.disable();
      console.log(this.sectCount);
    }else{
      this.sect_2.enable();
    }

    if(!this.GetSections().section1){

      this.sectCount = this.sectCount - 1;
      this.sect_1.disable();
      console.log(this.sectCount);
    }else{
      this.sect_1.enable();
    }
  }

  getResults(){

  }

  rslt1(){
    let i:number;
      let j:number;
      let charID:number;
      for(i=0; i < this.level1.length; i++){
        charID = this.level1[i].id
        //console.log('here');
        for(j=0; j < this.level1Results.length; j++){
          //console.log('now here');
          for(var key in this.level1Results[j]){
            //console.log('then here');
            if(key == "characteristic_id"){
              //console.log('key is characteristic');
              if(this.level1Results[j].characteristic_id == charID){
                //console.log('characteristic matches ' + charID);
                this.runlevel1Results.push(this.level1Results[j]);
                //console.log(this.runlevel1Results);
              }
            }
          }
        }
      }
      setTimeout(() => {
        this.initlevel1Results = this.runlevel1Results;
      }, 1000);
  }

  rslt2(){
    let i:number;
      let j:number;
      let charID:number;
      for(i=0; i < this.level2.length; i++){
        charID = this.level2[i].id
        //console.log('here');
        for(j=0; j < this.level2Results.length; j++){
          //console.log('now here');
          for(var key in this.level2Results[j]){
            //console.log('then here');
            if(key == "characteristic_id"){
              //console.log('key is characteristic');
              if(this.level2Results[j].characteristic_id == charID){
                //console.log('characteristic matches ' + charID);
                this.runlevel2Results.push(this.level2Results[j]);
                //console.log(this.runlevel2Results);
              }
            }
          }
        }
      }
      setTimeout(() => {
        this.initlevel2Results = this.runlevel2Results;
      }, 1000);
  }

  rslt3(){
    let i:number;
      let j:number;
      let charID:number;
      for(i=0; i < this.level3.length; i++){
        charID = this.level3[i].id
        //console.log('here');
        for(j=0; j < this.level3Results.length; j++){
          //console.log('now here');
          for(var key in this.level3Results[j]){
            //console.log('then here');
            if(key == "characteristic_id"){
              //console.log('key is characteristic');
              if(this.level3Results[j].characteristic_id == charID){
                //console.log('characteristic matches ' + charID);
                this.runlevel3Results.push(this.level3Results[j]);
                //console.log(this.runlevel3Results);
              }
            }
          }
        }
      }
      setTimeout(() => {
        this.initlevel3Results = this.runlevel3Results;
      }, 1000);
  }

  rslt4(){
    let i:number;
      let j:number;
      let charID:number;
      for(i=0; i < this.level4.length; i++){
        charID = this.level4[i].id
        //console.log('here');
        for(j=0; j < this.level4Results.length; j++){
          //console.log('now here');
          for(var key in this.level4Results[j]){
            //console.log('then here');
            if(key == "characteristic_id"){
              //console.log('key is characteristic');
              if(this.level4Results[j].characteristic_id == charID){
                //console.log('characteristic matches ' + charID);
                this.runlevel4Results.push(this.level4Results[j]);
                //console.log(this.runlevel4Results);
              }
            }
          }
        }
      }
      setTimeout(() => {
        this.initlevel4Results = this.runlevel4Results;
      }, 1000);
  }

  rslt5(){
    let i:number;
      let j:number;
      let charID:number;
      for(i=0; i < this.level5.length; i++){
        charID = this.level5[i].id
        //console.log('here');
        for(j=0; j < this.level5Results.length; j++){
          //console.log('now here');
          for(var key in this.level5Results[j]){
            //console.log('then here');
            if(key == "characteristic_id"){
              //console.log('key is characteristic');
              if(this.level5Results[j].characteristic_id == charID){
                //console.log('characteristic matches ' + charID);
                this.runlevel5Results.push(this.level5Results[j]);
                //console.log(this.runlevel5Results);
              }
            }
          }
        }
      }
      setTimeout(() => {
        this.initlevel5Results = this.runlevel5Results;
      }, 1000);
  }

  setViewParams(){
    if(this.level1ResultstotalRecords){
      this.rslt1();
      this.rslt2();
      this.rslt3();
      this.rslt4();
      this.rslt5();
    }

    if(this.KPAtotalRecords){
      this.initKPA = this.kpa;
      this.iniKPI = this.kpi;
      this.form.controls['description'].patchValue(this.kpi[this.page].description);
      this.form.controls['guideline'].patchValue(this.kpi[this.page].guideline);
      this.form.controls['innocence'].patchValue(this.kpi[this.page].innocence);
      this.form.controls['awareness'].patchValue(this.kpi[this.page].awareness);
      this.form.controls['understanding'].patchValue(this.kpi[this.page].understanding);
      this.form.controls['competence'].patchValue(this.kpi[this.page].competence);
      this.form.controls['excellence'].patchValue(this.kpi[this.page].excellence);
    }
  }

  GetSections():Sections{
    if(JSON.parse(localStorage.getItem('currentAssessment'))){
      return {
        sectionsId: JSON.parse(localStorage.getItem('currentAssessment'))[0].sectionsId,
        section1: JSON.parse(localStorage.getItem('currentAssessment'))[0].section1,
        section2: JSON.parse(localStorage.getItem('currentAssessment'))[0].section2,
        section3: JSON.parse(localStorage.getItem('currentAssessment'))[0].section3,
        section4: JSON.parse(localStorage.getItem('currentAssessment'))[0].section4,
        section5: JSON.parse(localStorage.getItem('currentAssessment'))[0].section5,
        section6: JSON.parse(localStorage.getItem('currentAssessment'))[0].section6
      }
    }
  }

  GetDescription(){
    if(this.kpi.length > 0){
      return this.kpi[this.page].description;
    }
  }

  GetGuideline(){
    if(this.kpi.length > 0){
      return this.kpi[this.page].guideline;
    }
  }

  GetInnocence(){
    if(this.kpi.length > 0){
      return this.kpi[this.page].innocence;
    }
  }

  GetAwareness(){
    if(this.kpi.length > 0){
      return this.kpi[this.page].awareness;
    }
  }

  GetUnderstanding(){
    if(this.kpi.length > 0){
      return this.kpi[this.page].understanding;
    }
  }

  GetCompetence(){
    if(this.kpi.length > 0){
      return this.kpi[this.page].competence;
    }
  }

  GetExcellence(){
    if(this.kpi.length > 0){
      return this.kpi[this.page].excellence;
    }
  }

  GetKpaId():number{
    if(this.kpi.length > 0){
      return this.kpi[this.page].kpa_id;
    }
  }

  GetKpiName():string{
    if(this.kpi.length > 0){
      return this.kpi[this.page].name;
    }
  }

  ConvertKPA(id:number):string{
    if(id === 0){
      return this.initKPA[0].name;
    }else if(id === 1){
      return this.initKPA[1].name;
    }else if(id === 2){
      return this.initKPA[2].name;
    }else if(id === 3){
      return this.initKPA[3].name;
    }else if(id === 4){
      return this.initKPA[4].name;
    }else if(id === 5){
      return this.initKPA[5].name;
    }else if(id === 6){
      return this.initKPA[6].name;
    }else if(id === 7){
      return this.initKPA[7].name;
    }else if(id === 8){
      return this.initKPA[8].name;
    }else if(id === 9){
      return this.initKPA[9].name;
    }else if(id === 10){
      return this.initKPA[10].name;
    }else if(id === 11){
      return this.initKPA[11].name;
    }else if(id === 12){
      return this.initKPA[12].name;
    }else if(id === 13){
      return this.initKPA[13].name;
    }else if(id === 14){
      return this.initKPA[14].name;
    }else if(id === 15){
      return this.initKPA[15].name;
    }else if(id === 16){
      return this.initKPA[16].name;
    }else{
      return "";
    }
  }

  //funtion Methods
  onAdd(){
    this.formRawValue = this.form.getRawValue();
    if(this.formRawValue.all){
      this.result = {
        kpi_id: this.kpi[this.page].id,
        assess_id: this.assessmentID,
        sect_1: this.formRawValue.all,
        sect_2: this.formRawValue.all,
        sect_3: this.formRawValue.all,
        sect_4: this.formRawValue.all,
        sect_5: this.formRawValue.all,
        sect_6: this.formRawValue.all,
      }
    }else{
      this.result = {
        kpi_id: this.kpi[this.page].id,
        assess_id: this.assessmentID,
        sect_1: this.formRawValue.sect_1,
        sect_2: this.formRawValue.sect_2,
        sect_3: this.formRawValue.sect_3,
        sect_4: this.formRawValue.sect_4,
        sect_5: this.formRawValue.sect_5,
        sect_6: this.formRawValue.sect_6,
      }
    }

    //console.log(this.result);
    this.SubmitResult(this.result);
  }

  SubmitResult(result){
    //Call funtion to update database
    this.assessmentService.AddKpiResults(result).toPromise().then((data: any) => {
      //console.log(data);
      // success notification
      this.toastrService.success('Successful!');
      setTimeout(() => {
        //update DataTable
      });
    }, error => {
      console.log('httperror: ');
        console.log(error);
        // error notification
        //this.formError = JSON.stringify(error.error.Message + " " +error.error.ModelState['']);
        this.toastrService.error(error);
    });
  }

  onUpdate(){
    this.results = this.addCharForm.value;
    let i: number;
    let ID: string;
    let resultID:string;
    let assess_id: string = JSON.parse(localStorage.getItem("currentAssessment")).id;
    let user_id: string = JSON.parse(localStorage.getItem("currentUser")).userId;
    let exists:boolean = false;
    //console.log(this.level1ResultstotalRecords);
    if(this.level1ResultstotalRecords === 0){
      //console.log('do nothing!');
    }else{
      //console.log('Result does exist! Editting...');
      for(i=0;i<this.level1totalRecords;i++){
        // Set Characteristic ID
        ID = this.level1[i].id.toString();
        resultID = this.level1Results[i].id.toString();
        //console.log(ID);
        // Process Result
      for(var key in this.results){
        if(key == ID){
          // Convert result to binary
          if(this.results[key] != false ){
            this.results[key] = 1;
          }else
          {
            this.results[key] = 0;
          }
          //console.log(this.results[key]);
          // Feed result into JSON
          this.iResult = {
            "characteristic_id": Number(ID),
            "assess_id": assess_id,
            "user_id":user_id,
            "kpa_id":this.kpaID,
            "level_id":this.level[0].id,
            "value":this.results[key]
          };
          //console.log(this.iResult);
          //Post result to API
            this.assessmentService.putResult(resultID.toString(),this.iResult).toPromise().then((data: any) => {
              //console.log(data);
              // success notification
              // alertify.success('Addition Successful!');
            }, error => {
              console.log('httperror: ');
                console.log(error);
                // error notification
                // alertify.error('httperror: '+error);
            });

          // Check if result exists before submitting
          //retrieve result from Database
          //console.log(ID);

        }
      }
      }
    }
    if(this.level2ResultstotalRecords === 0){
      //console.log('result exists!');
    }else{
      //console.log('Result does not exist!');
      for(i=0;i<this.level2totalRecords;i++){
        // Set Characteristic ID
        ID = this.level2[i].id.toString();
        resultID = this.level2Results[i].id.toString();
        //console.log(ID);
        // Process Result
      for(var key in this.results){
        if(key == ID){
          // Convert result to binary
          if(this.results[key] != false ){
            this.results[key] = 1;
          }else
          {
            this.results[key] = 0;
          }
          //console.log(this.results[key]);
          // Feed result into JSON
          this.iResult = {
            "characteristic_id": Number(ID),
            "assess_id": assess_id,
            "user_id":user_id,
            "kpa_id":this.kpaID,
            "level_id":this.level[1].id,
            "value":this.results[key]
          };
          //console.log(this.iResult);
          //Post result to API
          this.assessmentService.putResult(resultID.toString(),this.iResult).toPromise().then((data: any) => {
              //console.log(data);
              // success notification
              // alertify.success('Addition Successful!');
            }, error => {
              console.log('httperror: ');
                console.log(error);
                // error notification
                // alertify.error('httperror: '+error);
            });

          // Check if result exists before submitting
          //retrieve result from Database
          //console.log(ID);

        }
      }
      }
    }
    if(this.level3ResultstotalRecords === 0){
      //console.log('result exists!');
    }else{
      //console.log('Result does not exist!');
      for(i=0;i<this.level3totalRecords;i++){
        // Set Characteristic ID
        ID = this.level3[i].id.toString();
        resultID = this.level3Results[i].id.toString();
        //console.log(ID);
        // Process Result
      for(var key in this.results){
        if(key == ID){
          // Convert result to binary
          if(this.results[key] != false ){
            this.results[key] = 1;
          }else
          {
            this.results[key] = 0;
          }
          //console.log(this.results[key]);
          // Feed result into JSON
          this.iResult = {
            "characteristic_id": Number(ID),
            "assess_id": assess_id,
            "user_id":user_id,
            "kpa_id":this.kpaID,
            "level_id":this.level[2].id,
            "value":this.results[key]
          };
          //console.log(this.iResult);
          //Post result to API
          this.assessmentService.putResult(resultID.toString(),this.iResult).toPromise().then((data: any) => {
              //console.log(data);
              // success notification
              // alertify.success('Addition Successful!');
            }, error => {
              console.log('httperror: ');
                console.log(error);
                // error notification
                // alertify.error('httperror: '+error);
            });

          // Check if result exists before submitting
          //retrieve result from Database
          //console.log(ID);

        }
      }
      }
    }

    if(this.level4ResultstotalRecords === 0){
      //console.log('result exists!');
    }else{
      //console.log('Result does not exist!');
      for(i=0;i<this.level4totalRecords;i++){
        // Set Characteristic ID
        ID = this.level4[i].id.toString();
        resultID = this.level4Results[i].id.toString();
        //console.log(ID);
        // Process Result
      for(var key in this.results){
        if(key == ID){
          // Convert result to binary
          if(this.results[key] != false ){
            this.results[key] = 1;
          }else
          {
            this.results[key] = 0;
          }
          //console.log(this.results[key]);
          // Feed result into JSON
          this.iResult = {
            "characteristic_id": Number(ID),
            "assess_id": assess_id,
            "user_id":user_id,
            "kpa_id":this.kpaID,
            "level_id":this.level[3].id,
            "value":this.results[key]
          };
          //console.log(this.iResult);
          //Post result to API
          this.assessmentService.putResult(resultID.toString(),this.iResult).toPromise().then((data: any) => {
              //console.log(data);
              // success notification
              // alertify.success('Addition Successful!');
            }, error => {
              console.log('httperror: ');
                console.log(error);
                // error notification
                // alertify.error('httperror: '+error);
            });

          // Check if result exists before submitting
          //retrieve result from Database
          //console.log(ID);

        }
      }
      }
    }

    if(this.level5ResultstotalRecords === 0){
      //console.log('result exists!');
    }else{
      //console.log('Result does not exist!');
      for(i=0;i<this.level5totalRecords;i++){
        // Set Characteristic ID
        ID = this.level5[i].id.toString();
        resultID = this.level5Results[i].id.toString();
        //console.log(ID);
        // Process Result
      for(var key in this.results){
        if(key == ID){
          // Convert result to binary
          if(this.results[key] != false ){
            this.results[key] = 1;
          }else
          {
            this.results[key] = 0;
          }
          //console.log(this.results[key]);
          // Feed result into JSON
          this.iResult = {
            "characteristic_id": Number(ID),
            "assess_id": assess_id,
            "user_id":user_id,
            "kpa_id":this.kpaID,
            "level_id":this.level[4].id,
            "value":this.results[key]
          };
          //console.log(this.iResult);
          //Post result to API
          this.assessmentService.putResult(resultID.toString(),this.iResult).toPromise().then((data: any) => {
              //console.log(data);
              // success notification
              // alertify.success('Addition Successful!');
            }, error => {
              console.log('httperror: ');
                console.log(error);
                // error notification
                // alertify.error('httperror: '+error);
            });

          // Check if result exists before submitting
          //retrieve result from Database
          //console.log(ID);

        }
      }
      }
    }

  setTimeout(() => {
      //call refresh from AppComponent
      this.refresh("");
  },100);
  }

  onNext(){
    let newKpaID:number ;

    if(Number(this.kpaID) === this.KPAtotalRecords){
      newKpaID = Number(this.kpaID);
    }else{
      if(this.level1ResultstotalRecords){
        newKpaID = Number(this.kpaID) + 1;
      this._router.navigate(['/binmak/kpa-assessment/'+newKpaID.toString()]);
      setTimeout(() => {
      //call refresh from AppComponent
      this.refresh("");
    });
      }
    }
  }

  onBack(){
    let newKpaID:number;

    if(Number(this.kpaID) === 1){
      newKpaID = Number(this.kpaID);
    }else{
      newKpaID = Number(this.kpaID) - 1;
      this._router.navigate(['/binmak/kpa-assessment/'+newKpaID.toString()]);
      setTimeout(() => {
      //call refresh from AppComponent
      this.refresh("");
    });
    }
  }

  back(){
    this._router.navigate(['/binmak/exec-assessment-landing']);
  }

  GetAssessmentName(){
    if(this.assessName){
      return this.assessName;
    }else{
      return "";
    }

  }

  Visible(){
    if(this.assessName){
      return true;
    }else{
      return false;
    }
  }

  NotAssignedProtect(){
    if(!this.Visible()){
      this._router.navigate(['/binmak/exec-assessment-landing']);
    }
  }

  onClear(el: any){
    const modalOptions = {
      data: {
        editableRow: {message:"Are you sure you want to CLEAR all results associated with assessment: " + el.assess_name + "?"}
      }
    };
    this.modalRef = this.modalService.show(AreYouSureComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database
      this.assessmentService.clearAssessment(el).toPromise().then((data: any) => {
        // success notification
        this.toastrService.success('Cleared Successfully!');

      }, error => {
        console.log('httperror: ');
          console.log(error);
          // error notification
          //this.formError = JSON.stringify(error.error.Message + " " +error.error.ModelState['']);
          this.toastrService.error(JSON.stringify(error));
      });

    });
  }

  onSave(el: any){
    const modalOptions = {
      data: {
        editableRow: {message:"Are you sure you want to SAVE your results for assessment: " + el.assess_name + "? You will not be able to edit the assessment anymore."}
      }
    };
    this.modalRef = this.modalService.show(AreYouSureComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database
      this.assessmentService.SaveAssessment(el).toPromise().then((data: any) => {
        // success notification
        this.toastrService.success('Saved Successfully!');

      }, error => {
        console.log('httperror: ');
          console.log(error);
          // error notification
          //this.formError = JSON.stringify(error.error.Message + " " +error.error.ModelState['']);
          this.toastrService.error(JSON.stringify(error));
      });

    });
  }

  GetAssessment(){
    return JSON.parse(localStorage.getItem("currentAssessment"));
  }



  SavedProtect(){
    if (this.isSaved == 1) {
      console.log('here');
      this._router.navigate(['/binmak/exec-assessment-landing']);
    }
  }

  get all() { return this.form.get('all'); }
  get sect_1() { return this.form.get('sect_1'); }
      get sect_2() { return this.form.get('sect_2'); }
      get sect_3() { return this.form.get('sect_3'); }
      get sect_4() { return this.form.get('sect_4'); }
      get sect_5() { return this.form.get('sect_5'); }
      get sect_6() { return this.form.get('sect_6'); }
      get guideline() { return this.form.get('guideline'); }
      get innocence() { return this.form.get('innocence'); }
      get awareness() { return this.form.get('awareness'); }
      get understanding() { return this.form.get('understanding'); }
      get competence() { return this.form.get('competence'); }
      get excellence() { return this.form.get('excellence'); }

}
