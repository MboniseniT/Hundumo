import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { Level } from 'src/app/Models/Assessments/Level';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import {HttpClient} from "@angular/common/http";
import { EditCharacteristicComponent } from '../../../assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-characteristics/edit-characteristic/edit-characteristic.component';
import { SelectKpaLevelComponent } from '../../../assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-characteristics/select-kpaLevel/select-kpaLevel.component';
import { AddCharacteristicComponent } from '../../../assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-characteristics/add-characteristic/add-characteristic.component';
import {MDBModalRef, MDBModalService} from "ng-uikit-pro-standard";
import { ToastService } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { KPALevel } from 'src/app/Models/Assessments/KPALevel';
import { Char } from 'src/app/Models/Assessments/char';
import { from } from 'rxjs';
import { AreYouSureComponent } from 'src/app/kwenza/MaturityAssessments/are-you-sure/are-you-sure.component';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-manage-BpKpi-users',
  templateUrl: './manage-BpKpi-users.component.html',
  styleUrls: ['./manage-BpKpi-users.component.scss']
})
export class ManageBpKpiUsersComponent implements OnInit, AfterViewInit  {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any[] = [];
  headElements = ['ID', 'Assessment Id', 'Assessment Name', 'Username', 'User Email', 'Link By', 'Commands']; //'LastEditedBy',

  modalRef: MDBModalRef;

  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 5;

  assessmentUrl="http://localhost:44318/";

  url = 'Assessments/Config/getExecKPAs';

  users: Array<any>;
  assessments: Array<any>;

  kpas:KPA[] =[];
  level:Level[]= [];
  assessmentUser:any = {};
  totalRecords: Number; //might need to change type to string
  page: Number=1;
  assessID: string = "Hola Mundo";

  formError:string = "";

  formAssessmentUser = new FormGroup({
    user_id: new FormControl('', [Validators.required, Validators.minLength(1)]),
    assess_id: new FormControl('', [Validators.required, Validators.minLength(1)])
  });

  isAdmin:boolean;

  constructor(
    private assessmentService: AssessmentsConfigService,
    private service: MainServiceService,
    private modalService: MDBModalService,
    private toastrService: ToastService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef
  ) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit():void {
    this.isAdmin = JSON.parse(localStorage.getItem('currentUser')).isAdmin;
    this.AdminProtect();
    this.loadDataTable();
    this.loadDropdowns();
  }

  //Custom Methods
  loadDataTable(){
    this.assessmentService.GetAssessmentUsers().subscribe((data: any[]) => {
      this.elements = data;
      console.log(data);
          this.mdbTable.setDataSource(this.elements);
      }, error => {
        console.log('httperror: ');
        console.log(error);
      });
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
  }

  loadDropdowns(){
    this.service.getUsers(JSON.parse(localStorage.getItem('currentUser')).userId)
  .subscribe(resp => {
      this.users = resp.map((t: any) => {
        return { label: t.name + '-' + t.lastName, value: t.id }
  })
});
    //retrieve Levels from Database
    this.assessmentService.getAssessments().subscribe(
      resp => {
        this.assessments = resp.map((t: any) => {
          return { label: t.assess_name, value: t.id }
        })
      }
    );
  }

  onLoad(el:any){
    //const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: {kpaID: null, LevelID:null}
      }
    };
    this.modalRef = this.modalService.show(SelectKpaLevelComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {

      //call loadDataTable(newElement)

      //Call funtion to update database
      // this.assessmentService.EditExecKPA(newElement).toPromise().then((data: any) => {
      //   //console.log(data);
      //   // success notification
      //   this.toastrService.success('Update Successful!');
      //   setTimeout(() => {
      //     //update DataTable
      //     //this.elements[elementIndex] = newElement;
      //   });
      // }, error => {
      //   console.log('httperror: ');
      //     console.log(error);
      //     // error notification
      //     //this.formError = JSON.stringify(error.error.Message + " " +error.error.ModelState['']);
      //     this.toastrService.error(error);
      // });

    });
    //this.mdbTable.setDataSource(this.elements);
  }

  onAdd(){
    this.assessmentUser = Object.assign(this.assessmentUser, this.formAssessmentUser.value);

      //Call funtion to update database
      this.assessmentService.AddAssessmentUser(this.assessmentUser).toPromise().then((data: any) => {
        //console.log(data);
        // success notification
        this.toastrService.success('Addition Successful!');
        setTimeout(() => {
          //update DataTable
          this.loadDataTable();
        });
      }, error => {
        console.log('httperror: ');
          console.log(error);
          // error notification
          //this.formError = JSON.stringify(error.error.Message + " " +error.error.ModelState['']);
          this.toastrService.error(error);
      });


    this.mdbTable.setDataSource(this.elements);
  }

  onDelete(el:any){
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: {message:"Are you sure you want to DELETE the link between " + el.assessmentName + " & "+ el.userNames +"?"}
      }
    };
    this.modalRef = this.modalService.show(AreYouSureComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database
    this.assessmentService.DeleteAssessmentUser(el).toPromise().then((data: any) => {
      // success notification
      this.toastrService.warning('Deleted Successfully!');
      setTimeout(() => {
        //update DataTable
        this.loadDataTable();
      });
    }, error => {
      console.log('httperror: ');
        console.log(error);
        // error notification
        //this.formError = JSON.stringify(error.error.Message + " " +error.error.ModelState['']);
        this.toastrService.error(error);
    });

    });
  }

  back(){
    this.router.navigate(['/binmak/exec-assessment-config']);
  }

  //DataTable Methods
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.cdRef.detectChanges();
    }

    searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
    this.mdbTable.setDataSource(this.previous);
    this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
    this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
    this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    });
    }

    AdminProtect(){
      if (!this.isAdmin) {
        console.log('here');
        this.router.navigate(['/binmak/assessment-types']);
      }
    }

}
