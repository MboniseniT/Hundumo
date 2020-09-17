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
import { BpQuestionTable } from 'src/app/Models/Assessments/bpQuestionTable';
import { BpResult } from 'src/app/Models/Assessments/bpResults';

@Component({
  selector: 'app-bp-assessment',
  templateUrl: './bp-assessment.component.html',
  styleUrls: ['./bp-assessment.component.scss']
})
export class BpAssessmentComponent implements OnInit {

  @ViewChild('Form') addCharForm: NgForm;
  assessID:string = JSON.parse(localStorage.getItem("currentAssessment")).id;
  userID:string = JSON.parse(localStorage.getItem("currentUser")).userId;
  Frmwrk:string = JSON.parse(localStorage.getItem("currentAssessment")).frmwrk_id;
  Version:string = JSON.parse(localStorage.getItem("currentAssessment")).version_id;
  Variant:string = JSON.parse(localStorage.getItem("currentAssessment")).variant_id;
  kpa: KPA[] = [];
  kpaBpQuestions: any[] = [];
  BpQuestions: BpQuestionTable[] = [];
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
  bpPage:number = 0;
  qstnPage:number = 0;
  isSaved:number;
  assessName:string = "";
  assessmentID: string;
  hasSections:boolean;
  sectCount:number;
  result:any;
  bpResult:BpResult;
  formRawValue:any;
  progress:any;
  resultsExist:boolean;

  levels:Array<any>;

  public form: FormGroup = new FormGroup({
    kpaName: new FormControl({value: '', disabled: true}),
    kpiName: new FormControl({value: '', disabled: true}),
    description: new FormControl({value: '', disabled: true}),
    question: new FormControl({value: '', disabled: true}),
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
    this.resultsExist = false;
    this.page = Number(this.route.snapshot.params['kpaPage']);
    this.bpPage = Number(this.route.snapshot.params['bpPage']);
    this.qstnPage = Number(this.route.snapshot.params['qstnPage']);
    this.getKPAs();
    this.getBpQuestions();
    this.getLevels();
    this.SectCount();
    this.GetProgress();
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

      setTimeout(() => {

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
      //console.log(decodeURI(this._location.path()));
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

  getBpQuestions(){
    this.assessmentService.GetFilteredTableBpQuestions(this.GetAssessment()).subscribe(
      (data:BpQuestionTable[]) => {
        this.BpQuestions = data;
        this.getResults();
        //console.log(this.BpQuestions);
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

  getLevels(){
    let yesNo:any[] = [{id: 1, name: "yes"},{id: 2, name: "no"}];

    this.levels = yesNo.map((t: any) => {
      return { label: t.name, value: t.id }
    })
     //retrieve Levels from Database
    // this.assessmentService.getLevels().subscribe(
    //   resp => {
    //     this.levels = resp.map((t: any) => {
    //       return { label: t.name, value: t.id }
    //     })
    //   }
    // );
  }

  SectCount(){
    this.sectCount = 6;
    if(!this.GetSections().section6){

      this.sectCount = this.sectCount - 1;
      this.sect_6.disable();
      //console.log(this.sectCount);
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

  setViewParams(){
    if(this.KPAtotalRecords){
      this.initKPA = this.kpa;
      // if(this.kpaBpQuestions){ //this.kpaBpQuestions[this.kpaPage].kpaBps[this.bpPage].bpQuestions
      //   console.log('kpas exist...');
      //   if(this.kpaBpQuestions[this.kpaPage].kpaBps){
      //     console.log('Bps exist under kpa ' + (this.kpaPage + 1));
      //     if(this.kpaBpQuestions[this.kpaPage].kpaBps[this.bpPage].bpQuestions.length > 0){
      //       console.log('Questions exist under kpa ' + (this.kpaPage + 1) + ', under BP ' + (this.bpPage + 1));
      //       console.log('loading page...');
      //       this.form.controls['description'].patchValue(this.kpaBpQuestions[this.kpaPage].kpaBps[this.bpPage].bpQuestions[this.qstnPage].qstnDescription);
      //       this.form.controls['question'].patchValue(this.kpaBpQuestions[this.kpaPage].kpaBps[this.bpPage].bpQuestions[this.qstnPage].qstnQuestion);
      //       this.SetResults();
      //       this.ProceedToNextPage(this.kpaPage, this.bpPage, this.qstnPage);
      //     }else{
      //       if((this.bpPage + 1) != this.kpaBpQuestions[this.kpaPage].kpaBps.length){
      //         this.bpPage = Number(this.bpPage) + 1;
      //         //load new page...
      //         this.ProceedToNextPage(this.kpaPage, this.bpPage, this.qstnPage);
      //         setTimeout(() => {
      //           this.refresh("/");
      //         });

      //       }else{
      //         if((this.kpaPage + 1) != this.kpaBpQuestions.length){
      //           this.kpaPage = Number(this.kpaPage) + 1;
      //           this.bpPage = 0;
      //           this.qstnPage = 0;
      //           //load new page...
      //           this.ProceedToNextPage(this.kpaPage, this.bpPage, this.qstnPage);
      //           setTimeout(() => {
      //             this.refresh("/");
      //           });
      //         }
      //       }
      //     }

      //   }else{
      //     if((this.kpaPage + 1) != this.kpaBpQuestions.length){
      //       this.kpaPage = Number(this.kpaPage) + 1;
      //       //load new page...
      //       this.ProceedToNextPage(this.kpaPage, this.bpPage, this.qstnPage);
      //       setTimeout(() => {
      //         this.refresh("/");
      //       });
      //     }
      //   }
      //   //this.bpPage = Number(this.bpPage) + 1
      // }else{
      //   console.log('there are questions...');
      // }
      setTimeout(() => {
      //   this.form.controls['description'].patchValue(this.BpQuestions[this.page].qstnDescription);
      // this.form.controls['question'].patchValue(this.BpQuestions[this.page].qstnQuestion);
      this.SetResults();
      });

    }
  }

  SetResults(){
    setTimeout(() => {
      this.form.controls['sect_1'].patchValue(this.GetSection1Result());
      this.form.controls['sect_2'].patchValue(this.GetSection2Result());
      this.form.controls['sect_3'].patchValue(this.GetSection3Result());
      this.form.controls['sect_4'].patchValue(this.GetSection4Result());
      this.form.controls['sect_5'].patchValue(this.GetSection5Result());
      this.form.controls['sect_6'].patchValue(this.GetSection6Result());
    });
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

  getResults(){
    //retrieve KPI Results from Database
    this.assessmentService.GetBpResultById(this.GetBpQuestionId(this.page),Number(this.assessmentID)).subscribe(
      (data:BpResult) => {
        this.bpResult = data;
        this.setViewParams();
        this.resultsExist = true;
        //console.log(data);
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

  GetSection1Result(){
    if(this.bpResult){
      return this.bpResult.sect_1;
    }
  }
  GetSection2Result(){
    if(this.bpResult){
      return this.bpResult.sect_2;
    }
  }
  GetSection3Result(){
    if(this.bpResult){
      return this.bpResult.sect_3;
    }
  }
  GetSection4Result(){
    if(this.bpResult){
      return this.bpResult.sect_4;
    }
  }
  GetSection5Result(){
    if(this.bpResult){
      return this.bpResult.sect_5;
    }
  }
  GetSection6Result(){
    if(this.bpResult){
      return this.bpResult.sect_6;
    }
  }

  GetBpQuestionId(page){
    if(this.BpQuestions.length > 0){
      //console.log('here...');
      if(this.BpQuestions[page]){
        return this.BpQuestions[page].qstnID;
      }
  }
  }

  GetDescription(){
    if(this.BpQuestions.length > 0){
        //console.log('here...');
        return this.BpQuestions[this.page].qstnDescription;
    }
  }

  GetQuestion(){
    if(this.BpQuestions.length > 0){
      //console.log('here...');
      return this.BpQuestions[this.page].qstnQuestion;
  }
  }

  GetKpaId(p:number):number{
    if(this.BpQuestions.length > 0){
      //console.log('here...');
      return this.BpQuestions[this.page].qstnKpaID;
  }
  }

  GetBpId(p:number):number{
    if(this.BpQuestions.length > 0){
      //console.log('here...');
      return this.BpQuestions[this.page].qstnBpID;
  }
  }

  GetBpName():string{
    if(this.BpQuestions.length > 0){
      //console.log('here...');
      return this.BpQuestions[this.page].qstnBpName;
  }
  }

  ConvertKPA(id:number):string{
    if(id === 0){
      //return this.initKPA[0].name;
      return this.GetAssessment().kpa1;
    }else if(id === 1){
      //return this.initKPA[0].name;
      return this.GetAssessment().kpa1;
    }else if(id === 2){
      //return this.initKPA[1].name;
      return this.GetAssessment().kpa2;
    }else if(id === 3){
      //return this.initKPA[2].name;
      return this.GetAssessment().kpa3;
    }else if(id === 4){
      //return this.initKPA[3].name;
      return this.GetAssessment().kpa4;
    }else if(id === 5){
      //return this.initKPA[4].name;
      return this.GetAssessment().kpa5;
    }else if(id === 6){
      //return this.initKPA[5].name;
      return this.GetAssessment().kpa6;
    }else if(id === 7){
      //return this.initKPA[6].name;
      return this.GetAssessment().kpa7;
    }else if(id === 8){
      //return this.initKPA[7].name;
      return this.GetAssessment().kpa8;
    }else if(id === 9){
      //return this.initKPA[8].name;
      return this.GetAssessment().kpa9;
    }else if(id === 10){
      //return this.initKPA[9].name;
      return this.GetAssessment().kpa10;
    }else if(id === 11){
      //return this.initKPA[10].name;
      return this.GetAssessment().kpa11;
    }else if(id === 12){
      //return this.initKPA[11].name;
      return this.GetAssessment().kpa12;
    }else if(id === 13){
      //return this.initKPA[12].name;
      return this.GetAssessment().kpa13;
    }else if(id === 14){
      //return this.initKPA[13].name;
      return this.GetAssessment().kpa14;
    }else if(id === 15){
      //return this.initKPA[14].name;
      return this.GetAssessment().kpa15;
    }else if(id === 16){
      //return this.initKPA[15].name;
      return this.GetAssessment().kpa16;
    }else if(id === 17){
      //return this.initKPA[16].name;
      return this.GetAssessment().kpa17;
    }else{
      return "";
    }
  }

  //funtion Methods
  onAdd(){
    this.formRawValue = this.form.getRawValue();
    if(this.formRawValue.all){
      if(this.sectCount == 6){
        this.result = {
          bpQuestion_id: this.BpQuestions[this.page].qstnID,
          assess_id: this.assessmentID,
          sect_1: this.formRawValue.all,
          sect_2: this.formRawValue.all,
          sect_3: this.formRawValue.all,
          sect_4: this.formRawValue.all,
          sect_5: this.formRawValue.all,
          sect_6: this.formRawValue.all,
        }
      }else if(this.sectCount == 5){
        this.result = {
          bpQuestion_id: this.BpQuestions[this.page].qstnID,
          assess_id: this.assessmentID,
          sect_1: this.formRawValue.all,
          sect_2: this.formRawValue.all,
          sect_3: this.formRawValue.all,
          sect_4: this.formRawValue.all,
          sect_5: this.formRawValue.all,
          sect_6: this.formRawValue.sect_6,
        }
      }else if(this.sectCount == 4){
        this.result = {
          bpQuestion_id: this.BpQuestions[this.page].qstnID,
          assess_id: this.assessmentID,
          sect_1: this.formRawValue.all,
          sect_2: this.formRawValue.all,
          sect_3: this.formRawValue.all,
          sect_4: this.formRawValue.all,
          sect_5: this.formRawValue.sect_5,
          sect_6: this.formRawValue.sect_6,
        }
      }else if(this.sectCount == 3){
        this.result = {
          bpQuestion_id: this.BpQuestions[this.page].qstnID,
          assess_id: this.assessmentID,
          sect_1: this.formRawValue.all,
          sect_2: this.formRawValue.all,
          sect_3: this.formRawValue.all,
          sect_4: this.formRawValue.sect_4,
          sect_5: this.formRawValue.sect_5,
          sect_6: this.formRawValue.sect_6,
        }
      }else if(this.sectCount == 2){
        this.result = {
          bpQuestion_id: this.BpQuestions[this.page].qstnID,
          assess_id: this.assessmentID,
          sect_1: this.formRawValue.all,
          sect_2: this.formRawValue.all,
          sect_3: this.formRawValue.sect_3,
          sect_4: this.formRawValue.sect_4,
          sect_5: this.formRawValue.sect_5,
          sect_6: this.formRawValue.sect_6,
        }
      }else if(this.sectCount == 1){
        this.result = {
          bpQuestion_id: this.BpQuestions[this.page].qstnID,
          assess_id: this.assessmentID,
          sect_1: this.formRawValue.all,
          sect_2: this.formRawValue.sect_2,
          sect_3: this.formRawValue.sect_3,
          sect_4: this.formRawValue.sect_4,
          sect_5: this.formRawValue.sect_5,
          sect_6: this.formRawValue.sect_6,
        }
      }
    }else{
      this.result = {
        bpQuestion_id: this.BpQuestions[this.page].qstnID,
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
    this.assessmentService.AddBPResults(result).toPromise().then((data: any) => {
      this.bpResult = data;
      //console.log(this.kpiResult);

      // success notification
      this.toastrService.success('Successful!');
        this.onNext();
    }, error => {
      console.log('httperror: ');
        console.log(error);
        // error notification
        //this.formError = JSON.stringify(error.error.Message + " " +error.error.ModelState['']);
        this.toastrService.error(error);
    });
  }

  UpdateResult(result){
    //Call funtion to update database
    this.assessmentService.UpdateBpResults(result).toPromise().then((data: any) => {
      //console.log(data);
      // success notification
      this.toastrService.success('Successful!');
      setTimeout(() => {
        //update View
        //this.SetResults();
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
    this.formRawValue = this.form.getRawValue();
    if(this.formRawValue.all){
      if(this.sectCount == 6){
        this.result = {
          id: this.bpResult.id,
          bpQuestion_id: this.BpQuestions[this.page].qstnID,
          assess_id: this.assessmentID,
          sect_1: this.formRawValue.all,
          sect_2: this.formRawValue.all,
          sect_3: this.formRawValue.all,
          sect_4: this.formRawValue.all,
          sect_5: this.formRawValue.all,
          sect_6: this.formRawValue.all,
        }
      }else if(this.sectCount == 5){
        this.result = {
          id: this.bpResult.id,
          bpQuestion_id: this.BpQuestions[this.page].qstnID,
          assess_id: this.assessmentID,
          sect_1: this.formRawValue.all,
          sect_2: this.formRawValue.all,
          sect_3: this.formRawValue.all,
          sect_4: this.formRawValue.all,
          sect_5: this.formRawValue.all,
          sect_6: this.formRawValue.sect_6,
        }
      }else if(this.sectCount == 4){
        this.result = {
          id: this.bpResult.id,
          bpQuestion_id: this.BpQuestions[this.page].qstnID,
          assess_id: this.assessmentID,
          sect_1: this.formRawValue.all,
          sect_2: this.formRawValue.all,
          sect_3: this.formRawValue.all,
          sect_4: this.formRawValue.all,
          sect_5: this.formRawValue.sect_5,
          sect_6: this.formRawValue.sect_6,
        }
      }else if(this.sectCount == 3){
        this.result = {
          id: this.bpResult.id,
          bpQuestion_id: this.BpQuestions[this.page].qstnID,
          assess_id: this.assessmentID,
          sect_1: this.formRawValue.all,
          sect_2: this.formRawValue.all,
          sect_3: this.formRawValue.all,
          sect_4: this.formRawValue.sect_4,
          sect_5: this.formRawValue.sect_5,
          sect_6: this.formRawValue.sect_6,
        }
      }else if(this.sectCount == 2){
        this.result = {
          id: this.bpResult.id,
          bpQuestion_id: this.BpQuestions[this.page].qstnID,
          assess_id: this.assessmentID,
          sect_1: this.formRawValue.all,
          sect_2: this.formRawValue.all,
          sect_3: this.formRawValue.sect_3,
          sect_4: this.formRawValue.sect_4,
          sect_5: this.formRawValue.sect_5,
          sect_6: this.formRawValue.sect_6,
        }
      }else if(this.sectCount == 1){
        this.result = {
          id: this.bpResult.id,
          bpQuestion_id: this.BpQuestions[this.page].qstnID,
          assess_id: this.assessmentID,
          sect_1: this.formRawValue.all,
          sect_2: this.formRawValue.sect_2,
          sect_3: this.formRawValue.sect_3,
          sect_4: this.formRawValue.sect_4,
          sect_5: this.formRawValue.sect_5,
          sect_6: this.formRawValue.sect_6,
        }
      }
    }else{
      this.result = {
        id: this.bpResult.id,
        bpQuestion_id: this.BpQuestions[this.page].qstnID,
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
    this.UpdateResult(this.result);
  }



  onNext(){
    let newPage:number;
        if((this.page + 1) === this.BpQuestions.length){
          //Do nothing...
        }else{
          newPage = Number(this.page) + 1;
          if((this.form.valid || this.all.dirty) && this.bpResult){
            //console.log('form is valid & kpiResult is not null. Go to next page.');
           this.ProceedToNextPage(newPage);

          }else{
            //console.log('form may be not valid or kpiResult maybe null. Do not proceed to next page.');
          }
        }
      }

  ProceedToNextPage(newPage:number){
    this.assessmentService.GetBpResultById(this.GetBpQuestionId(newPage),Number(this.assessmentID)).subscribe(
      (data:BpResult) => {
        this.bpResult = data;
        //console.log(this.kpiResult);
        this.page = newPage;
        //this.setViewParams();
         this._router.navigate(['/binmak/bp-assessment/'+ this.page +'/0/0']);
         setTimeout(() => {
          this.refresh("/");
        });

        //console.log(data);
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

  onBack(){
    let newPage:number;
    if(this.page === 0){
      //Do nothing...
    }else{
      newPage = this.page - 1;
        this.ProceedToNextPage(newPage);

    }
  }

  back(){
    this._router.navigate(['/binmak/assessment-landing']);
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
      this._router.navigate(['/binmak/assessment-landing']);
    }
  }

  allHide(){
    if(this.sect_1.dirty || this.sect_2.dirty || this.sect_3.dirty || this.sect_4.dirty || this.sect_5.dirty || this.sect_6.dirty){
      return true;
    }else{
      return false;
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

  GetProgress(){
    //retrieve Progress values Results from Database
    this.assessmentService.GetBpProgress(this.GetAssessment()).subscribe(
      (data:any) => {
        this.progress = data;
        //console.log(data);
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

  GetAssessProgress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].assessProgress));
    }
  }

  GetKpa1Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa1Progress));
    }
  }
  GetKpa2Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa2Progress));
    }
  }
  GetKpa3Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa3Progress));
    }
  }
  GetKpa4Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa4Progress));
    }
  }
  GetKpa5Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa5Progress));
    }
  }
  GetKpa6Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa6Progress));
    }
  }
  GetKpa7Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa7Progress));
    }
  }
  GetKpa8Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa8Progress));
    }
  }
  GetKpa9Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa9Progress));
    }
  }
  GetKpa10Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa10Progress));
    }
  }
  GetKpa11Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa11Progress));
    }
  }
  GetKpa12Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa12Progress));
    }
  }
  GetKpa13Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa13Progress));
    }
  }
  GetKpa14Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa14Progress));
    }
  }
  GetKpa15Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa15Progress));
    }
  }
  GetKpa16Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa16Progress));
    }
  }
  GetKpa17Progress(){
    if(this.progress){
      return Math.round(Number(this.progress[0].kpa17Progress));
    }
  }

  GetKpiTotalScore(){
    if(this.progress){
      return Math.round(Number(this.progress[0].totalScore));
    }
  }

  SkipToKPA(kpa:number){
    let newPage:number;
    let result;
    //console.log('skipping to '+kpa);
    //console.log(this.SearchForSkipLocation(kpa));

    newPage = this.SearchForSkipLocation(kpa);
        //console.log('form is valid & kpiResult is not null. Go to next page.');
        this.assessmentService.GetBpResultById(this.GetBpQuestionId(newPage),Number(this.assessmentID)).subscribe(
          (data:BpResult) => {
            result = data;
            //console.log(result);
            if(result){
            this.page = newPage;
            //this.bpResult = result;
            //this.setViewParams();
            this._router.navigate(['/binmak/bp-assessment/'+ this.page +'/0/0']);
            setTimeout(() => {
              this.refresh("/");
            });
            }else{
              this.toastrService.warning('You can only skip to a section that you have already covered!');
            }

            //console.log(data);
          }, error => {
            console.log('httperror: ');
            console.log(error);
          }
        );

  }

  DeactivateKPA1(){
    if(this.GetAssessment().kpa1 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA2(){
    //console.log(this.GetAssessment().kpa2);
    if(this.GetAssessment().kpa2 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA3(){
    //console.log(this.GetAssessment().kpa3);
    if(this.GetAssessment().kpa3 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA4(){
    //console.log(this.GetAssessment().kpa4);
    if(this.GetAssessment().kpa4 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA5(){
    //console.log(this.GetAssessment().kpa5);
    if(this.GetAssessment().kpa5 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA6(){
    //console.log(this.GetAssessment().kpa6);
    if(this.GetAssessment().kpa6 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA7(){
    //console.log(this.GetAssessment().kpa7);
    if(this.GetAssessment().kpa7 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA8(){
    //console.log(this.GetAssessment().kpa8);
    if(this.GetAssessment().kpa8 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA9(){
    //console.log(this.GetAssessment().kpa9);
    if(this.GetAssessment().kpa9 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA10(){
    //console.log(this.GetAssessment().kpa10);
    if(this.GetAssessment().kpa10 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA11(){
    //console.log(this.GetAssessment().kpa11);
    if(this.GetAssessment().kpa11 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA12(){
    //console.log(this.GetAssessment().kpa12);
    if(this.GetAssessment().kpa12 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA13(){
    //console.log(this.GetAssessment().kpa13);
    if(this.GetAssessment().kpa13 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA14(){
    //console.log(this.GetAssessment().kpa14);
    if(this.GetAssessment().kpa14 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA15(){
    //console.log(this.GetAssessment().kpa15);
    if(this.GetAssessment().kpa15 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA16(){
    //console.log(this.GetAssessment().kpa16);
    if(this.GetAssessment().kpa16 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA17(){
    //console.log(this.GetAssessment().kpa17);
    if(this.GetAssessment().kpa17 == ""){
      return true;
    }else{
      return false;
    }
  }

  SearchForSkipLocation(kpa){
    let p:number;
    for(p = 0; p < this.BpQuestions.length; p++){
      if(Number(this.BpQuestions[p].qstnKpaID) === kpa){
        return p;
      }
    }
  }

  SavedProtect(){
    if (this.isSaved == 1) {
      console.log('here');
      this._router.navigate(['/binmak/assessment-landing']);
    }
  }

  get all() { return this.form.get('all'); }
  get sect_1() { return this.form.get('sect_1'); }
      get sect_2() { return this.form.get('sect_2'); }
      get sect_3() { return this.form.get('sect_3'); }
      get sect_4() { return this.form.get('sect_4'); }
      get sect_5() { return this.form.get('sect_5'); }
      get sect_6() { return this.form.get('sect_6'); }
      get question() { return this.form.get('question'); }

}
