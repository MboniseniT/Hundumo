import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-kpa-value-config',
  templateUrl: './kpa-value-config.component.html',
  styleUrls: ['./kpa-value-config.component.scss']
})
export class KpaValueConfigComponent implements OnInit {

  dynamicFormular: string = '';
  
  keyProcessAreaId: number;
  kpas: Array<any> = [];
  operators: Array<any>;
  loading: boolean;
  isFormulaShow: boolean;
  formular: Array<any> = [];
  index: number;

  kpaFormula: any;
  kpaName: string;
  previousFormula: string;

  constructor(private route: ActivatedRoute, private service: MainServiceService, private toastrService: ToastService,
    private router: Router) { 
  }

  ngOnInit(): void {

    this.index = 0;
    this.isFormulaShow = false;

    this.route.params.subscribe( params => {
      this.keyProcessAreaId = +params.keyProcessAreaId;
      console.log(this.keyProcessAreaId);
    });

    this.service.GetClientAssetKPAs(this.keyProcessAreaId)
    .subscribe((resp: any) =>{
      console.log(resp);
      this.kpas = resp.map((t: any) => {
        return { label: t.kpaName, value: t.kpaId }
      })
    }, (error: any) =>{
      console.log(error.error);
    });

    this.service.GetKPAFormula(this.keyProcessAreaId)
    .subscribe((resp: any) =>{
      console.log(resp);
      this.kpaFormula = resp;
      this.kpaName = resp.keyProcessAreaName;
      this.previousFormula = resp.formulaString

    }, (error: any) =>{
      console.log(error.error);
    });

    this.service.getMathsOperators()
    .subscribe((resp: any) =>{
      console.log(resp);
      this.operators = resp.map((t: any) => {
        return { label: t.mathematicalOperatorSign, value: t.mathematicalOperatorId }
      })
    }, (error: any) =>{
      console.log(error.error);
    });

  }

  kpaSummaryConfigForm = new FormGroup({
    kpa: new FormControl('', [Validators.required, Validators.minLength(1)]),
    operator: new FormControl('')
  });

  k: any;
  o: any;
  operator: string;
  kpa: string;
  formularChainString: string = "";
  masterFormulaKPA: Array<any> = [];
  masterFormulaO: Array<any> = [];
  masterIndex: Array<any> = [];
  masterFormularAll: Array<any> = [];

  SaveKpa(){
    this.index = this.index + 1;
    this.k =  this.kpas.filter(id=>id.value == this.kpaSummaryConfigForm.value.kpa);
    this.kpa = this.k[0].label;
    this.masterFormulaKPA.push(this.k[0].value);
    this.masterFormularAll.push(this.k[0].value);
    this.masterIndex.push(this.index);
    this.formularChainString = this.formularChainString +' '+this.kpa;
  }

  SaveOperation(){
    this.index = this.index + 1;
    this.o =  this.operators.filter(id=>id.value == this.kpaSummaryConfigForm.value.operator);
    this.operator = this.o[0].label;

    this.masterFormulaO.push(this.o[0].value);
    this.masterFormularAll.push(this.k[0].value)
    this.masterIndex.push(this.index);
    this.formularChainString = this.formularChainString +' '+this.operator;
  }

  Refresh(){
    location.reload();
  }

  
  Save(){

    const model ={
      keyProcessAreaId: this.keyProcessAreaId,
      FormulaString: this.formularChainString,
      MasterFormularArray: this.masterFormularAll.join()
    }

    this.service.saveFormulaCreation(model)
    .subscribe((resp: any) =>{
      console.log(resp);

      location.reload();
    }, (error: any) =>{
      console.log(error.error);
      this.toastrService.error(error.error);
    });


  }
}
