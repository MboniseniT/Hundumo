import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MDBModalService, ToastService, MDBModalRef } from 'ng-uikit-pro-standard';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { NgForm, NgModel, FormGroup, FormControl, Validators } from '@angular/forms';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { Level } from 'src/app/Models/Assessments/level';
import { Variant } from 'src/app/Models/Assessments/variant';
import { Version } from 'src/app/Models/Assessments/version';
import { Frmwrk } from 'src/app/Models/Assessments/frmwrk';
import { Result } from 'src/app/Models/Assessments/results';
import { LResult } from 'src/app/Models/Assessments/lResults';
import { Location } from '@angular/common';
import { Char } from 'src/app/Models/Assessments/char';
import { AppComponent } from 'src/app/app.component';
import { AreYouSureComponent } from '../../are-you-sure/are-you-sure.component';
import { KPI } from 'src/app/Models/Assessments/kpi';
import { Sections } from 'src/app/Models/Assessments/sections';
import { KpiResult } from 'src/app/Models/Assessments/kpiResult';

@Component({
  selector: 'app-bp-assessment',
  templateUrl: './bp-assessment.component.html',
  styleUrls: ['./bp-assessment.component.scss']
})
export class BpAssessmentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
