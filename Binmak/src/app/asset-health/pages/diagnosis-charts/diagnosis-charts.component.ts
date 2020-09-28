import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts/highcharts.src'
import { AssetHealthService } from 'src/app/services/asset-health.service';
import { PreffixUrl } from '../../enums/preffix-url.enum';
import highcharts3D from 'highcharts/highcharts-3d.src'
highcharts3D(Highcharts);
@Component({
  selector: 'app-diagnosis-charts',
  templateUrl: './diagnosis-charts.component.html',
  styleUrls: ['./diagnosis-charts.component.scss']
})
export class DiagnosisChartsComponent implements OnInit {
  chartOptions: any;
  constructor(private request: AssetHealthService, private router: Router) {
  }

  ngOnInit(): void {
    this.request.getAll(PreffixUrl.Machine).subscribe(result => {
      this.request.getAll(PreffixUrl.SensorCondtion).subscribe(sensorConditionResult => {       
       var dataList = [];
       sensorConditionResult.items.forEach(element => {
        var data = [];
        data.push(element.name);
        data.push(result.items.filter(item=> item.conditionId == element.id).length);
        data.push(element.id);
        dataList.push(data);
       });
        this.chartOptions = {
          chart: {
            type: 'pie',
            options3d: {
              enabled: true,
              alpha: 45,
              depth: 200,
              viewDistance:125
            }
          },
          title: {
            text: 'Machine Overall Condition'
          },
          subtitle: {
            text: ''
          },
          plotOptions: {
            pie: {
              innerSize: 100,
              depth: 45,
              cursor: 'pointer', point: {
                events: {
                  click: function (e) {
                    window.location.href = "#/binmak/machine-blocks/"+sensorConditionResult.items.filter(a=>a.name==e.point.name)[0].id+"/"+e.point.name;
                  }
                }
              }
            }
          }, shadow: {
            color: 'yellow',
            width: 10,
            offsetX: 0,
            offsetY: 0
          },
          colors: ['#c1c1c1', '#ea4335', '#fbbc05', '#23c64e'],
          series: [{
            name: 'Machine Diagnosis',
            data: dataList,
          }]
        };
         Highcharts.chart('container', this.chartOptions);
      })
    });

  }

}
