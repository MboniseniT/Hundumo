import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModulesPro, ToastModule, SelectModule, MDBModalService, MDB_DATE_OPTIONS } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { AuthenticationService } from './services/authentication.service';
import { MainServiceService } from './services/main-service.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { BinmakLandingComponent } from './binmak-landing/binmak-landing.component';
import { AssetRegisterComponent } from './asset-management/asset-register/asset-register.component';
import { RootComponent } from './root/root.component';
import { AssetSetupComponent } from './asset-management/asset-register/asset-setup/asset-setup.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { UsersComponent } from './account/users/users.component';
import { ManagePermissionComponent } from './account/manage-permission/manage-permission.component';
import { PasswordResetComponent } from './account/password-reset/password-reset.component';
import { KwenzaComponent } from './kwenza/kwenza.component';
import { ProductionFlowComponent } from './kwenza/production-flow/production-flow.component';
import { ReadingsComponent } from './kwenza/production-flow/readings/readings.component';
import { OverallProductionComponent } from './kwenza/production-flow/overall-production/overall-production.component';
import { ChartsComponent } from './kwenza/production-flow/charts/charts.component';
import { EditLimitsComponent } from './kwenza/production-flow/edit-limits/edit-limits.component';
import { EditReadingsComponent } from './kwenza/production-flow/edit-readings/edit-readings.component';
import { UkwaziComponent } from './ukwazi/ukwazi.component';

//Asset Management Maturity Assessor
    /*Services*/
import { AssessmentsConfigService } from './services/Assessments/assessmentsConfig.service';
    /*Components*/
import { AssessmentsComponent } from './kwenza/MaturityAssessments/assessments/assessments.component';
import { AssessmentLandingComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-landing.component';
import { AssessmentLandingTypeComponent } from './kwenza/MaturityAssessments/assessment-landing-type/assessment-landing-type.component';
import { SystemConfigComponent } from './kwenza/MaturityAssessments/assessment-landing-type/system-config/system-config.component';
import { KpiAssessmentComponent } from './kwenza/MaturityAssessments/assessment-landing/kpi-assessment/kpi-assessment.component';
import { BpAssessmentComponent } from './kwenza/MaturityAssessments/assessment-landing/bp-assessment/bp-assessment.component';
import { AssessmentConfigComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-config/assessment-config.component';
import { KpaAssessmentComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/kpa-assessment/kpa-assessment.component';
import { ExecAssessmentLandingComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-landing.component';
import { ViewKpaResultsComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/view-kpa-results/view-kpa-results.component';
import { ExecAssessmentConfigComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-config/exec-assessment-config.component';
import { ManageKpasComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-kpas/manage-kpas.component';
import { EditExecKpaComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-kpas/edit-exec-kpa/edit-exec-kpa.component';
import { ManageCharacteristicsComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-characteristics/manage-characteristics.component';
//import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BinmakLandingComponent,
    AssetRegisterComponent,
    RootComponent,
    AssetSetupComponent,
    ForgotPasswordComponent,
    UsersComponent,
    ManagePermissionComponent,
    PasswordResetComponent,
    KwenzaComponent,
    ProductionFlowComponent,
    ReadingsComponent,
    OverallProductionComponent,
    ChartsComponent,
    EditLimitsComponent,
    EditReadingsComponent,
    UkwaziComponent,

    //Asset Management Maturity Assessor
    AssessmentsComponent,
    AssessmentLandingComponent,
    AssessmentLandingTypeComponent,
    SystemConfigComponent,
    KpiAssessmentComponent,
    AssessmentConfigComponent,
    BpAssessmentComponent,
    ExecAssessmentLandingComponent,
    KpaAssessmentComponent,
    ViewKpaResultsComponent,
    ExecAssessmentConfigComponent,
    ManageKpasComponent,
    EditExecKpaComponent,
    ManageCharacteristicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    //ChartModule,
    DataTablesModule,
    ReactiveFormsModule,
    SelectModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot()
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [MDBModalService, AuthGuard,DatePipe,
    AuthenticationService,
    { provide: MDB_DATE_OPTIONS, useValue: { showTodayBtn: false } },
    MainServiceService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    }, {provide: LocationStrategy, useClass: HashLocationStrategy},

    //Assessments Providers
    AssessmentsConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
