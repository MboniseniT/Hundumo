import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.scss']
})
export class SystemConfigComponent implements OnInit {

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
    this.BinmakOrAdminProtect();
  }

  back(){
    this.router.navigate(['/binmak/assessment-types']);
  }

  AdminProtect(){
    if (!this.isAdmin) {
      console.log('here');
      this.router.navigate(['/binmak/assessment-types']);
    }
  }

  BinmakOrAdminProtect(){
    if(this.isBinmak || this.isAdmin){
      return true;
    }else{
      return false;
    }
  }

}
