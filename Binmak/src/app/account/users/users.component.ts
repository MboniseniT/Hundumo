import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';
import { ToastService } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userForm: FormGroup;
  users: Array<any>;
  loading: boolean;
  assetId:number;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private service: MainServiceService,
    private route: ActivatedRoute, private router: Router, private toastrService: ToastService) {

  }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 7,
      processing: true
    };

    this.service.getUsers(JSON.parse(localStorage.getItem('currentUser')).userId)
    .subscribe((resp:any) =>{
      this.users = resp;
      this.dtTrigger.next();
      console.log(this.users);
    }, (error: any) =>{
      this.toastrService.error(error.error)
      console.log();
    })

    this.loading = false;
    this.userForm = new FormGroup({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      EmployeeEmail: new FormControl('',Validators.compose([Validators.email, Validators.required]))
    });

  }

  accessManagement(){
    this.router.navigate(['binmak/manage-access']);
  }

  addUser(){
    console.log(this.userForm.value);
    this.loading = true;
    const addAdmin = {
      FirstName: this.userForm.value.FirstName,
      LastName: this.userForm.value.LastName,
      Email: this.userForm.value.EmployeeEmail,
      Reference: JSON.parse(localStorage.getItem('currentUser')).userId
    }

    this.service.RegisterUser(addAdmin)
      .subscribe((resp: any) => {
        console.log(resp);
        this.loading = false;
        location.reload();
      }, (error: any) => {
        console.log(error);
        this.loading = false;
      })
  }

  back(){
    this.router.navigate(['/binmak']);
  }


}
