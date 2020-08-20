import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { Level } from 'src/app/Models/Assessments/Level';
import { Char } from 'src/app/Models/Assessments/char';
import { KPALevel } from 'src/app/Models/Assessments/KPALevel';

@Injectable({
  providedIn: 'root'
})
export class AssessmentsConfigService {
  assessmentUrl="http://localhost:44318/Assessments/Config/";
constructor(private http: HttpClient) { }

//Exec Assessments
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
      getAllChars(): Observable<Char[]>{
        return this.http.get<Char[]>(this.assessmentUrl+'api/chars?frmwrk=1&version=1&variant=1&kpaID=1&levelID=1&ID=1&type=All')
      }

      getCharById(id:number): Observable<Char[]>{
        return this.http.get<Char[]>(this.assessmentUrl+'api/chars?frmwrk=1&version=1&variant=1&kpaID=1&levelID=1&ID='+id+'&type=byid')
      }

      getKPALevelChars(kpaLevel:any): Observable<Char[]>{
        console.log(kpaLevel);
        return this.http.get<Char[]>(this.assessmentUrl+'api/chars?frmwrk=1&version=1&variant=1&kpaID=1&levelID=1&ID=1&type=comboid')
      }

      getRunKPALevelChars(kpaID:string, levelID:string, frmwrk:string, version:string, variant:string): Observable<Char[]>{
        return this.http.get<Char[]>(this.assessmentUrl+'api/chars?frmwrk='+frmwrk+'&version='+version+'&variant='+variant+'&kpaID='+kpaID+'&levelID='+levelID+'&ID=1&type=allids')
      }

      postChar(characteristic){
        return this.http.post(this.assessmentUrl+'api/chars', characteristic)
      }

      deleteChar(id:string){
        return this.http.delete(this.assessmentUrl+'api/chars/'+id)
      }

      putChar(id:string,characteristic){
        return this.http.put(this.assessmentUrl+'api/chars/'+id, characteristic)
      }


}
