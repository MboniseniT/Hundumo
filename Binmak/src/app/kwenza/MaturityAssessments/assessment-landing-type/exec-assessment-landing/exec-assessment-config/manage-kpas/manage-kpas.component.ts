import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import {HttpClient} from "@angular/common/http";
import { EditExecKpaComponent } from './edit-exec-kpa/edit-exec-kpa.component';
import {MDBModalRef, MDBModalService} from "ng-uikit-pro-standard";

@Component({
  selector: 'app-manage-kpas',
  templateUrl: './manage-kpas.component.html',
  styleUrls: ['./manage-kpas.component.scss']
})
export class ManageKpasComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['ID', 'kpaname', 'Description', 'commands']; //'LastEditedBy',

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

  constructor(
    private kpaServive: AssessmentsConfigService,
    private modalService: MDBModalService,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef
    ) { }

    @HostListener('input') oninput() {
      this.mdbTablePagination.searchText = this.searchText;
    }

  ngOnInit():void {
    this.loadDataTable();
  }

  //Custom Methods
  loadDataTable(){
    this.kpaServive.GetExecKPAs().subscribe((data: any) => {
      data.forEach((el: any) => {
      this.elements.push({
      id: el.id.toString(),
      name: el.name,
      description: el.description,
      userId: el.user_id
      });
      });
      this.mdbTable.setDataSource(this.elements);
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
    this.modalRef = this.modalService.show(EditExecKpaComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database

      //update DataTable
      this.elements[elementIndex] = newElement;
    });
    this.mdbTable.setDataSource(this.elements);
  }

  onDelete(el){

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
