import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exec-assessment-config',
  templateUrl: './exec-assessment-config.component.html',
  styleUrls: ['./exec-assessment-config.component.scss']
})
export class ExecAssessmentConfigComponent implements OnInit {

  name: string;
  surname: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.surname = JSON.parse(localStorage.getItem('currentUser')).lastName;
  }

  back(){
    this.router.navigate(['/binmak/exec-assessment-landing']);
  }

}
