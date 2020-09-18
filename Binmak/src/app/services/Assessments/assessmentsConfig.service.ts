import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { Level } from 'src/app/Models/Assessments/Level';
import { Char } from 'src/app/Models/Assessments/char';
import { KPALevel } from 'src/app/Models/Assessments/KPALevel';
import { Frmwrk } from 'src/app/Models/Assessments/frmwrk';
import { Variant } from 'src/app/Models/Assessments/variant';
import { Version } from 'src/app/Models/Assessments/version';
import { Assessment } from 'src/app/Models/Assessments/assessment';
import { LResult } from 'src/app/Models/Assessments/lResults';
import { KPI } from 'src/app/Models/Assessments/kpi';
import { TableKPI } from 'src/app/Models/Assessments/TableKPI';
import { KpiResult } from 'src/app/Models/Assessments/kpiResult';
import { BP } from 'src/app/Models/Assessments/bp';
import { BpTable } from 'src/app/Models/Assessments/bpTable';
import { BpQuestionTable } from 'src/app/Models/Assessments/bpQuestionTable';
import { BpResult } from 'src/app/Models/Assessments/bpResults';
import { ActionTable } from 'src/app/Models/Assessments/actionTable';
import { FrmwrkTable } from 'src/app/Models/Assessments/frmwrkTable';
import { VersionTable } from 'src/app/Models/Assessments/versionTable';
import { VariantTable } from 'src/app/Models/Assessments/variantTable';

@Injectable({
  providedIn: 'root'
})
export class AssessmentsConfigService {
  assessmentUrl="http://localhost:44318/Assessments/Config/";
  //assessmentUrl="http://binmakdev.dedicated.co.za:93/Assessments/Config/";
constructor(private http: HttpClient) { }

//Exec Assessments
      /*Assessments*/
      getAssessments(): Observable<Assessment[]>{
        let idSet = {reference:JSON.parse(localStorage.getItem('currentUser')).userId}
        return this.http.post<Assessment[]>(this.assessmentUrl+'getAssessments', idSet);
      }

      GetSections(assessID): Observable<any[]>{
        let idSet = {reference:assessID};
        return this.http.post<any[]>(this.assessmentUrl+'getSections', idSet);
      }

      addAssessment(assess){
        return this.http.post(this.assessmentUrl+'addAssessment', assess);
      }

      AddSections(section){
        let idSet = {user_id:JSON.parse(localStorage.getItem('currentUser')).userId};
        section = Object.assign(section, idSet);
        //console.log(section);
        return this.http.post(this.assessmentUrl+'addSections', section);
      }

      deleteAssessment(assess){
        return this.http.post(this.assessmentUrl+'deleteAssessment', assess);
      }

      clearAssessment(assess){
        return this.http.put(this.assessmentUrl+'clearAssessment', assess);
      }

      SaveAssessment(assessment){
        let idSet:any = {assessID:assessment.id, userID:JSON.parse(localStorage.getItem('currentUser')).userId}
        return this.http.put(this.assessmentUrl+'saveAssessment', idSet)
      }

      /*Assessment Users*/
      AddExecAssessmentUser(assessmentUser){
        let idSet = {reference:JSON.parse(localStorage.getItem('currentUser')).userId, link_name: ""};
        assessmentUser = Object.assign(assessmentUser, idSet);
        console.log(assessmentUser);
        return this.http.post(this.assessmentUrl+'addExecAssessmentUser', assessmentUser);
      }
      AddAssessmentUser(assessmentUser){
        let idSet = {reference:JSON.parse(localStorage.getItem('currentUser')).userId, link_name: ""};
        assessmentUser = Object.assign(assessmentUser, idSet);
        //console.log(assessmentUser);
        return this.http.post(this.assessmentUrl+'addAssessmentUser', assessmentUser);
      }
      GetExecAssessmentUsers(): Observable<any[]>{
        let idSet = {reference:JSON.parse(localStorage.getItem('currentUser')).userId};
        return this.http.post<any[]>(this.assessmentUrl+'getExecAssessmentUsers', idSet);
      }
      GetAssessmentUsers(): Observable<any[]>{
        let idSet = {reference:JSON.parse(localStorage.getItem('currentUser')).userId};
        return this.http.post<any[]>(this.assessmentUrl+'getAssessmentUsers', idSet);
      }

      GetExecAssessmentUsersForSelection(): Observable<any[]>{
        let idSet = {reference:JSON.parse(localStorage.getItem('currentUser')).userId};
        return this.http.post<any[]>(this.assessmentUrl+'getExecAssessmentUsersForSelection', idSet);
      }

      GetAssessmentUsersForSelection(): Observable<any[]>{
        let idSet = {reference:JSON.parse(localStorage.getItem('currentUser')).userId};
        return this.http.post<any[]>(this.assessmentUrl+'getAssessmentUsersForSelection', idSet);
      }

      GetAssessmentById(id:string): Observable<Assessment[]>{
        let idSet = {reference:id};
        return this.http.post<Assessment[]>(this.assessmentUrl+'getAssessmentById', idSet);
      }

      DeleteAssessmentUser(assessmentUser){
        return this.http.post(this.assessmentUrl+'deleteAssessmentUser', assessmentUser);
      }
      /*KPAs*/
      GetExecKPAs(): Observable<KPA[]>{
        return this.http.get<KPA[]>(this.assessmentUrl+'getExecKPAs');
      }

      GetExecKPAByID(id:number): Observable<KPA[]>{
        return this.http.get<KPA[]>(this.assessmentUrl+'getExecKPAByID/'+id);
      }

      AddExecKPA(kpa){
        return this.http.post(this.assessmentUrl+'addExecKPAs', kpa);
      }

      DeleteExecKPA(id:string){
        return this.http.delete(this.assessmentUrl+'deleteExecKPAs/'+id);
      }

      EditExecKPA(kpa){
        return this.http.put(this.assessmentUrl+'editExecKPAs', kpa);
      }

      /*KPIs*/
      GetKPIs(): Observable<KPI[]>{
        return this.http.get<KPI[]>(this.assessmentUrl+'getKPIs');
      }
      GetFilteredKPIs(assessment): Observable<KPI[]>{
        return this.http.post<KPI[]>(this.assessmentUrl+'getFilteredKPIs',assessment);
      }
      AddKPI(kpi){
        return this.http.post(this.assessmentUrl+'addKPIs', kpi);
      }
      DeleteKPI(kpi){
        return this.http.post(this.assessmentUrl+'deleteKPI', kpi);
      }
      EditKPI(kpi){
        return this.http.put(this.assessmentUrl+'editKPIs', kpi);
      }

      /*BPs*/
      GetBPs(): Observable<BpTable[]>{
        return this.http.get<BpTable[]>(this.assessmentUrl+'getBPs');
      }
      AddBp(bp){
        return this.http.post(this.assessmentUrl+'addBp', bp);
      }

      EditBP(bp){
        return this.http.put(this.assessmentUrl+'editBPs', bp);
      }

      DeleteBP(bp){
        return this.http.post(this.assessmentUrl+'deleteBP', bp);
      }

      /*BP Questions*/
      GetBpQuestions(): Observable<BpQuestionTable[]>{
        return this.http.get<BpQuestionTable[]>(this.assessmentUrl+'getBpQuestions');
      }
      GetFilteredTableBpQuestions(assessment): Observable<BpQuestionTable[]>{
        return this.http.post<BpQuestionTable[]>(this.assessmentUrl+'getFilteredTableBpQuestions', assessment);
      }
      GetFilteredBPQuestions(assessment): Observable<any[]>{
        return this.http.post<any[]>(this.assessmentUrl+'getFilteredBPQuestions',assessment);
      }
      AddBPQuestion(bpQuestion){
        return this.http.post(this.assessmentUrl+'addBPQuestion', bpQuestion);
      }
      EditBPQuestion(bpQuestion){
        return this.http.put(this.assessmentUrl+'editBPQuestion', bpQuestion);
      }
      DeleteBPQuestion(bpQuestion){
        return this.http.post(this.assessmentUrl+'deleteBPQuestion', bpQuestion);
      }

      /*Action Manager*/
      GetAllActions(assessmentID): Observable<ActionTable[]>{
        let idSet = {reference:assessmentID};
        return this.http.post<ActionTable[]>(this.assessmentUrl+'getAllActions',idSet);
      }
      GetFilteredActions(assessmentID, sectionID): Observable<ActionTable[]>{
        let idSet = {assessID:assessmentID, sectID:sectionID};
        return this.http.post<ActionTable[]>(this.assessmentUrl+'GetFilteredActions',idSet);
      }
      EditAction(action){
        return this.http.put(this.assessmentUrl+'editAction', action);
      }

      /*Levels*/
      getLevels(): Observable<Level[]>{
        return this.http.get<Level[]>(this.assessmentUrl+'getLevels');
      }

      getLevelById(id:number): Observable<Level[]>{
        return this.http.get<Level[]>(this.assessmentUrl+'getLevelByID/'+id);
      }

      postLevel(level){
        return this.http.post(this.assessmentUrl+'addLevel', level);
      }

      deleteLevel(id:string){
        return this.http.delete(this.assessmentUrl+'deleteLevel/'+id);
      }

      putLevel(id:string,level){
        return this.http.put(this.assessmentUrl+'editLevel/'+id, level);
      }

      /*Characteristics*/
      getCharacteristics(): Observable<Char[]>{
        return this.http.get<Char[]>(this.assessmentUrl+'getCharacteristics');
      }

      getKPALevelChars(kpaLevel:any): Observable<any>{
        return this.http.post<any>(this.assessmentUrl+'getKPALevelChars', kpaLevel);
      }

      getRunKPALevelChars(kpaID:string, levelID:string, Frmwrk:string, Version:string, Variant:string): Observable<Char[]>{
        let idSet:any = {kpaId:kpaID, levelId:levelID,frmwrk:Frmwrk,version:Version, variant:Variant}
        return this.http.post<Char[]>(this.assessmentUrl+'getRunKPALevelChars', idSet);
      }

      addChar(characteristic){
        return this.http.post(this.assessmentUrl+'addChar', characteristic);
      }

      deleteChar(characteristic){
        return this.http.post(this.assessmentUrl+'deleteChar', characteristic);
      }

      editChar(characteristic){
        return this.http.put(this.assessmentUrl+'editChar', characteristic);
      }

      /*Frameworks*/
      getFrameworks(): Observable<Frmwrk[]>{
        return this.http.get<Frmwrk[]>(this.assessmentUrl+'getFrameworks');
      }
      getTableFrameworks(): Observable<FrmwrkTable[]>{
        return this.http.get<FrmwrkTable[]>(this.assessmentUrl+'getTableFrameworks');
      }
      AddFramework(frmwrk){
        return this.http.post(this.assessmentUrl+'addFramework', frmwrk);
      }
      EditFrmwrk(frmwrk){
        return this.http.put(this.assessmentUrl+'editFrmwrk', frmwrk);
      }

      /*Versions*/
      getVersions(): Observable<Version[]>{
        return this.http.get<Version[]>(this.assessmentUrl+'getVersions');
      }
      getTableVersions(): Observable<VersionTable[]>{
        return this.http.get<VersionTable[]>(this.assessmentUrl+'getTableVersions');
      }
      AddVersion(version){
        return this.http.post(this.assessmentUrl+'addVersion', version);
      }
      EditVersion(version){
        return this.http.put(this.assessmentUrl+'editVersion', version);
      }

      /*Variants*/
      getVariants(): Observable<Variant[]>{
        return this.http.get<Variant[]>(this.assessmentUrl+'getVariants');
      }
      getTableVariants(): Observable<VariantTable[]>{
        return this.http.get<VariantTable[]>(this.assessmentUrl+'getTableVariants');
      }
      AddVariant(version){
        return this.http.post(this.assessmentUrl+'addVariant', version);
      }
      EditVariant(version){
        return this.http.put(this.assessmentUrl+'editVariant', version);
      }

      /*AssetNodes*/
      getAssestNodes(): Observable<any[]>{
        let idSet = {reference:JSON.parse(localStorage.getItem('currentUser')).userId}
        //, JSON.parse(localStorage.getItem('currentUser')).userId
        return this.http.post<any[]>(this.assessmentUrl+'getAssestNodes', idSet);
      }

      getSectionNodes(PANId): Observable<any[]>{
        let idSet = {reference:JSON.parse(localStorage.getItem('currentUser')).userId, ParentAssetNodeId:PANId}
        //, JSON.parse(localStorage.getItem('currentUser')).userId
        return this.http.post<any[]>(this.assessmentUrl+'getSectionNodes', idSet);
      }

      /*Exec-Results*/
      getAllChars(): Observable<Char[]>{
        return this.http.get<Char[]>(this.assessmentUrl+'api/chars?kpaID=1&levelID=1&ID=1&type=All')
      }

      getCurrentUserResults(kpa_id:string, level_id:string, assess_id:string, user_id:string): Observable<LResult[]>{
        let idSet:any = {kpaID:kpa_id, levelID: level_id, assessID:assess_id, userID:user_id};
        return this.http.post<LResult[]>(this.assessmentUrl+'getCurrentUserResults', idSet);
      }

      getAllUserResults(kpa_id:string, level_id:string, assess_id:string): Observable<LResult[]>{
        let idSet:any = {kpaID:kpa_id, levelID: level_id, assessID:assess_id};
        return this.http.post<LResult[]>(this.assessmentUrl+'getAllUserResults', idSet);
      }

      postResult(result){
        return this.http.post(this.assessmentUrl+'addResult', result);
      }

      putResult(result){
        //let idSet:any = {ID:id};
        //result = Object.assign(result, idSet);
        return this.http.post(this.assessmentUrl+'editResult', result)
      }

      //KPI Results
      AddKpiResults(result){
        let idSet = {user_id:JSON.parse(localStorage.getItem('currentUser')).userId};
        result = Object.assign(result, idSet);
        //console.log(result);
        return this.http.post(this.assessmentUrl+'addkpiResults', result);
      }

      GetkpiResults(assessID:number): Observable<KpiResult[]>{
        let idSet:any = {assess_id:assessID};
        return this.http.post<KpiResult[]>(this.assessmentUrl+'getkpiResults', idSet);
      }

      GetkpiResultById(kpiID:number, assessID:number): Observable<KpiResult>{
        let idSet:any = {kpi_id:kpiID, assess_id:assessID};
        return this.http.post<KpiResult>(this.assessmentUrl+'getkpiResultById', idSet);
      }

      GetKpiProgress(assessment): Observable<any>{
        return this.http.post<any>(this.assessmentUrl+'getKpiProgress', assessment);
      }

      UpdateKpiResults(result){
        let idSet = {user_id:JSON.parse(localStorage.getItem('currentUser')).userId};
        result = Object.assign(result, idSet);
        //console.log(result);
        return this.http.put(this.assessmentUrl+'updateKpiResults', result);
      }

      //BP Results
      AddBPResults(result){
        let idSet = {user_id:JSON.parse(localStorage.getItem('currentUser')).userId};
        result = Object.assign(result, idSet);
        //console.log(result);
        return this.http.post(this.assessmentUrl+'addBPResults', result);
      }

      GetBpResults(assessID:number): Observable<BpResult[]>{
        let idSet:any = {assess_id:assessID};
        return this.http.post<BpResult[]>(this.assessmentUrl+'getBpResults', idSet);
      }

      GetBpResultById(bpQuestionID:number, assessID:number): Observable<BpResult>{
        let idSet:any = {bpQuestion_id:bpQuestionID, assess_id:assessID};
        return this.http.post<BpResult>(this.assessmentUrl+'getBpResultById', idSet);
      }

      GetBpProgress(assessment): Observable<any>{
        return this.http.post<any>(this.assessmentUrl+'getBpProgress', assessment);
      }

      UpdateBpResults(result){
        let idSet = {user_id:JSON.parse(localStorage.getItem('currentUser')).userId};
        result = Object.assign(result, idSet);
        //console.log(result);
        return this.http.put(this.assessmentUrl+'updateBpResults', result);
      }


}
