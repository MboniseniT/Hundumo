import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { Level } from 'src/app/Models/Assessments/Level';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import {HttpClient} from "@angular/common/http";
import { EditCharacteristicComponent } from './edit-characteristic/edit-characteristic.component';
import { SelectKpaLevelComponent } from './select-kpaLevel/select-kpaLevel.component';
import { AddCharacteristicComponent } from './add-characteristic/add-characteristic.component'
import {MDBModalRef, MDBModalService} from "ng-uikit-pro-standard";
import { ToastService } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { KPALevel } from 'src/app/Models/Assessments/KPALevel';
import { Char } from 'src/app/Models/Assessments/char';
import { from } from 'rxjs';
import { AreYouSureComponent } from 'src/app/kwenza/MaturityAssessments/are-you-sure/are-you-sure.component';

@Component({
  selector: 'app-manage-characteristics',
  templateUrl: './manage-characteristics.component.html',
  styleUrls: ['./manage-characteristics.component.scss']
})
export class ManageCharacteristicsComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: Char[] = [];
  headElements = ['ID', 'Description', 'commands']; //'LastEditedBy',

  modalRef: MDBModalRef;

  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 5;

  assessmentUrl="http://localhost:44318/";

  url = 'Assessments/Config/getExecKPAs';

  kpa: Array<any>;
  levels: Array<any>;

  kpas:KPA[] =[];
  level:Level[]= [];
  kpaLevel:any = {};
  totalRecords: Number; //might need to change type to string
  page: Number=1;
  assessID: string = "Hola Mundo";

  formError:string = "";

  formKPALevel = new FormGroup({
    kpaID: new FormControl('', [Validators.required, Validators.minLength(1)]),
    LevelID: new FormControl('', [Validators.required, Validators.minLength(1)])
  });

  constructor(
    private assessmentService: AssessmentsConfigService,
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
    //this.loadDataTable();
    this.loadDropdowns();
  }

  //Custom Methods
  loadDataTable(){

    this.kpaLevel = Object.assign(this.kpaLevel, this.formKPALevel.value);
    this.assessmentService.getKPALevelChars(this.kpaLevel).subscribe((data: Char[]) => {
      this.elements = data;
          this.mdbTable.setDataSource(this.elements);
      }, error => {
        console.log('httperror: ');
        console.log(error);
      });
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
  }

  loadDropdowns(){
    //retrieve KPAs from Database
    this.assessmentService.GetExecKPAs().subscribe(
      // (data:KPA[]) => {
      //   this.kpas = data;
      // }, error => {
      //   console.log('httperror: ');
      //   console.log(error);
      // }
      resp => {
        this.kpa = resp.map((t: any) => {
          return { label: t.name, value: t.id }
        })
      }
    );
    //retrieve Levels from Database
    this.assessmentService.getLevels().subscribe(
      // (data:Level[]) => {
      //   this.level = data;
      // }, error => {
      //   console.log('httperror: ');
      //   console.log(error);
      // }
      resp => {
        this.levels = resp.map((t: any) => {
          return { label: t.name, value: t.id }
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
    this.kpaLevel = Object.assign(this.kpaLevel, this.formKPALevel.value);
    const modalOptions = {
      data: {
        editableRow: {kpa_id: this.kpaLevel.kpaID, level_id: this.kpaLevel.LevelID, description: "", frmwrk_id: null, version_id: null, variant_id: null}
      }
    };
    this.modalRef = this.modalService.show(AddCharacteristicComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database
      this.assessmentService.addChar(newElement).toPromise().then((data: any) => {
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

    });
    this.mdbTable.setDataSource(this.elements);
  }

  onEdit(el: any){
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: el
      }
    };
    this.modalRef = this.modalService.show(EditCharacteristicComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database
      this.assessmentService.editChar(newElement).toPromise().then((data: any) => {
        //console.log(data);
        // success notification
        this.toastrService.success('Update Successful!');
        setTimeout(() => {
          //update DataTable
          this.elements[elementIndex] = newElement;
        });
      }, error => {
        console.log('httperror: ');
          console.log(error);
          // error notification
          //this.formError = JSON.stringify(error.error.Message + " " +error.error.ModelState['']);
          this.toastrService.error(error);
      });

    });
    this.mdbTable.setDataSource(this.elements);
  }

  onDelete(el:any){
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: {message:"Are you sure you want to DELETE characteristic: " + el.id + "?"}
      }
    };
    this.modalRef = this.modalService.show(AreYouSureComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database
    this.assessmentService.deleteChar(el).toPromise().then((data: any) => {
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

}
