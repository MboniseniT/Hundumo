import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { Assessment } from 'src/app/Models/Assessments/assessment';

@Component({
  selector: 'app-exec-assessment-landing',
  templateUrl: './exec-assessment-landing.component.html',
  styleUrls: ['./exec-assessment-landing.component.scss']
})
export class ExecAssessmentLandingComponent implements OnInit {

  name: string;
  surname: string;
  userAssessments: any[];
  totalRecords:number;

  assessment: Assessment[];
  assessTotalRecords:number;

  constructor(
    private assessmentService: AssessmentsConfigService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadUserAssessments();
    this.name = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.surname = JSON.parse(localStorage.getItem('currentUser')).lastName;
  }

  back(){
    this.router.navigate(['/binmak/assessment-types']);
  }

  loadUserAssessments(){
    this.assessmentService.GetAssessmentUsersForSelection().subscribe(
      (data:any[]) => {
        this.userAssessments = data;
        //console.log(data);
        this.totalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

  selectAssessment(assessID:string){
    localStorage.removeItem("currentAssessment");
    setTimeout(() => {
      //localStorage.setItem("assessID",assessID);
      //console.log(localStorage.getItem("assessID"));
    });
    this.assessmentService.GetAssessmentById(assessID).subscribe(
      (data:Assessment[]) => {
        this.assessment = data;
        //console.log(data);
        this.assessTotalRecords = data.length;
        localStorage.setItem("currentAssessment", JSON.stringify(this.assessment));
        console.log(localStorage.getItem("currentAssessment"));
        // localStorage.setItem("assessName", this.assessment["assess_name"]);
        // localStorage.setItem("version", this.assessment["version_id"]);
        // localStorage.setItem("variant", this.assessment["variant_id"]);
        // localStorage.setItem("frmwrk", this.assessment["frmwrk_id"]);
        // localStorage.setItem("kpa1", this.assessment["kpa1"]);
        // localStorage.setItem("kpa2", this.assessment["kpa2"]);
        // localStorage.setItem("kpa3", this.assessment["kpa3"]);
        // localStorage.setItem("kpa4", this.assessment["kpa4"]);
        // localStorage.setItem("kpa5", this.assessment["kpa5"]);
        // localStorage.setItem("kpa6", this.assessment["kpa6"]);
        // localStorage.setItem("kpa7", this.assessment["kpa7"]);
        // localStorage.setItem("kpa8", this.assessment["kpa8"]);
        // localStorage.setItem("kpa9", this.assessment["kpa9"]);
        // localStorage.setItem("kpa10", this.assessment["kpa10"]);
        // localStorage.setItem("kpa11", this.assessment["kpa11"]);
        // localStorage.setItem("kpa12", this.assessment["kpa12"]);
        // localStorage.setItem("kpa13", this.assessment["kpa13"]);
        // localStorage.setItem("kpa14", this.assessment["kpa14"]);
        // localStorage.setItem("kpa15", this.assessment["kpa15"]);
        // localStorage.setItem("kpa16", this.assessment["kpa16"]);
        // localStorage.setItem("kpa17", this.assessment["kpa17"]);
        //console.log(localStorage.getItem("assessName"));
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

  GetAssessmentName(){
    return JSON.parse(localStorage.getItem("currentAssessment")).assess_name;
  }

  onClear(){
    console.log("clearing...");
    // this.assessmentService.clearAssessmentIndividualUserResults(localStorage.getItem("userID"), localStorage.getItem("assessID")).toPromise().then((data: any) => {
    //   console.log(data);
    //   // success notification
    //   alertify.success('Cleared Successfully!');
    //   setTimeout(() => {
    //     //call refresh from AppComponent
    //     this.AppComponentReset.refresh("");
    //   });
    // }, error => {
    //   console.log('httperror: ');
    //     // error notification
    //     alertify.error('httperror: '+JSON.stringify(error.status + ". " +error.statusText));
    // });
  }

  Visible(){
    if(JSON.parse(localStorage.getItem("currentAssessment")).assess_name){
      return true;
    }else{
      return false;
    }
  }

}
