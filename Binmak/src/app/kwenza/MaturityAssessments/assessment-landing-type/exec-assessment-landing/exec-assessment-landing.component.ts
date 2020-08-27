import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { Assessment } from 'src/app/Models/Assessments/assessment';
import { MDBModalService, ToastService, MDBModalRef } from 'ng-uikit-pro-standard';
import { AreYouSureComponent } from '../../are-you-sure/are-you-sure.component';

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
  isSaved:number;
  assessName:string = "";
  isAdmin:boolean;

  assessment: Assessment[];
  assessTotalRecords:number;

  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private toastrService: ToastService,

    private cdRef: ChangeDetectorRef,
    private assessmentService: AssessmentsConfigService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadUserAssessments();
    this.name = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.surname = JSON.parse(localStorage.getItem('currentUser')).lastName;
    this.isAdmin = JSON.parse(localStorage.getItem('currentUser')).isAdmin;
    this.isSaved = Number(JSON.parse(localStorage.getItem('currentAssessment')).isSaved);
    this.assessName = JSON.parse(localStorage.getItem('currentAssessment')).assess_name;
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
        //console.log(localStorage.getItem("currentAssessment"));
        this.isSaved = Number(JSON.parse(localStorage.getItem('currentAssessment')).isSaved);
        this.assessName = JSON.parse(localStorage.getItem('currentAssessment')).assess_name;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
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

      }, error => {
        console.log('httperror: ');
          console.log(error);
          // error notification
          //this.formError = JSON.stringify(error.error.Message + " " +error.error.ModelState['']);
          this.toastrService.error(JSON.stringify(error));
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

}
