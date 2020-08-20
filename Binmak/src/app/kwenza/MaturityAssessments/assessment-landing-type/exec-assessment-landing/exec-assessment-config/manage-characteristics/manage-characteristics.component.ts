import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import {HttpClient} from "@angular/common/http";
//import { EditExecKpaComponent } from './edit-exec-kpa/edit-exec-kpa.component';
import {MDBModalRef, MDBModalService} from "ng-uikit-pro-standard";
import { ToastService } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-characteristics',
  templateUrl: './manage-characteristics.component.html',
  styleUrls: ['./manage-characteristics.component.scss']
})
export class ManageCharacteristicsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
