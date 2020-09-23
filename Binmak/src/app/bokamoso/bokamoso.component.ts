import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bokamoso',
  templateUrl: './bokamoso.component.html',
  styleUrls: ['./bokamoso.component.scss']
})
export class BokamosoComponent implements OnInit {
  name: string;
  surname: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.surname = JSON.parse(localStorage.getItem('currentUser')).lastName;
  }

  Assessment(){
   
  }

  back(){
    this.router.navigate(['/binmak']);
  }

}
