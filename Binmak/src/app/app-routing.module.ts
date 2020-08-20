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

        //Asset Management Maturity Assessor
        { path: 'ukwazi-assessments', component: AssessmentsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'assessment-landing', component: AssessmentLandingComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'assessment-types', component: AssessmentLandingTypeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'assessment-system-config', component: SystemConfigComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'kpi-assessment', component: KpiAssessmentComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'bp-assessment', component: BpAssessmentComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'assessment-config', component: AssessmentConfigComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'exec-assessment-landing', component: ExecAssessmentLandingComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'kpa-assessment', component: KpaAssessmentComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'kpa-results', component: ViewKpaResultsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'exec-assessment-config', component: ExecAssessmentConfigComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'manage-exec-kpas', component: ManageKpasComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'manage-exec-characteristics', component: ManageCharacteristicsComponent, pathMatch: 'full', canActivate: [AuthGuard]}
      ]
    },
    {path:'**', redirectTo: 'binmak', pathMatch: 'full', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
