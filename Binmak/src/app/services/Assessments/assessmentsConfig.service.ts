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

@Injectable({
  providedIn: 'root'
})
export class AssessmentsConfigService {
  assessmentUrl="http://localhost:44318/Assessments/Config/";
constructor(private http: HttpClient) { }

//Exec Assessments
      /*Assessment Users*/
      AddAssessmentUser(assessmentUser){
        let idSet = {reference:JSON.parse(localStorage.getItem('currentUser')).userId, link_name: ""};
        assessmentUser = Object.assign(assessmentUser, idSet);
        console.log(assessmentUser);
        return this.http.post(this.assessmentUrl+'addAssessmentUser', assessmentUser);
      }
      GetAssessmentUsers(): Observable<any[]>{
        let idSet = {reference:JSON.parse(localStorage.getItem('currentUser')).userId};
        return this.http.post<any[]>(this.assessmentUrl+'getAssessmentUsers', idSet);
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

      /*Versions*/
      getVersions(): Observable<Version[]>{
        return this.http.get<Version[]>(this.assessmentUrl+'getVersions');
      }

      /*Variants*/
      getVariants(): Observable<Variant[]>{
        return this.http.get<Variant[]>(this.assessmentUrl+'getVariants');
      }

      /*Variants*/
      getAssestNodes(): Observable<any[]>{
        let idSet = {reference:JSON.parse(localStorage.getItem('currentUser')).userId}
        //, JSON.parse(localStorage.getItem('currentUser')).userId
        return this.http.post<any[]>(this.assessmentUrl+'getAssestNodes', idSet);
      }

      /*Assessments*/
      getAssessments(): Observable<Assessment[]>{
        let idSet = {reference:JSON.parse(localStorage.getItem('currentUser')).userId}
        return this.http.post<Assessment[]>(this.assessmentUrl+'getAssessments', idSet);
      }

      addAssessment(assess){
        return this.http.post(this.assessmentUrl+'addAssessment', assess);
      }

      deleteAssessment(assess){
        return this.http.post(this.assessmentUrl+'deleteAssessment', assess);
      }

      clearAssessment(assess){
        return this.http.put(this.assessmentUrl+'clearAssessment', assess);
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

      putResult(id:string,result){
        let idSet:any = {ID:id};
        result = Object.assign(result, idSet);
        return this.http.put(this.assessmentUrl+'editResult', result)
      }



}
