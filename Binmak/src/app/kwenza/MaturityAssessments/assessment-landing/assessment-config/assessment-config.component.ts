import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment-config',
  templateUrl: './assessment-config.component.html',
  styleUrls: ['./assessment-config.component.scss']
})
export class AssessmentConfigComponent implements OnInit {

  name: string;
  surname: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.surname = JSON.parse(localStorage.getItem('currentUser')).lastName;
  }

  back(){
    this.router.navigate(['/binmak/assessment-landing']);
  }

}
