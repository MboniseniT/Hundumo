import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exec-assessment-landing',
  templateUrl: './exec-assessment-landing.component.html',
  styleUrls: ['./exec-assessment-landing.component.scss']
})
export class ExecAssessmentLandingComponent implements OnInit {

  name: string;
  surname: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.surname = JSON.parse(localStorage.getItem('currentUser')).lastName;
  }

  back(){
    this.router.navigate(['/binmak/assessment-types']);
  }

}
