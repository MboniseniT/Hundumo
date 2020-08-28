import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class isSavedGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (Number(JSON.parse(localStorage.getItem('currentAssessment')).isSaved) == 1) {
            // logged in so return true
            console.log(JSON.parse(localStorage.getItem('currentAssessment')).isSaved);
            this.router.navigate(['/binmak/exec-assessment-landing']);

            return true;
        }else{
          // not logged in so redirect to login page with the return url
          console.log(JSON.parse(localStorage.getItem('currentAssessment')).isSaved)

        this.router.navigate(['/binmak/kpa-assessment/1']);

        return false;
        }


    }
}
