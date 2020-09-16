import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import {HttpClient} from "@angular/common/http";
import { EditExecKpaComponent } from '../../assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-kpas/edit-exec-kpa/edit-exec-kpa.component';
import {MDBModalRef, MDBModalService} from "ng-uikit-pro-standard";
import { ToastService } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { AddExecAssessmentComponent } from '../../assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-exec-assessments/add-exec-assessment/add-exec-assessment.component';
import { AddKpiComponent } from '../assessment-config/manage-kpis/add-kpi/add-kpi.component';
import { KPI } from 'src/app/Models/Assessments/kpi';
import { TableKPI } from 'src/app/Models/Assessments/TableKPI';
import { EditKpiComponent } from '../assessment-config/manage-kpis/edit-kpi/edit-kpi.component';
import { AreYouSureComponent } from '../../../MaturityAssessments/are-you-sure/are-you-sure.component';
import { ActionTable } from 'src/app/Models/Assessments/actionTable';
import { EditActionComponent } from './edit-action/edit-action.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-actions',
  templateUrl: './manage-actions.component.html',
  styleUrls: ['./manage-actions.component.scss']
})
export class ManageActionsComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: ActionTable[] = [];
  headElements = ['ID', 'Section', 'kpa', 'bp', 'Question', 'Action', 'Impact', 'Ease', 'Cost', 'Duration', 'Priority', 'Assigned To', 'Deadline', 'Status', 'Commands']; //'LastEditedBy',

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

  isSaved:number;
  assessName:string = "";
  assessmentID: string;
  hasSections:boolean;

  kpaLevel:any = {};

  sections: Array<any>;
  sectionID;

  formError:string = "";

  isAdmin:boolean;
  isBinmak:boolean;

  form = new FormGroup({
    section: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

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
    if(localStorage.getItem('currentAssessment')){
      this.isSaved = Number(JSON.parse(localStorage.getItem('currentAssessment')).isSaved);
    this.assessName = JSON.parse(localStorage.getItem('currentAssessment')).assess_name;
    this.assessmentID = JSON.parse(localStorage.getItem('currentAssessment')).id;
    this.setHasSections();
    this.SavedProtect();
    this.NotAssignedProtect();
    this.loadDropDowns();
    setTimeout(() => {
      this.loadDataTable();
    });
    }
    this.isAdmin = JSON.parse(localStorage.getItem('currentUser')).isAdmin;
    this.isBinmak = JSON.parse(localStorage.getItem('currentUser')).isBinmak;
    //this.BinmakProtect();
    //this.AdminProtect();

  }

  //Init Methods

  loadDropDowns(){
    //retrieve AssetNodes from Database
    this.assessmentService.getSectionNodes(this.GetAssessmentNodeId()).subscribe(
      resp => {
        //console.log(resp);
        this.sections = resp.map((t: any) => {
          return { label: t.name, value: t.assetNodeId }
        })
      }
    );
  }

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

  SavedProtect(){
    if (this.isSaved == 1) {
      console.log('here');
      this.router.navigate(['/binmak/assessment-landing']);
    }
  }

  setHasSections(){
    if(JSON.parse(localStorage.getItem("currentAssessment"))[0]){
      this.hasSections = true;
      //console.log(this.hasSections);
    }else{
      this.hasSections = false;
      this.router.navigate(['/binmak/assessment-landing']);
      //console.log(this.hasSections);
    }
  }

  NotAssignedProtect(){
    if(!this.Visible()){
      this.router.navigate(['/binmak/assessment-landing']);
    }
  }

  Visible(){
    if(this.assessName){
      return true;
    }else{
      return false;
    }
  }

  GetAssessmentName(){
    if(this.assessName){
      return this.assessName;
    }else{
      return "";
    }

  }

  onClear(el: any){
    const modalOptions = {
      data: {
        editableRow: {message:"Are you sure you want to CLEAR all results associated with assessment: " + el.assess_name + "?"}
      }
    };
    this.modalRef = this.modalService.show(AreYouSureComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database
      this.assessmentService.clearAssessment(el).toPromise().then((data: any) => {
        // success notification
        this.toastrService.success('Cleared Successfully!');

      }, error => {
        console.log('httperror: ');
          console.log(error);
          // error notification
          //this.formError = JSON.stringify(error.error.Message + " " +error.error.ModelState['']);
          this.toastrService.error(JSON.stringify(error));
      });

    });
  }

  onSave(el: any){
    const modalOptions = {
      data: {
        editableRow: {message:"Are you sure you want to SAVE your results for assessment: " + el.assess_name + "? You will not be able to edit the assessment anymore."}
      }
    };
    this.modalRef = this.modalService.show(AreYouSureComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database
      this.assessmentService.SaveAssessment(el).toPromise().then((data: any) => {
        // success notification
        this.toastrService.success('Saved Successfully!');

      }, error => {
        console.log('httperror: ');
          console.log(error);
          // error notification
          //this.formError = JSON.stringify(error.error.Message + " " +error.error.ModelState['']);
          this.toastrService.error(JSON.stringify(error));
      });

    });
  }

  GetAssessment(){
    return JSON.parse(localStorage.getItem("currentAssessment"));
  }

  GetAssessmentNodeId(){
    return JSON.parse(localStorage.getItem("currentAssessment")).assetNodeId;
  }

   //Custom Methods
   loadDataTable(){
     if(this.form.valid){
       this.sectionID = this.form.getRawValue();
       //console.log(this.sectionID.section);
      this.assessmentService.GetFilteredActions(this.assessmentID, this.sectionID.section).subscribe((data: ActionTable[]) => {
        this.elements = data;
        //console.log(this.elements);
        this.mdbTable.setDataSource(this.elements);
        }, error => {
          console.log('httperror: ');
          console.log(error);
        });
        this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
     }else{
      this.assessmentService.GetAllActions(this.assessmentID).subscribe((data: ActionTable[]) => {
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

  }

  onEdit(el: any){
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: el
      }
    };
    this.modalRef = this.modalService.show(EditActionComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database
      this.assessmentService.EditAction(newElement).toPromise().then((data: any) => {
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
        editableRow: {message:"Are you sure you want to DELETE KPA " + el.id + ": "+ el.name + "?"}
      }
    };
    this.modalRef = this.modalService.show(AreYouSureComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database
    this.assessmentService.DeleteKPI(el).toPromise().then((data: any) => {
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
    this.router.navigate(['/binmak/assessment-landing']);
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
    this.modalRef = this.modalService.show(AddKpiComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database
      this.assessmentService.AddKPI(newElement).toPromise().then((data: any) => {
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
