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
    /*Guards*/
    import { isSavedGuard } from './guards/isSaved.guard';
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
import { EditCharacteristicComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-characteristics/edit-characteristic/edit-characteristic.component';
import { SelectKpaLevelComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-characteristics/select-kpaLevel/select-kpaLevel.component';
import { AddCharacteristicComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-characteristics/add-characteristic/add-characteristic.component';
import { AddExecAssessmentComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-exec-assessments/add-exec-assessment/add-exec-assessment.component';
import { ManageExecAssessmentsComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-exec-assessments/manage-exec-assessments.component';
import { AreYouSureComponent } from './kwenza/MaturityAssessments/are-you-sure/are-you-sure.component'
import { ExecManageUsersComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-config/exec-manage-users/exec-manage-users.component';
import { AssetHealthService } from './services/asset-health.service';
import { BokamosoComponent } from './bokamoso/bokamoso.component';
import { BBSSDeviceComponent } from './asset-health/pages/bbssdevice/bbssdevice.component';
import { AcknowledgementComponent } from './asset-health/pages/acknowledgement/acknowledgement.component';
import { MachineComponent } from './asset-health/pages/machine/machine.component';
import { MachineNotificationSettingComponent } from './asset-health/pages/machine-notification-setting/machine-notification-setting.component';
import { MachineTypeComponent } from './asset-health/pages/machine-type/machine-type.component';
import { SensorConditionComponent } from './asset-health/pages/sensor-condition/sensor-condition.component';
import { SensorDataComponent } from './asset-health/pages/sensor-data/sensor-data.component';
import { SizeCategoryComponent } from './asset-health/pages/size-category/size-category.component';
import { UserSettingComponent } from './asset-health/pages/user-setting/user-setting.component';
import { SharedTableComponent } from './asset-health/shared/shared-table/shared-table.component';
import { SharedFormComponent } from './asset-health/shared/shared-form/shared-form.component';
import { MachineConfigurationComponent } from './asset-health/pages/machine-configuration/machine-configuration.component';
import { ApplicationComponent } from './asset-health/pages/application/application.component';
import { BinmakTechnologyComponent } from './asset-health/pages/binmak-technology/binmak-technology.component';
import { FrequencyPeriodComponent } from './asset-health/pages/frequency-period/frequency-period.component';
import { InsulationLevelComponent } from './asset-health/pages/insulation-level/insulation-level.component';
import { MachineLoadComponent } from './asset-health/pages/machine-load/machine-load.component';
import { BearingConditionComponent } from './asset-health/pages/bearing-condition/bearing-condition.component';
import { DiagnosisChartsComponent } from './asset-health/pages/diagnosis-charts/diagnosis-charts.component';
import { MachineBlocksComponent } from './asset-health/pages/machine-blocks/machine-blocks.component';
import { MainComponent } from './asset-health/pages/charts/main/main.component';
import { OverallVibrationChartsComponent } from './asset-health/pages/charts/overall-vibration-charts/overall-vibration-charts.component';
import { RadialVibrationChartsComponent } from './asset-health/pages/charts/radial-vibration-charts/radial-vibration-charts.component';
import { TangentialVibrationChartsComponent } from './asset-health/pages/charts/tangential-vibration-charts/tangential-vibration-charts.component';
import { AxialVibrationChartsComponent } from './asset-health/pages/charts/axial-vibration-charts/axial-vibration-charts.component';
import { SkinTemperatureChartsComponent } from './asset-health/pages/charts/skin-temperature-charts/skin-temperature-charts.component';
import { BearingComponent } from './asset-health/pages/bearing/bearing.component';
import { AxialVibrationWaterfallChartsComponent } from './asset-health/pages/charts/axial-vibration-charts/axial-vibration-waterfall-charts/axial-vibration-waterfall-charts.component';
import { RadialVibrationWaterfallChartsComponent } from './asset-health/pages/charts/radial-vibration-charts/radial-vibration-waterfall-charts/radial-vibration-waterfall-charts.component';
import { AxialVibrationSpectrumChartsComponent } from './asset-health/pages/charts/axial-vibration-charts/axial-vibration-spectrum-charts/axial-vibration-spectrum-charts.component';
import { RadialVibrationSpectrumChartsComponent } from './asset-health/pages/charts/radial-vibration-charts/radial-vibration-spectrum-charts/radial-vibration-spectrum-charts.component';
import { TangentialVibrationSpectrumChartsComponent } from './asset-health/pages/charts/tangential-vibration-charts/tangential-vibration-spectrum-charts/tangential-vibration-spectrum-charts.component';
import { TangentialVibrationWaterfallChartsComponent } from './asset-health/pages/charts/tangential-vibration-charts/tangential-vibration-waterfall-charts/tangential-vibration-waterfall-charts.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ManageKpisComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-config/manage-kpis/manage-kpis.component';
import { AddKpiComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-config/manage-kpis/add-kpi/add-kpi.component';
import { EditKpiComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-config/manage-kpis/edit-kpi/edit-kpi.component';
import { ManageBpKpiUsersComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-config/manage-BpKpi-users/manage-BpKpi-users.component';
import { AddSectionsComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-exec-assessments/add-sections/add-sections.component';
import { ViewConsensusResultsComponent } from './kwenza/MaturityAssessments/assessment-landing/view-consensus-results/view-consensus-results.component';
import { ManageBpComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-config/manage-bp/manage-bp.component';
import { AddBpComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-config/manage-bp/add-bp/add-bp.component';
import { EditBpComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-config/manage-bp/edit-bp/edit-bp.component';
import { ManageBpQuestionsComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-config/manage-bp-questions/manage-bp-questions.component';
import { AddBpQuestionComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-config/manage-bp-questions/add-bp-question/add-bp-question.component';
import { EditBpQuestionComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-config/manage-bp-questions/edit-bp-question/edit-bp-question.component';
import { ManageActionsComponent } from './kwenza/MaturityAssessments/assessment-landing/manage-actions/manage-actions.component';
import { EditActionComponent } from './kwenza/MaturityAssessments/assessment-landing/manage-actions/edit-action/edit-action.component';
import { ManageFrmwrksComponent } from './kwenza/MaturityAssessments/assessment-landing-type/system-config/manage-frmwrks/manage-frmwrks.component';
import { AddFrmwrkComponent } from './kwenza/MaturityAssessments/assessment-landing-type/system-config/manage-frmwrks/add-frmwrk/add-frmwrk.component';
import { EditFrmwrkComponent } from './kwenza/MaturityAssessments/assessment-landing-type/system-config/manage-frmwrks/edit-frmwrk/edit-frmwrk.component';
import { ManageVersionsComponent } from './kwenza/MaturityAssessments/assessment-landing-type/system-config/manage-versions/manage-versions.component';
import { AddVersionComponent } from './kwenza/MaturityAssessments/assessment-landing-type/system-config/manage-versions/add-version/add-version.component';
import { EditVersionComponent } from './kwenza/MaturityAssessments/assessment-landing-type/system-config/manage-versions/edit-version/edit-version.component';
import { ManageVariantsComponent } from './kwenza/MaturityAssessments/assessment-landing-type/system-config/manage-variants/manage-variants.component';
import { AddVariantComponent } from './kwenza/MaturityAssessments/assessment-landing-type/system-config/manage-variants/add-variant/add-variant.component';
import { EditVariantComponent } from './kwenza/MaturityAssessments/assessment-landing-type/system-config/manage-variants/edit-variant/edit-variant.component';
import { DownloadActionsComponent } from './kwenza/MaturityAssessments/assessment-landing/manage-actions/download-actions/download-actions.component';

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
    ManageCharacteristicsComponent,
    EditCharacteristicComponent,
    SelectKpaLevelComponent,
    AddCharacteristicComponent,
    AddExecAssessmentComponent,
    ManageExecAssessmentsComponent,
    AreYouSureComponent,
    ExecManageUsersComponent,
    BokamosoComponent,
    BBSSDeviceComponent,
    AcknowledgementComponent,
    MachineComponent,
    MachineNotificationSettingComponent,
    MachineTypeComponent,
    SensorConditionComponent,
    SensorDataComponent,
    SizeCategoryComponent,
    UserSettingComponent,
    SharedTableComponent,
    SharedFormComponent,
    MachineConfigurationComponent,
    ApplicationComponent,
    BinmakTechnologyComponent,
    FrequencyPeriodComponent,
    InsulationLevelComponent,
    MachineLoadComponent,
    BearingConditionComponent,
    DiagnosisChartsComponent,
    MachineBlocksComponent,
    MainComponent,
    OverallVibrationChartsComponent,
    RadialVibrationChartsComponent,
    TangentialVibrationChartsComponent,
    AxialVibrationChartsComponent,
    SkinTemperatureChartsComponent,
    BearingComponent,
    AxialVibrationSpectrumChartsComponent,
    AxialVibrationWaterfallChartsComponent,
    RadialVibrationWaterfallChartsComponent,
    RadialVibrationSpectrumChartsComponent,
    TangentialVibrationSpectrumChartsComponent,
    TangentialVibrationWaterfallChartsComponent,
    ExecManageUsersComponent,
    ManageKpisComponent,
    AddKpiComponent,
    EditKpiComponent,
    ManageBpKpiUsersComponent,
    AddSectionsComponent,
    ViewConsensusResultsComponent,
    ManageBpComponent,
    AddBpComponent,
    EditBpComponent,
    ManageBpQuestionsComponent,
    AddBpQuestionComponent,
    EditBpQuestionComponent,
    ManageActionsComponent,
    EditActionComponent,
    ManageFrmwrksComponent,
    AddFrmwrkComponent,
    EditFrmwrkComponent,
    ManageVersionsComponent,
    AddVersionComponent,
    EditVersionComponent,
    ManageVariantsComponent,
    AddVariantComponent,
    EditVariantComponent,
    DownloadActionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,    
    BrowserAnimationsModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
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
    MainServiceService,AssetHealthService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    }, {provide: LocationStrategy, useClass: HashLocationStrategy},

    //Assessments Providers
    AssessmentsConfigService,
    isSavedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
