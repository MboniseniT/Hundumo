import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../services/main-service.service';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-binmak-landing',
  templateUrl: './binmak-landing.component.html',
  styleUrls: ['./binmak-landing.component.scss']
})
export class BinmakLandingComponent implements OnInit {

  constructor(private router: Router, private service: MainServiceService, private toastrService: ToastService) { }

  name:string;
  surname: string;
  isKwenza: boolean;
  isLitsebi: boolean;
  isBokamoso: boolean;
  isInstituteBazazi: boolean;
  isProductionFlow: boolean;
  isAdmin: boolean;
   isSuperAdmin: boolean;
   isGuest: boolean;
   isUser: boolean;


  ngOnInit(): void {
    this.isKwenza = true;
    this.isLitsebi = true;
    this.isBokamoso = true;
    this.isInstituteBazazi = true;
    this.name = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.surname = JSON.parse(localStorage.getItem('currentUser')).lastName;
    this.isAdmin = JSON.parse(localStorage.getItem('currentUser')).isAdmin;
    this.isSuperAdmin = JSON.parse(localStorage.getItem('currentUser')).isSuperAdmin;
    this.isUser = JSON.parse(localStorage.getItem('currentUser')).isUser;
    this.isGuest = JSON.parse(localStorage.getItem('currentUser')).isGuest;
  }

  kwenza(){
    this.isKwenza = !this.isKwenza;
  }

  ukwazi(){
    this.service.getLMSLink(JSON.parse(localStorage.getItem('currentUser')).userId)
    .subscribe((resp: any) =>{
      if(resp == null){
        this.toastrService.warning("No LMS associated with this user! Talk to your administrator.");
      }
      else{
        window.open(resp.link, "_blank"); 
      }
    }, (error:any)=>{
      console.log(error);
      this.toastrService.error(error.error);
    })
  }

  productionFlow(){
    if(this.isProductionFlow){
      this.router.navigate(['/admin/asset-configuration']);
    }
    else{
      this.router.navigate(['/admin/dashboard']);
    }
    
  }

  letsiba(){
    this.isLitsebi = !this.isLitsebi;
  }

  bokamoso(){
    this.isBokamoso = !this.isBokamoso;
  }

  bazazi(){
    this.isInstituteBazazi = !this.isInstituteBazazi;
  }

  logout(){
    localStorage.clear();
    localStorage.removeItem("currentUser");
    this.router.navigate(['/login']);
  }

}
