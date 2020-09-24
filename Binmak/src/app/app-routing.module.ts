import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { RootComponent } from './root/root.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
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
import { AssessmentsComponent } from './kwenza/MaturityAssessments/assessments/assessments.component';
import { AssessmentLandingComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-landing.component';
import { AssessmentLandingTypeComponent } from './kwenza/MaturityAssessments/assessment-landing-type/assessment-landing-type.component';
import { SystemConfigComponent } from './kwenza/MaturityAssessments/assessment-landing-type/system-config/system-config.component';
import { KpiAssessmentComponent } from './kwenza/MaturityAssessments/assessment-landing/kpi-assessment/kpi-assessment.component';
import { BpAssessmentComponent } from './kwenza/MaturityAssessments/assessment-landing/bp-assessment/bp-assessment.component';
import { AssessmentConfigComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-config/assessment-config.component';
import { ExecAssessmentLandingComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-landing.component';
import { KpaAssessmentComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/kpa-assessment/kpa-assessment.component';
import { ViewKpaResultsComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/view-kpa-results/view-kpa-results.component';
import { ExecAssessmentConfigComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-config/exec-assessment-config.component';
import { ManageKpasComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-kpas/manage-kpas.component';
import { ManageCharacteristicsComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-characteristics/manage-characteristics.component';
import { ManageExecAssessmentsComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-config/manage-exec-assessments/manage-exec-assessments.component';
import { ExecManageUsersComponent } from './kwenza/MaturityAssessments/assessment-landing-type/exec-assessment-landing/exec-assessment-config/exec-manage-users/exec-manage-users.component';
import { isSavedGuard } from './guards/isSaved.guard';
import { BokamosoComponent } from './bokamoso/bokamoso.component';
import { AcknowledgementComponent } from './asset-health/pages/acknowledgement/acknowledgement.component';
import { BBSSDeviceComponent } from './asset-health/pages/bbssdevice/bbssdevice.component';
import { MachineConfigurationComponent } from './asset-health/pages/machine-configuration/machine-configuration.component';
import { DiagnosisChartsComponent } from './asset-health/pages/diagnosis-charts/diagnosis-charts.component';
import { MachineBlocksComponent } from './asset-health/pages/machine-blocks/machine-blocks.component';
import { MainComponent } from './asset-health/pages/charts/main/main.component';
import { ManageKpisComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-config/manage-kpis/manage-kpis.component';
import { ManageBpKpiUsersComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-config/manage-BpKpi-users/manage-BpKpi-users.component'
import { ViewConsensusResultsComponent } from './kwenza/MaturityAssessments/assessment-landing/view-consensus-results/view-consensus-results.component';
import { ManageBpComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-config/manage-bp/manage-bp.component';
import { ManageBpQuestionsComponent } from './kwenza/MaturityAssessments/assessment-landing/assessment-config/manage-bp-questions/manage-bp-questions.component';
import { ManageActionsComponent } from './kwenza/MaturityAssessments/assessment-landing/manage-actions/manage-actions.component';
import { ManageFrmwrksComponent } from './kwenza/MaturityAssessments/assessment-landing-type/system-config/manage-frmwrks/manage-frmwrks.component';
import { ManageVersionsComponent } from './kwenza/MaturityAssessments/assessment-landing-type/system-config/manage-versions/manage-versions.component';
import { ManageVariantsComponent } from './kwenza/MaturityAssessments/assessment-landing-type/system-config/manage-variants/manage-variants.component';
import { AssessmentsComponent } from './ukwazi/assessments/assessments.component';
import { AssessmentLandingComponent } from './ukwazi/assessment-landing/assessment-landing.component';
import { AssessmentLandingTypeComponent } from './ukwazi/assessment-landing-type/assessment-landing-type.component';
import { ParentChartsComponent } from './kwenza/production-flow/parent-charts/parent-charts.component';
import { ProdConfigurationComponent } from './kwenza/production-flow/prod-configuration/prod-configuration.component';
import { KpaComponent } from './kwenza/production-flow/kpa/kpa.component';
import { KpaLimitsComponent } from './kwenza/production-flow/kpa-limits/kpa-limits.component';
import { NewReadingsComponent } from './kwenza/production-flow/new-readings/new-readings.component';
import { NewReadingsEditvalueComponent } from './kwenza/production-flow/new-readings-editvalue/new-readings-editvalue.component';
import { OverallNewReadingsComponent } from './kwenza/production-flow/overall-new-readings/overall-new-readings.component';
import { KpaValueConfigComponent } from './kwenza/production-flow/kpa/kpa-value-config/kpa-value-config.component';


const routes: Routes = [
  { path: '', redirectTo: 'binmak', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'password-reset/:email/:token', component: PasswordResetComponent },
  { path: 'binmak',
      component: BinmakLandingComponent,
      children : [
        { path: '', component: RootComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'asset-register', component: AssetRegisterComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'asset-setup', component: AssetSetupComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'users', component: UsersComponent, pathMatch: 'full', canActivate: [AuthGuard] },
        { path: 'manage-access', component: ManagePermissionComponent, pathMatch: 'full', canActivate: [AuthGuard] },
        { path: 'kwenza', component: KwenzaComponent, pathMatch: 'full', canActivate: [AuthGuard] },
        { path: 'my-assets', component: ProductionFlowComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'asset-readings/:assetNodeId', component: ReadingsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'overall-production', component: OverallProductionComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'charts/:assetId', component: ChartsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'limits', component: EditLimitsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'edit-readings', component: EditReadingsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'ukwazi', component: UkwaziComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'bokamoso', component: BokamosoComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'acknowledgement', component: AcknowledgementComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'bbssdevice', component: BBSSDeviceComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'machine-configuration', component: MachineConfigurationComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'machine-configuration', component: MachineConfigurationComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'diagnosis-charts', component: DiagnosisChartsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'machine-blocks/:id/:name', component: MachineBlocksComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'machine-charts/:id', component: MainComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        //Asset Management Maturity Assessor
        { path: 'ukwazi-assessments', component: AssessmentsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'assessment-landing', component: AssessmentLandingComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'assessment-types', component: AssessmentLandingTypeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'assessment-system-config', component: SystemConfigComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'kpi-assessment/:id', component: KpiAssessmentComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'bp-assessment/:kpaPage/:bpPage/:qstnPage', component: BpAssessmentComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'assessment-config', component: AssessmentConfigComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'exec-assessment-landing', component: ExecAssessmentLandingComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'kpa-assessment/:id', component: KpaAssessmentComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'kpa-results', component: ViewKpaResultsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'exec-assessment-config', component: ExecAssessmentConfigComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'manage-exec-kpas', component: ManageKpasComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'manage-exec-characteristics', component: ManageCharacteristicsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'manage-exec-assessments', component: ManageExecAssessmentsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'manage-exec-users', component: ExecManageUsersComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'manage-kpis', component: ManageKpisComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'manage-BpKpi-users', component: ManageBpKpiUsersComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'consensus-results', component: ViewConsensusResultsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'manage-bps', component: ManageBpComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'manage-bp-questions', component: ManageBpQuestionsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'manage-actions', component: ManageActionsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'manage-frmwrks', component: ManageFrmwrksComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'manage-versions', component: ManageVersionsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'manage-variants', component: ManageVariantsComponent, pathMatch: 'full', canActivate: [AuthGuard]}
        { path: 'new-asset-readings/:assetNodeId', component: NewReadingsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'new-readings-editvalue', component: NewReadingsEditvalueComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'overall-production', component: OverallProductionComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'charts/:assetId', component: ChartsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'parent-charts/:assetId', component: ParentChartsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'limits', component: EditLimitsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'edit-readings', component: EditReadingsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'ukwazi', component: UkwaziComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'ukwazi-assessments', component: AssessmentsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'assessment-landing', component: AssessmentLandingComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'assessment-types', component: AssessmentLandingTypeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'prod-config', component: ProdConfigurationComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'kpa', component: KpaComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'kpa-limit', component: KpaLimitsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'overall-new-readings/:assetNodeId', component: OverallNewReadingsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'kpa-value-config/:keyProcessAreaId', component: KpaValueConfigComponent, pathMatch: 'full', canActivate: [AuthGuard]},
      ]
    },
    {path:'**', redirectTo: 'binmak', pathMatch: 'full', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
