import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalService, ToastService, MDBModalRef } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-kpi-assessment',
  templateUrl: './kpi-assessment.component.html',
  styleUrls: ['./kpi-assessment.component.scss']
})
export class KpiAssessmentComponent implements OnInit {

  isSaved:number;
  assessName:string = "";
  hasSections:boolean;

  constructor(
    private modalService: MDBModalService,
    private toastrService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem('currentAssessment')){
      this.isSaved = Number(JSON.parse(localStorage.getItem('currentAssessment')).isSaved);
    this.assessName = JSON.parse(localStorage.getItem('currentAssessment')).assess_name;
    this.setHasSections();
    }
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

}
