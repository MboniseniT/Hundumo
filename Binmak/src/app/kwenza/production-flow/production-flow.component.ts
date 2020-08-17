import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MainServiceService } from 'src/app/services/main-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-production-flow',
  templateUrl: './production-flow.component.html',
  styleUrls: ['./production-flow.component.scss']
})
export class ProductionFlowComponent implements OnInit {

  assetNode: any;
  assetNodeId: number;
  name: string;
  loading: boolean;
  assetNodes: Array<any>;
  isDataReady: boolean;
  assetId: number;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isAssetAdmin: boolean;
  assetUsers: Array<any>;

  constructor(private service: MainServiceService,
    private route: ActivatedRoute, private router: Router,
    private toastrService: ToastService) {

  }

  ngOnInit() {

    this.loading = true;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 7
    };

    this.service.GetMyAssetNode(JSON.parse(localStorage.getItem('currentUser')).userId)
      .subscribe((resp: any) => { 
        this.loading = false;
        this.assetNodes = resp;
        this.dtTrigger.next();
        console.log(resp);
      }, (error:any)=>{
        this.loading = false;
        console.log(error);
      })
  }

  back() {
    this.router.navigate(['binmak/kwenza']);
  }

  accessReadings(node){
    this.router.navigate(['binmak/asset-readings', node.assetNodeId]);
  }

  accessCharts(node){
      this.router.navigate(['/binmak/charts/'+node.assetNodeId]);
  }



}
