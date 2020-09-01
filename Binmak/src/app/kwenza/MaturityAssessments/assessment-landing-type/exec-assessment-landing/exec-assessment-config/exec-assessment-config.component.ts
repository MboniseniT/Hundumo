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
  isAdmin:boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.surname = JSON.parse(localStorage.getItem('currentUser')).lastName;
    this.isAdmin = JSON.parse(localStorage.getItem('currentUser')).isAdmin;
    this.AdminProtect();
  }

  back(){
    this.router.navigate(['/binmak/assessment-system-config']);
  }

  AdminProtect(){
    if (!this.isAdmin) {
      console.log('here');
      this.router.navigate(['/binmak/assessment-types']);
    }
  }

}
