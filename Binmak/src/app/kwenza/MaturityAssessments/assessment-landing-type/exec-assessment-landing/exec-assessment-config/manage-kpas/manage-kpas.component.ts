import { Component, OnInit } from '@angular/core';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';

@Component({
  selector: 'app-manage-kpas',
  templateUrl: './manage-kpas.component.html',
  styleUrls: ['./manage-kpas.component.scss']
})
export class ManageKpasComponent implements OnInit {

  kpas:KPA[];
  totalRecords: Number; //might need to change type to string
  page: Number=1;
  searchText: string;
  assessID: string = "Hola Mundo";

  constructor(private kpaServive: AssessmentsConfigService) { }

  ngOnInit():void {
    this.loadDataTable();
  }

  loadDataTable(){
    this.kpaServive.GetExecKPAs().subscribe(
      (data:KPA[]) => {
        this.kpas = data;
        console.log(data);
        this.totalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

  edit(){

  }

}
