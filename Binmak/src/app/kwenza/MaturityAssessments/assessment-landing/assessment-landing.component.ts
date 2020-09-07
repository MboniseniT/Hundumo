import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { MDBModalService, ToastService, MDBModalRef } from 'ng-uikit-pro-standard';
import { AreYouSureComponent } from '../are-you-sure/are-you-sure.component';
import { Assessment } from 'src/app/Models/Assessments/assessment';
import { KpiResult } from 'src/app/Models/Assessments/kpiResult';

@Component({
  selector: 'app-assessment-landing',
  templateUrl: './assessment-landing.component.html',
  styleUrls: ['./assessment-landing.component.scss']
})
export class AssessmentLandingComponent implements OnInit {

  name: string;
  surname: string;
  userAssessments: any[] = [];
  totalRecords:number;
  isSaved:number;
  assessName:string = "";
  isAdmin:boolean;
  hasSections:boolean;
  kpiResult:KpiResult[] = [];
  assessmentID:number;

  assessment: Assessment[];
  assessmentSections: Array<any>;
  assessTotalRecords:number;

  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private toastrService: ToastService,
    private assessmentService: AssessmentsConfigService,
    private router: Router) { }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.surname = JSON.parse(localStorage.getItem('currentUser')).lastName;
    this.isAdmin = JSON.parse(localStorage.getItem('currentUser')).isAdmin;
    this.loadUserAssessments();
    if(localStorage.getItem('currentAssessment')){
      this.isSaved = Number(JSON.parse(localStorage.getItem('currentAssessment')).isSaved);
    this.assessName = JSON.parse(localStorage.getItem('currentAssessment')).assess_name;
    this.assessmentID = JSON.parse(localStorage.getItem('currentAssessment')).id;
    this.setHasSections();
    this.getKpiResults();
    }
  }

  Assessment(){

  }

  back(){
    this.router.navigate(['/binmak/assessment-types']);
  }

  loadUserAssessments(){
    if(this.isAdmin){

      this.assessmentService.GetAssessmentUsers().subscribe(
        (data:any[]) => {
          this.userAssessments = data;
          //console.log(data);
          this.totalRecords = data.length;
        }, error => {
          console.log('httperror: ');
          console.log(error);
        }
      );
    }else{
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
  }

  selectAssessment(assessID:string, isSavedState:number){
    localStorage.removeItem("currentAssessment");
    this.assessmentService.GetAssessmentById(assessID).subscribe(
      (data:Assessment[]) => {
        this.assessment = data;
        this.assessment = Object.assign(this.assessment, {isSaved:isSavedState});
        //this.assessment[0].isSaved = isSavedState;
        //console.log(this.assessment);
        this.assessTotalRecords = data.length;
        localStorage.setItem("currentAssessment", JSON.stringify(this.assessment));
        //console.log(localStorage.getItem("currentAssessment"));
        this.isSaved = Number(JSON.parse(localStorage.getItem('currentAssessment')).isSaved);
        this.assessName = JSON.parse(localStorage.getItem('currentAssessment')).assess_name;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    //retrieve Sections this assessment from Database
    this.assessmentService.GetSections(assessID).subscribe(
      (data:any[]) => {
        this.assessmentSections = data;
        this.assessment = Object.assign(this.assessment, this.assessmentSections);
        localStorage.setItem("currentAssessment", JSON.stringify(this.assessment));

        setTimeout(() => {
          this.setHasSections();
        });

        // if(JSON.parse(localStorage.getItem("currentAssessment"))[0]){
        //   console.log("has value");
        // }else{
        //   console.log("has no value");
        // }
        //console.log(this.assessment);
      }, error => {
        console.log(error);
      }
    );
  }

  setHasSections(){
    if(JSON.parse(localStorage.getItem("currentAssessment"))[0]){
      this.hasSections = true;
      //console.log(this.hasSections);
    }else{
      this.hasSections = false;
      this.toastrService.warning('Assessment, '+ this.assessName +' has no sections assigned to it! Please contact your system administrator for assistance.');
      //console.log(this.hasSections);
    }
  }
  GetAssessmentName(){
    if(this.assessName){
      return this.assessName;
    }else{
      return "";
    }

  }

  GetAssessment(){
    return JSON.parse(localStorage.getItem("currentAssessment"));
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
        this.loadUserAssessments();
      }, error => {
        console.log('httperror: ');
          console.log(error);
          // error notification
          //this.formError = JSON.stringify(error.error.Message + " " +error.error.ModelState['']);
          this.toastrService.error(JSON.stringify(error.error));
      });

    });
  }

  getSavedState(){
    if(this.isSaved == 1){
      return true;
    }else{
      return false;
    }
  }

  Visible(){
    if(this.assessName){
      return true;
    }else{
      return false;
    }
  }

  getKpiResults(){
    //retrieve KPI Results from Database
    this.assessmentService.GetkpiResults(Number(this.assessmentID)).subscribe(
      (data:KpiResult[]) => {
        this.kpiResult = data;
        //console.log(data);
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

  getPage():string{
    return this.kpiResult.length.toString();
  }

}
