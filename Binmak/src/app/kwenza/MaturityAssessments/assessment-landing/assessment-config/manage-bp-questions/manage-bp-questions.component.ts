import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import {HttpClient} from "@angular/common/http";
import { EditExecKpaComponent } from '../../../assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-kpas/edit-exec-kpa/edit-exec-kpa.component';
import {MDBModalRef, MDBModalService} from "ng-uikit-pro-standard";
import { ToastService } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { AddExecAssessmentComponent } from '../../../assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-exec-assessments/add-exec-assessment/add-exec-assessment.component';
import { AddKpiComponent } from '../../../assessment-landing/assessment-config/manage-kpis/add-kpi/add-kpi.component';
import { KPI } from 'src/app/Models/Assessments/kpi';
import { TableKPI } from 'src/app/Models/Assessments/TableKPI';
import { EditKpiComponent } from '../manage-kpis/edit-kpi/edit-kpi.component';
import { AreYouSureComponent } from '../../../are-you-sure/are-you-sure.component';
import { AddBpQuestionComponent } from './add-bp-question/add-bp-question.component';
import { BpQuestionTable } from 'src/app/Models/Assessments/bpQuestionTable';
import { EditBpQuestionComponent } from './edit-bp-question/edit-bp-question.component';

@Component({
  selector: 'app-manage-bp-questions',
  templateUrl: './manage-bp-questions.component.html',
  styleUrls: ['./manage-bp-questions.component.scss']
})
export class ManageBpQuestionsComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: BpQuestionTable[] = [];
  headElements = ['ID', 'Question', 'Description', 'Bp', 'Kpa','LastEditedBy', 'commands']; //'LastEditedBy',

  modalRef: MDBModalRef;

  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 5;

  assessmentUrl="http://localhost:44318/";

  url = 'Assessments/Config/getExecKPAs';


  kpas:KPA[];
  totalRecords: Number; //might need to change type to string
  page: Number=1;
  assessID: string = "Hola Mundo";

  kpaLevel:any = {};

  formError:string = "";

  isAdmin:boolean;
  isBinmak:boolean;

  constructor(
    private assessmentService: AssessmentsConfigService,
    private kpaService: AssessmentsConfigService,
    private modalService: MDBModalService,
    private toastrService: ToastService,
    private router: Router,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef
  ) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.isAdmin = JSON.parse(localStorage.getItem('currentUser')).isAdmin;
    this.isBinmak = JSON.parse(localStorage.getItem('currentUser')).isBinmak;
    this.BinmakProtect();
    //this.AdminProtect();
    this.loadDataTable();
  }

  //Init Methods
  AdminProtect(){
    if (!this.isAdmin) {
      console.log('here');
      this.router.navigate(['/binmak/assessment-types']);
    }
  }

  BinmakProtect(){
    if (!this.isBinmak) {
      this.router.navigate(['/binmak/assessment-types']);
    }
  }

   //Custom Methods
   loadDataTable(){
    this.kpaService.GetBpQuestions().subscribe((data: BpQuestionTable[]) => {
      this.elements = data;
      //console.log(this.elements);
      this.mdbTable.setDataSource(this.elements);
      }, error => {
        console.log('httperror: ');
        console.log(error);
      });
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
  }

  onEdit(el: any){
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: el
      }
    };
    this.modalRef = this.modalService.show(EditBpQuestionComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database
      this.assessmentService.EditBPQuestion(newElement).toPromise().then((data: any) => {
        //console.log(data);
        // success notification
        this.toastrService.success('Update Successful!');
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

  onDelete(el:any){
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: {message:"Are you sure you want to DELETE Question " + el.qstnID + " under BP "+ el.qstnBpID +", "+ el.qstnBpName + "?"}
      }
    };
    this.modalRef = this.modalService.show(AreYouSureComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database
    this.assessmentService.DeleteBPQuestion(el).toPromise().then((data: any) => {
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
    this.router.navigate(['/binmak/assessment-config']);
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

  onAdd(){
    const modalOptions = {
      // data: {
      //   editableRow: {kpa_id: this.kpaLevel.kpaID, level_id: this.kpaLevel.LevelID, description: "", frmwrk_id: null, version_id: null, variant_id: null}
      // }
    };
    this.modalRef = this.modalService.show(AddBpQuestionComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database
      this.assessmentService.AddBPQuestion(newElement).toPromise().then((data: any) => {
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

    });
    //this.mdbTable.setDataSource(this.elements);
  }

}
