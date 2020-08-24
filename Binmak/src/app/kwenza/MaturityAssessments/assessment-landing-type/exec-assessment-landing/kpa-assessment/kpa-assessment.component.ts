import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { NgForm, NgModel } from '@angular/forms';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { Level } from 'src/app/Models/Assessments/level';
import { Variant } from 'src/app/Models/Assessments/variant';
import { Version } from 'src/app/Models/Assessments/version';
import { Frmwrk } from 'src/app/Models/Assessments/frmwrk';
import { Result } from 'src/app/Models/Assessments/results'
import { LResult } from 'src/app/Models/Assessments/lResults'
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Char } from 'src/app/Models/Assessments/char';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-kpa-assessment',
  templateUrl: './kpa-assessment.component.html',
  styleUrls: ['./kpa-assessment.component.scss']
})
export class KpaAssessmentComponent implements OnInit {

  @ViewChild('Form') addCharForm: NgForm;
  assessID:string = localStorage.getItem("assessID");
  userID:number = Number(localStorage.getItem("userID"));
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
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": false}
  ];
  initlevel2Results:LResult[] = [
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0}
  ];
  initlevel3Results:LResult[] = [
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0}
  ];
  initlevel4Results:LResult[] = [
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0}
  ];
  initlevel5Results:LResult[] = [
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"ID": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0}
  ];
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
  first:boolean;
  last:boolean;

  // listen out for incoming message
  @Input() charID: string;
  @Input() kpaID: number;
  @Input() levelID: number;
  public assessmentID: string;
  private AppComponentReset: AppComponent;
  constructor(
              private route: ActivatedRoute,
              private assessmentService: AssessmentsConfigService,
              public _router: Router,
              public _location: Location
  ) { }

  ngOnInit() {
    this.kpaID = this.route.snapshot.params['id'];
    // localStorage.setItem("frmwrk", "1");
    // localStorage.setItem("version", "1");
    // localStorage.setItem("variant", "1");
    this.getKPAs();
    this.getLevels();

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
      this.getCharacteristics();
    },500);
    setTimeout(() => {
      this.getResults();
      setTimeout(() => {
        this.setViewParams();
      },500);
    }, 500);
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
        console.log(data);
        this.KPAtotalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }
  getLevels(){
     //retrieve Levels from Database
    this.assessmentService.getLevels().subscribe(
      (data:Level[]) => {
        this.level = data;
        console.log(data);
        this.leveltotalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

  getCharacteristics(){
    // Get Characteristic descriptions
    this.assessmentService.getRunKPALevelChars(this.kpaID.toString(),this.level[0].id.toString(), localStorage.getItem("frmwrk"), localStorage.getItem("version"), localStorage.getItem("variant")).subscribe(
      (data:Char[]) => {
        this.level1 = data;
        console.log(data);
        this.level1totalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.assessmentService.getRunKPALevelChars(this.kpaID.toString(),this.level[1].id.toString(), localStorage.getItem("frmwrk"), localStorage.getItem("version"), localStorage.getItem("variant")).subscribe(
      (data:Char[]) => {
        this.level2 = data;
        console.log(data);
        this.level2totalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.assessmentService.getRunKPALevelChars(this.kpaID.toString(),this.level[2].id.toString(), localStorage.getItem("frmwrk"), localStorage.getItem("version"), localStorage.getItem("variant")).subscribe(
      (data:Char[]) => {
        this.level3 = data;
        console.log(data);
        this.level3totalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.assessmentService.getRunKPALevelChars(this.kpaID.toString(),this.level[3].id.toString(), localStorage.getItem("frmwrk"), localStorage.getItem("version"), localStorage.getItem("variant")).subscribe(
      (data:Char[]) => {
        this.level4 = data;
        console.log(data);
        this.level4totalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.assessmentService.getRunKPALevelChars(this.kpaID.toString(),this.level[4].id.toString(), localStorage.getItem("frmwrk"), localStorage.getItem("version"), localStorage.getItem("variant")).subscribe(
      (data:Char[]) => {
        this.level5 = data;
        console.log(data);
        this.level5totalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );

  }

  getResults(){
    // Get results for different levels
    this.assessmentService.getCurrentUserResults(this.kpaID.toString(),this.level[0].id.toString(), this.assessID, this.userID).subscribe(
      (r1:LResult[]) => {
        this.level1Results = r1;
        console.log(r1);
        this.level1ResultstotalRecords = r1.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.assessmentService.getCurrentUserResults(this.kpaID.toString(),this.level[1].id.toString(), this.assessID, this.userID).subscribe(
      (data:LResult[]) => {
        this.level2Results = data;
        console.log(data);
        this.level2ResultstotalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.assessmentService.getCurrentUserResults(this.kpaID.toString(),this.level[2].id.toString(), this.assessID, this.userID).subscribe(
      (data:LResult[]) => {
        this.level3Results = data;
        console.log(data);
        this.level3ResultstotalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.assessmentService.getCurrentUserResults(this.kpaID.toString(),this.level[3].id.toString(), this.assessID, this.userID).subscribe(
      (data:LResult[]) => {
        this.level4Results = data;
        console.log(data);
        this.level4ResultstotalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.assessmentService.getCurrentUserResults(this.kpaID.toString(),this.level[4].id.toString(), this.assessID, this.userID).subscribe(
      (data:LResult[]) => {
        this.level5Results = data;
        console.log(data);
        this.level5ResultstotalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

  setViewParams(){
    if(this.level1ResultstotalRecords){
      this.initlevel1Results = this.level1Results;
      this.initlevel2Results = this.level2Results;
      this.initlevel3Results = this.level3Results;
      this.initlevel4Results = this.level4Results;
      this.initlevel5Results = this.level5Results;
    }

    if(this.KPAtotalRecords){
      this.initKPA = this.kpa;
    }
  }

  //funtion Methods
  onAdd(){

    this.results = this.addCharForm.value;
    let i: number;
    let ID: string;
    let assess_id: string = localStorage.getItem("assessID");
    let user_id: number = Number(localStorage.getItem("userID"));
    let exists:boolean = false;
    console.log(this.level1ResultstotalRecords);
    if(this.level1ResultstotalRecords > 0){
      console.log('result exists!');
    }else{
      console.log('Result does not exist!');
      for(i=0;i<this.level1totalRecords;i++){
        // Set Characteristic ID
        ID = this.level1[i].id.toString();
        console.log(ID);
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
          console.log(this.results[key]);
          // Feed result into JSON
          this.iResult = {
            "characteristic_id": Number(ID),
            "assess_id": assess_id,
            "user_id":user_id,
            "kpa_id":this.kpaID,
            "level_id":this.level[0].id,
            "value":this.results[key]
          };
          console.log(this.iResult);
          //Post result to API
            this.assessmentService.postResult(this.iResult).toPromise().then((data: any) => {
              console.log(data);
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
          console.log(ID);

        }
      }
      }
    }
    if(this.level2ResultstotalRecords > 0){
      console.log('result exists!');
    }else{
      console.log('Result does not exist!');
      for(i=0;i<this.level2totalRecords;i++){
        // Set Characteristic ID
        ID = this.level2[i].id.toString();
        console.log(ID);
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
          console.log(this.results[key]);
          // Feed result into JSON
          this.iResult = {
            "characteristic_id": Number(ID),
            "assess_id": assess_id,
            "user_id":user_id,
            "kpa_id":this.kpaID,
            "level_id":this.level[1].id,
            "value":this.results[key]
          };
          console.log(this.iResult);
          //Post result to API
            this.assessmentService.postResult(this.iResult).toPromise().then((data: any) => {
              console.log(data);
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
          console.log(ID);

        }
      }
      }
    }
    if(this.level3ResultstotalRecords > 0){
      console.log('result exists!');
    }else{
      console.log('Result does not exist!');
      for(i=0;i<this.level3totalRecords;i++){
        // Set Characteristic ID
        ID = this.level3[i].id.toString();
        console.log(ID);
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
          console.log(this.results[key]);
          // Feed result into JSON
          this.iResult = {
            "characteristic_id": Number(ID),
            "assess_id": assess_id,
            "user_id":user_id,
            "kpa_id":this.kpaID,
            "level_id":this.level[2].id,
            "value":this.results[key]
          };
          console.log(this.iResult);
          //Post result to API
            this.assessmentService.postResult(this.iResult).toPromise().then((data: any) => {
              console.log(data);
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
          console.log(ID);

        }
      }
      }
    }

    if(this.level4ResultstotalRecords > 0){
      console.log('result exists!');
    }else{
      console.log('Result does not exist!');
      for(i=0;i<this.level4totalRecords;i++){
        // Set Characteristic ID
        ID = this.level4[i].id.toString();
        console.log(ID);
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
          console.log(this.results[key]);
          // Feed result into JSON
          this.iResult = {
            "characteristic_id": Number(ID),
            "assess_id": assess_id,
            "user_id":user_id,
            "kpa_id":this.kpaID,
            "level_id":this.level[3].id,
            "value":this.results[key]
          };
          console.log(this.iResult);
          //Post result to API
            this.assessmentService.postResult(this.iResult).toPromise().then((data: any) => {
              console.log(data);
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
          console.log(ID);

        }
      }
      }
    }

    if(this.level5ResultstotalRecords > 0){
      console.log('result exists!');
    }else{
      console.log('Result does not exist!');
      for(i=0;i<this.level5totalRecords;i++){
        // Set Characteristic ID
        ID = this.level5[i].id.toString();
        console.log(ID);
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
          console.log(this.results[key]);
          // Feed result into JSON
          this.iResult = {
            "characteristic_id": Number(ID),
            "assess_id": assess_id,
            "user_id":user_id,
            "kpa_id":this.kpaID,
            "level_id":this.level[4].id,
            "value":this.results[key]
          };
          console.log(this.iResult);
          //Post result to API
            this.assessmentService.postResult(this.iResult).toPromise().then((data: any) => {
              console.log(data);
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
          console.log(ID);

        }
      }
      }
    }

  setTimeout(() => {
    let newKpaID = Number(this.kpaID) + 1;
      this._router.navigate(['/runassess/'+newKpaID.toString()]);
      setTimeout(() => {
        //call refresh from AppComponent
      this.refresh("");
      });
  },500);
  }

  onUpdate(){
    this.results = this.addCharForm.value;
    let i: number;
    let ID: string;
    let resultID:string;
    let assess_id: string = "a001";
    let user_id: number = 1;
    let exists:boolean = false;
    console.log(this.level1ResultstotalRecords);
    if(this.level1ResultstotalRecords === 0){
      console.log('do nothing!');
    }else{
      console.log('Result does exist! Editting...');
      for(i=0;i<this.level1totalRecords;i++){
        // Set Characteristic ID
        ID = this.level1[i].id.toString();
        resultID = this.level1Results[i].ID.toString();
        console.log(ID);
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
          console.log(this.results[key]);
          // Feed result into JSON
          this.iResult = {
            "characteristic_id": Number(ID),
            "assess_id": assess_id,
            "user_id":user_id,
            "kpa_id":this.kpaID,
            "level_id":this.level[0].id,
            "value":this.results[key]
          };
          console.log(this.iResult);
          //Post result to API
            this.assessmentService.putResult(resultID.toString(),this.iResult).toPromise().then((data: any) => {
              console.log(data);
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
          console.log(ID);

        }
      }
      }
    }
    if(this.level2ResultstotalRecords === 0){
      console.log('result exists!');
    }else{
      console.log('Result does not exist!');
      for(i=0;i<this.level2totalRecords;i++){
        // Set Characteristic ID
        ID = this.level2[i].id.toString();
        resultID = this.level2Results[i].ID.toString();
        console.log(ID);
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
          console.log(this.results[key]);
          // Feed result into JSON
          this.iResult = {
            "characteristic_id": Number(ID),
            "assess_id": assess_id,
            "user_id":user_id,
            "kpa_id":this.kpaID,
            "level_id":this.level[1].id,
            "value":this.results[key]
          };
          console.log(this.iResult);
          //Post result to API
          this.assessmentService.putResult(resultID.toString(),this.iResult).toPromise().then((data: any) => {
              console.log(data);
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
          console.log(ID);

        }
      }
      }
    }
    if(this.level3ResultstotalRecords === 0){
      console.log('result exists!');
    }else{
      console.log('Result does not exist!');
      for(i=0;i<this.level3totalRecords;i++){
        // Set Characteristic ID
        ID = this.level3[i].id.toString();
        resultID = this.level3Results[i].ID.toString();
        console.log(ID);
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
          console.log(this.results[key]);
          // Feed result into JSON
          this.iResult = {
            "characteristic_id": Number(ID),
            "assess_id": assess_id,
            "user_id":user_id,
            "kpa_id":this.kpaID,
            "level_id":this.level[2].id,
            "value":this.results[key]
          };
          console.log(this.iResult);
          //Post result to API
          this.assessmentService.putResult(resultID.toString(),this.iResult).toPromise().then((data: any) => {
              console.log(data);
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
          console.log(ID);

        }
      }
      }
    }

    if(this.level4ResultstotalRecords === 0){
      console.log('result exists!');
    }else{
      console.log('Result does not exist!');
      for(i=0;i<this.level4totalRecords;i++){
        // Set Characteristic ID
        ID = this.level4[i].id.toString();
        resultID = this.level4Results[i].ID.toString();
        console.log(ID);
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
          console.log(this.results[key]);
          // Feed result into JSON
          this.iResult = {
            "characteristic_id": Number(ID),
            "assess_id": assess_id,
            "user_id":user_id,
            "kpa_id":this.kpaID,
            "level_id":this.level[3].id,
            "value":this.results[key]
          };
          console.log(this.iResult);
          //Post result to API
          this.assessmentService.putResult(resultID.toString(),this.iResult).toPromise().then((data: any) => {
              console.log(data);
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
          console.log(ID);

        }
      }
      }
    }

    if(this.level5ResultstotalRecords === 0){
      console.log('result exists!');
    }else{
      console.log('Result does not exist!');
      for(i=0;i<this.level5totalRecords;i++){
        // Set Characteristic ID
        ID = this.level5[i].id.toString();
        resultID = this.level5Results[i].ID.toString();
        console.log(ID);
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
          console.log(this.results[key]);
          // Feed result into JSON
          this.iResult = {
            "characteristic_id": Number(ID),
            "assess_id": assess_id,
            "user_id":user_id,
            "kpa_id":this.kpaID,
            "level_id":this.level[4].id,
            "value":this.results[key]
          };
          console.log(this.iResult);
          //Post result to API
          this.assessmentService.putResult(resultID.toString(),this.iResult).toPromise().then((data: any) => {
              console.log(data);
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
          console.log(ID);

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
      this._router.navigate(['/runassess/'+newKpaID.toString()]);
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
      this._router.navigate(['/runassess/'+newKpaID.toString()]);
      setTimeout(() => {
      //call refresh from AppComponent
      this.refresh("");
    });
    }
  }

  getKPAName(id:number):string{
    if(id === 0){
      return localStorage.getItem("kpa1");
    }else if(id === 1){
      return localStorage.getItem("kpa2");
    }else if(id === 2){
      return localStorage.getItem("kpa3");
    }else if(id === 3){
      return localStorage.getItem("kpa4");
    }else if(id === 4){
      return localStorage.getItem("kpa5");
    }else if(id === 5){
      return localStorage.getItem("kpa6");
    }else if(id === 6){
      return localStorage.getItem("kpa7");
    }else if(id === 7){
      return localStorage.getItem("kpa8");
    }else if(id === 8){
      return localStorage.getItem("kpa9");
    }else if(id === 9){
      return localStorage.getItem("kpa10");
    }else if(id === 10){
      return localStorage.getItem("kpa11");
    }else if(id === 11){
      return localStorage.getItem("kpa12");
    }else if(id === 12){
      return localStorage.getItem("kpa13");
    }else if(id === 13){
      return localStorage.getItem("kpa14");
    }else if(id === 14){
      return localStorage.getItem("kpa15");
    }else if(id === 15){
      return localStorage.getItem("kpa16");
    }else if(id === 16){
      return localStorage.getItem("kpa17");
    }
  }

}
