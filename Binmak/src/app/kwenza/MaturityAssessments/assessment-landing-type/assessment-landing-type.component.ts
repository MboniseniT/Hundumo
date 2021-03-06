import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment-landing-type',
  templateUrl: './assessment-landing-type.component.html',
  styleUrls: ['./assessment-landing-type.component.scss']
})
export class AssessmentLandingTypeComponent implements OnInit {

  name: string;
  surname: string;
  isAdmin:boolean;
  isBinmak:boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.surname = JSON.parse(localStorage.getItem('currentUser')).lastName;
    this.isAdmin = JSON.parse(localStorage.getItem('currentUser')).isAdmin;
    this.isBinmak = JSON.parse(localStorage.getItem('currentUser')).isBinmak;
    localStorage.removeItem('currentAssessment');
  }

  Assessment(){

  }

  BinmakOrAdminProtect(){
    if(this.isBinmak || this.isAdmin){
      return true;
    }else{
      return false;
    }
  }

  back(){
    this.router.navigate(['/binmak/kwenza']);
  }
}
