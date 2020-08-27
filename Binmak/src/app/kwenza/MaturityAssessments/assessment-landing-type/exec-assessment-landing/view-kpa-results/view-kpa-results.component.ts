import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { KPA } from 'src/app/Models/Assessments/kpa';
import { Level } from 'src/app/Models/Assessments/level';
import { LResult } from 'src/app/Models/Assessments/lResults';
import { Result } from 'src/app/Models/Assessments/results';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
let exporting = require('highcharts/modules/exporting');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
exporting(Highcharts);

@Component({
  selector: 'app-view-kpa-results',
  templateUrl: './view-kpa-results.component.html',
  styleUrls: ['./view-kpa-results.component.scss']
})
export class ViewKpaResultsComponent implements OnInit {

  assessID:string = JSON.parse(localStorage.getItem("currentAssessment")).id;
  userID:string = JSON.parse(localStorage.getItem("currentUser")).userId;
  kpa: KPA[] = [];
  initKPA: KPA[] = [
    {"id":0,"name":"KPA1","description": "","user_id": null},
    {"id":0,"name":"KPA2","description": "","user_id": null},
    {"id":0,"name":"KPA3","description": "","user_id": null},
    {"id":0,"name":"KPA4","description": "","user_id": null},
    {"id":0,"name":"KPA5","description": "","user_id": null},
    {"id":0,"name":"KPA6","description": "","user_id": null},
    {"id":0,"name":"KPA7","description": "","user_id": null},
    {"id":0,"name":"KPA8","description": "","user_id": null},
    {"id":0,"name":"KPA9","description": "","user_id": null},
    {"id":0,"name":"KPA10","description": "","user_id": null},
    {"id":0,"name":"KPA11","description": "","user_id": null},
    {"id":0,"name":"KPA12","description": "","user_id": null},
    {"id":0,"name":"KPA13","description": "","user_id": null},
    {"id":0,"name":"KPA14","description": "","user_id": null},
    {"id":0,"name":"KPA15","description": "","user_id": null},
    {"id":0,"name":"KPA16","description": "","user_id": null},
    {"id":0,"name":"KPA17","description": "","user_id": null},
  ];
  kpaNum:number = 0;
  allkpaNum:number = 0;
  level: Level[] = [];
  kpaLevel: any = {};
  initKPAAverages:any = [
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0},
    {"value":0}
  ];
  KPAAverages:any = [];
  allKPAAverages:any = [];
  level1Results:LResult[];
  level2Results:LResult[];
  level3Results:LResult[];
  level4Results:LResult[];
  level5Results:LResult[];
  allLevel1Results:LResult[];
  allLevel2Results:LResult[];
  allLevel3Results:LResult[];
  allLevel4Results:LResult[];
  allLevel5Results:LResult[];
  initlevel1Results:LResult[] = [
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0}
  ];
  initlevel2Results:LResult[] = [
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0}
  ];
  initlevel3Results:LResult[] = [
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0}
  ];
  initlevel4Results:LResult[] = [
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0}
  ];
  initlevel5Results:LResult[] = [
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0},
    {"id": 0,"assess_id": "","characteristic_id": 0,"kpa_id": 0,"level_id": 0,"user_id": 0,"value": 0}
  ];
  results: any;
  iResult: Result;
  res: Result[];
  restotalrecords: Number;
  level1ResultstotalRecords: Number; //might need to change type to string
  level2ResultstotalRecords: Number;
  level3ResultstotalRecords: Number;
  level4ResultstotalRecords: Number;
  level5ResultstotalRecords: Number;
  allLevel1ResultstotalRecords: Number; //might need to change type to string
  allLevel2ResultstotalRecords: Number;
  allLevel3ResultstotalRecords: Number;
  allLevel4ResultstotalRecords: Number;
  allLevel5ResultstotalRecords: Number;
  leveltotalRecords: number;
  KPAtotalRecords: number;

  count:number = 1;
  progress:number;
  progressOther:number;
  totalScore:number = 0;
  totalScoreOther:number;

  kpaID:number = 1;
  levelID:number = 1;

  ctgrs:any = [];
  bpdata:any = [];
  kpidata:any = [];
  public options: any = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Key Performance Area'
    },
    xAxis: {
      categories: this.ctgrs
    },
    yAxis: {
      min: 0,
      max: 100,
      tickInterval:20,
      plotBands: [{
        color: '#ffb3b3',
        from: 0,
        to: 20,
        label: {
          align: 'left',
          rotation: 90,
          style: {
            fontStyle: 'italic'
          },
          text: 'Innocence',
          x: +25
        }
      }, {
          color: '#ffcc80',
          from: 20,
          to: 40,
          label: {
            align: 'left',
            rotation: 90,
            style: {
              fontStyle: 'italic'
            },
            text: 'Awareness',
            x: +25
          }
        }, {
          color: '#ffff80',
          from: 40,
          to: 60,
          label: {
            align: 'left',
            rotation: 90,
            style: {
              fontStyle: 'italic'
            },
            text: 'Understanding',
            x: +25
          }
        }, {
          color: '#b3ffb3',
          from: 60,
          to: 80,
          label: {
            align: 'left',
            rotation: 90,
            style: {
              fontStyle: 'italic'
            },
            text: 'Competence',
            x: +25
          }
        }, {
          color: '#b3b3ff',
          from: 80,
          to: 100,
          label: {
            align: 'left',
            rotation: 90,
            style: {
              fontStyle: 'italic'
            },
            text: 'Excellence',
            x: +25
          }
        }],
      title: {
        text: 'Score As a Percentage(%)'
      }
    },
    series: [{
      name: 'Your Results',
      data: this.KPAAverages,
      color: '#FF9900'
    },
    {
      name: 'Summary of All',
      data: this.allKPAAverages,
      color: '#032c57'
    }]
  }

  public options1: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: '<br><br>',
      align: 'center',
      verticalAlign: 'middle',
      y: 60
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '110%'
      }
    },
    series: [{
      type: 'pie',
      name: '',
      innerSize: '50%',
      data: [
        {
          name: '',
          y: 0,
          color: '#FF9900'
        },
        {
          name: '',
          y: 100,
          color: '#ccccb3',
          dataLabels: {
            enabled: false
          }
        }
      ]
    }]
  }


  // listen out for incoming message

  constructor(
              private assessmentService: AssessmentsConfigService,
              public _router: Router,
              public _location: Location
  ) { }

  ngOnInit() {
    this.loadChart();
    //retrieve KPAs from Database
    this.assessmentService.GetExecKPAs().subscribe(
      (data:KPA[]) => {
        this.kpa = data;
        //console.log(data);
        this.KPAtotalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    //retrieve Levels from Database
    this.assessmentService.getLevels().subscribe(
      (data:Level[]) => {
        this.level = data;
        //console.log(data);
        this.leveltotalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.kpaLevel = {
      "kpa_id": this.kpaID,
      "level_id": this.levelID
    };

    this.getKPAResults(this.kpaNum);
    this.getAverageKPAResults(this.allkpaNum);

  }

  loadChart(){
    Highcharts.chart('container', this.options);
    Highcharts.chart('container1', this.options1);
    Highcharts.chart('container2', this.options1);
    setTimeout(() => {
      this.calcProgress();
      Highcharts.chart('container', this.options);
      //console.log("Progress "+this.progress.toString());
      //console.log("Other "+this.progressOther.toString());
    },3000);
    setTimeout(() => {
      this.calcProgress();
      Highcharts.chart('container', this.options);
      //console.log("Progress "+this.progress.toString());
      //console.log("Other "+this.progressOther.toString());
    },6000);
    setTimeout(() => {
      this.calcProgress();
      Highcharts.chart('container', this.options);
      //console.log("Progress "+this.progress.toString());
      //console.log("Other "+this.progressOther.toString());
    },9000);
    setTimeout(() => {
      this.calcProgress();
      Highcharts.chart('container', this.options);
      Highcharts.chart('container1', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
        title: {
          text: 'KPA<br><br>',
          align: 'center',
          verticalAlign: 'middle',
          y: 60
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true,
              distance: -50,
              style: {
                fontWeight: 'bold',
                color: 'white'
              }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%'
          }
        },
        series: [{
          type: 'pie',
          name: 'KPA Assessment Progress',
          innerSize: '50%',
          data: [
            {
              name: 'Progress',
              y: this.progress,
              color: '#FF9900'
            },
            {
              name: 'Remaining',
              y: this.progressOther,
              color: '#ccccb3',
              dataLabels: {
                enabled: false
              }
            }
          ]
        }]
      });
      this.calcTotalScore();
    },12000);
  }

  calcProgress(){
    this.progress = 100 - Math.round((this.count/this.KPAtotalRecords)*100);
    this.progressOther = 100 - this.progress;
  }

  calcTotalScore(){
    let i:number;
    for(i=0;i<this.KPAAverages.length; i++){
      this.totalScore = this.totalScore + this.KPAAverages[i];
    }
    setTimeout(() => {
      this.totalScore = Math.round(this.totalScore/this.KPAAverages.length);
      this.totalScoreOther = 100 - this.totalScore;
      //console.log("The total score is: "+this.totalScore.toString());
      setTimeout(() => {
        Highcharts.chart('container2', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
          },
          title: {
            text: 'Score<br><br>',
            align: 'center',
            verticalAlign: 'middle',
            y: 60
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          accessibility: {
            point: {
              valueSuffix: '%'
            }
          },
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                  fontWeight: 'bold',
                  color: 'white'
                }
              },
              startAngle: -90,
              endAngle: 90,
              center: ['50%', '75%'],
              size: '110%'
            }
          },
          series: [{
            type: 'pie',
            name: 'KPA Assessment Score',
            innerSize: '50%',
            data: [
              {
                name: 'Total Score',
                y: this.totalScore,
                color: '#032c57'
              },
              {
                name: 'Remaining',
                y: this.totalScoreOther,
                color: '#ccccb3',
                dataLabels: {
                  enabled: false
                }
              }
            ]
          }]
        });
      },10);
    });
  }

  getKPAResults(kpaNum:number){
    setTimeout(() => {
      this.getCurrentUserScores();
      setTimeout(() => {
        if(this.level1ResultstotalRecords){
          // Calculate KPA Averages
          let i:number;
          const limit:number = 20;
          let KPAAverage:number;
          let checksLevel1:number = 0;
          let averageLevel1:number;
          let checksLevel2:number = 0;
          let averageLevel2:number;
          let checksLevel3:number = 0;
          let averageLevel3:number;
          let checksLevel4:number = 0;
          let averageLevel4:number;
          let checksLevel5:number = 0;
          let averageLevel5:number;
          for(i=0;i<this.level1ResultstotalRecords;i++){

            if(this.level1Results[i]['value'] === 1){
              checksLevel1 = checksLevel1 + 1;
            }
            //console.log("We are computing for level1..."+checksLevel1.toString()+" Result is "+this.level1Results[i]['value']);
          }
          for(i=0;i<this.level2ResultstotalRecords;i++){

            if(this.level2Results[i]['value'] === 1){
              checksLevel2 = checksLevel2 + 1;
            }
            //console.log("We are computing for level2..."+checksLevel2.toString()+" Result is "+this.level2Results[i]['value']);
          }
          for(i=0;i<this.level3ResultstotalRecords;i++){

            if(this.level3Results[i]['value'] === 1){
              checksLevel3 = checksLevel3 + 1;
            }
            //console.log("We are computing for level3..."+checksLevel3.toString()+" Result is "+this.level3Results[i]['value']);
          }
          for(i=0;i<this.level4ResultstotalRecords;i++){

            if(this.level4Results[i]['value'] === 1){
              checksLevel4 = checksLevel4 + 1;
            }
            //console.log("We are computing for level4..."+checksLevel4.toString()+" Result is "+this.level4Results[i]['value']);
          }
          for(i=0;i<this.level5ResultstotalRecords;i++){

            if(this.level5Results[i]['value'] === 1){
              checksLevel5 = checksLevel5 + 1;
            }
            //console.log("We are computing for level5..."+checksLevel5.toString()+" Result is "+this.level5Results[i]['value']);
          }

          averageLevel1 = Math.round(checksLevel1/Number(this.level1ResultstotalRecords) * limit);
          //console.log("Innocence: "+averageLevel1.toString());
          averageLevel2 = Math.round(checksLevel2/Number(this.level2ResultstotalRecords) * limit);
          //console.log("Awareness: "+averageLevel2.toString());
          averageLevel3 = Math.round(checksLevel3/Number(this.level3ResultstotalRecords) * limit);
          //console.log("Understanding: "+averageLevel3.toString());
          averageLevel4 = Math.round(checksLevel4/Number(this.level4ResultstotalRecords) * limit);
          //console.log("Competence: "+averageLevel4.toString());
          averageLevel5 = Math.round(checksLevel5/Number(this.level5ResultstotalRecords) * limit);
          //console.log("Excellence: "+averageLevel5.toString());

          setTimeout(() => {
            if(averageLevel1 < limit){
              KPAAverage = averageLevel1;
              this.KPAAverages.push(KPAAverage);
              this.ctgrs.push(this.kpa[kpaNum]['name']);
              this.kpaNum = this.kpaNum + 1;
              //console.log("KPA Average is "+ JSON.stringify(this.KPAAverages));
              setTimeout(() => {
                if(this.kpaNum < this.KPAtotalRecords){
                  this.getKPAResults(this.kpaNum);
                }
              });
            } else if(averageLevel1 === limit && averageLevel2 < limit){
              KPAAverage = limit + averageLevel2;
              this.KPAAverages.push(KPAAverage);
              this.ctgrs.push(this.kpa[kpaNum]['name']);
              this.kpaNum = this.kpaNum + 1;
              //console.log("KPA Average is "+ JSON.stringify(this.KPAAverages));
              setTimeout(() => {
                if(this.kpaNum < this.KPAtotalRecords){
                  this.getKPAResults(this.kpaNum);
                }
              });
            } else if(averageLevel1 === limit && averageLevel2 === limit && averageLevel3 < limit){
              KPAAverage = 2*(limit) + averageLevel3;
              this.KPAAverages.push(KPAAverage);
              this.ctgrs.push(this.kpa[kpaNum]['name']);
              this.kpaNum = this.kpaNum + 1;
              //console.log("KPA Average is "+ JSON.stringify(this.KPAAverages));
              setTimeout(() => {
                if(this.kpaNum < this.KPAtotalRecords){
                  this.getKPAResults(this.kpaNum);
                }
              });
            } else if(averageLevel1 === limit && averageLevel2 === limit && averageLevel3 === limit && averageLevel4 < limit){
              KPAAverage = 3*(limit) + averageLevel4;
              this.KPAAverages.push(KPAAverage);
              this.ctgrs.push(this.kpa[kpaNum]['name']);
              this.kpaNum = this.kpaNum + 1;
              //console.log("KPA Average is "+ JSON.stringify(this.KPAAverages));
              setTimeout(() => {
                if(this.kpaNum < this.KPAtotalRecords){
                  this.getKPAResults(this.kpaNum);
                }
              });
            } else if(averageLevel1 === limit && averageLevel2 === limit && averageLevel3 === limit && averageLevel4 === limit && averageLevel5 <= limit){
              KPAAverage = 4*(limit) + averageLevel5;
              this.KPAAverages.push(KPAAverage);
              this.ctgrs.push(this.kpa[kpaNum]['name']);
              this.kpaNum = this.kpaNum + 1;
              //console.log("KPA Average is "+ JSON.stringify(this.KPAAverages));
              setTimeout(() => {
                if(this.kpaNum < this.KPAtotalRecords){
                  this.getKPAResults(this.kpaNum);
                }
              });
            }
          });
        }else{
              this.count = this.count + 1;
              this.KPAAverages.push(0);
              this.ctgrs.push(this.kpa[kpaNum]['name']);
              this.kpaNum = this.kpaNum + 1;
              //console.log("KPA Average is "+ JSON.stringify(this.KPAAverages));
              setTimeout(() => {
                if(this.kpaNum < this.KPAtotalRecords){
                  this.getKPAResults(this.kpaNum);
                }
              });
        }

        if(this.KPAtotalRecords){
          this.initKPA = this.kpa;
        }
      },90);
    },400);
  }
  getAverageKPAResults(allkpaNum:number){
    setTimeout(() => {
      this.getAverageUserScores();
      setTimeout(() => {
        if(this.allLevel1ResultstotalRecords){
          // Calculate KPA Averages
          let j:number;
          const limit:number = 20;
          let allKPAAverage:number;
          let allchecksLevel1:number = 0;
          let allaverageLevel1:number;
          let allchecksLevel2:number = 0;
          let allaverageLevel2:number;
          let allchecksLevel3:number = 0;
          let allaverageLevel3:number;
          let allchecksLevel4:number = 0;
          let allaverageLevel4:number;
          let allchecksLevel5:number = 0;
          let allaverageLevel5:number;
          for(j=0;j<this.allLevel1ResultstotalRecords;j++){

            if(this.allLevel1Results[j]['value'] === 1){
              allchecksLevel1 = allchecksLevel1 + 1;
            }
            //console.log("We are computing for level1..."+checksLevel1.toString()+" Result is "+this.level1Results[i]['value']);
          }
          for(j=0;j<this.allLevel2ResultstotalRecords;j++){

            if(this.allLevel2Results[j]['value'] === 1){
              allchecksLevel2 = allchecksLevel2 + 1;
            }
            //console.log("We are computing for level2..."+checksLevel2.toString()+" Result is "+this.level2Results[i]['value']);
          }
          for(j=0;j<this.allLevel3ResultstotalRecords;j++){

            if(this.allLevel3Results[j]['value'] === 1){
              allchecksLevel3 = allchecksLevel3 + 1;
            }
            //console.log("We are computing for level3..."+checksLevel3.toString()+" Result is "+this.level3Results[i]['value']);
          }
          for(j=0;j<this.allLevel4ResultstotalRecords;j++){

            if(this.allLevel4Results[j]['value'] === 1){
              allchecksLevel4 = allchecksLevel4 + 1;
            }
            //console.log("We are computing for level4..."+checksLevel4.toString()+" Result is "+this.level4Results[i]['value']);
          }
          for(j=0;j<this.allLevel5ResultstotalRecords;j++){

            if(this.allLevel5Results[j]['value'] === 1){
              allchecksLevel5 = allchecksLevel5 + 1;
            }
            //console.log("We are computing for level5..."+checksLevel5.toString()+" Result is "+this.level5Results[i]['value']);
          }

          allaverageLevel1 = Math.round(allchecksLevel1/Number(this.allLevel1ResultstotalRecords) * limit);
          //console.log("Innocence: "+allaverageLevel1.toString());
          allaverageLevel2 = Math.round(allchecksLevel2/Number(this.allLevel2ResultstotalRecords) * limit);
          //console.log("Awareness: "+allaverageLevel2.toString());
          allaverageLevel3 = Math.round(allchecksLevel3/Number(this.allLevel3ResultstotalRecords) * limit);
          //console.log("Understanding: "+allaverageLevel3.toString());
          allaverageLevel4 = Math.round(allchecksLevel4/Number(this.allLevel4ResultstotalRecords) * limit);
          //console.log("Competence: "+allaverageLevel4.toString());
          allaverageLevel5 = Math.round(allchecksLevel5/Number(this.allLevel5ResultstotalRecords) * limit);
          //console.log("Excellence: "+allaverageLevel5.toString());

          setTimeout(() => {
            if(allaverageLevel1 < limit){
              allKPAAverage = allaverageLevel1;
              this.allKPAAverages.push(allKPAAverage);
              this.allkpaNum = this.allkpaNum + 1;
              //console.log("KPA Average is "+ JSON.stringify(this.allKPAAverages));
              setTimeout(() => {
                if(this.allkpaNum < this.KPAtotalRecords){
                  this.getAverageKPAResults(this.allkpaNum);
                }
              });
            } else if(allaverageLevel1 === limit && allaverageLevel2 < limit){
              allKPAAverage = limit + allaverageLevel2;
              this.allKPAAverages.push(allKPAAverage);
              this.allkpaNum = this.allkpaNum + 1;
              //console.log("KPA Average is "+ JSON.stringify(this.allKPAAverages));
              setTimeout(() => {
                if(this.allkpaNum < this.KPAtotalRecords){
                  this.getAverageKPAResults(this.allkpaNum);
                }
              });
            } else if(allaverageLevel1 === limit && allaverageLevel2 === limit && allaverageLevel3 < limit){
              allKPAAverage = 2*(limit) + allaverageLevel3;
              this.allKPAAverages.push(allKPAAverage);
              this.allkpaNum = this.allkpaNum + 1;
              //console.log("KPA Average is "+ JSON.stringify(this.allKPAAverages));
              setTimeout(() => {
                if(this.allkpaNum < this.KPAtotalRecords){
                  this.getAverageKPAResults(this.allkpaNum);
                }
              });
            } else if(allaverageLevel1 === limit && allaverageLevel2 === limit && allaverageLevel3 === limit && allaverageLevel4 < limit){
              allKPAAverage = 3*(limit) + allaverageLevel4;
              this.allKPAAverages.push(allKPAAverage);
              this.allkpaNum = this.allkpaNum + 1;
              //console.log("KPA Average is "+ JSON.stringify(this.allKPAAverages));
              setTimeout(() => {
                if(this.allkpaNum < this.KPAtotalRecords){
                  this.getAverageKPAResults(this.allkpaNum);
                }
              });
            } else if(allaverageLevel1 === limit && allaverageLevel2 === limit && allaverageLevel3 === limit && allaverageLevel4 === limit && allaverageLevel5 <= limit){
              allKPAAverage = 4*(limit) + allaverageLevel5;
              this.allKPAAverages.push(allKPAAverage);
              this.allkpaNum = this.allkpaNum + 1;
              //console.log("KPA Average is "+ JSON.stringify(this.allKPAAverages));
              setTimeout(() => {
                if(this.allkpaNum < this.KPAtotalRecords){
                  this.getAverageKPAResults(this.allkpaNum);
                }
              });
            }
          });
        }else{
              this.allKPAAverages.push(0);
              this.allkpaNum = this.allkpaNum + 1;
              //console.log("KPA Average is "+ JSON.stringify(this.allKPAAverages));
              setTimeout(() => {
                if(this.allkpaNum < this.KPAtotalRecords){
                  this.getAverageKPAResults(this.allkpaNum);
                }
              });
        }
      },100);
    },500);
  }

  getCurrentUserScores(){
    // Get results for different levels
    this.assessmentService.getCurrentUserResults(this.kpa[this.kpaNum].id.toString(),this.level[0].id.toString(), this.assessID, this.userID).subscribe(
      (r1:LResult[]) => {
        this.level1Results = r1;
        //console.log(r1);
        this.level1ResultstotalRecords = r1.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.assessmentService.getCurrentUserResults(this.kpa[this.kpaNum].id.toString(),this.level[1].id.toString(), this.assessID, this.userID).subscribe(
      (data:LResult[]) => {
        this.level2Results = data;
        //console.log(data);
        this.level2ResultstotalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.assessmentService.getCurrentUserResults(this.kpa[this.kpaNum].id.toString(),this.level[2].id.toString(), this.assessID, this.userID).subscribe(
      (data:LResult[]) => {
        this.level3Results = data;
        //console.log(data);
        this.level3ResultstotalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.assessmentService.getCurrentUserResults(this.kpa[this.kpaNum].id.toString(),this.level[3].id.toString(), this.assessID, this.userID).subscribe(
      (data:LResult[]) => {
        this.level4Results = data;
        //console.log(data);
        this.level4ResultstotalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.assessmentService.getCurrentUserResults(this.kpa[this.kpaNum].id.toString(),this.level[4].id.toString(), this.assessID, this.userID).subscribe(
      (data:LResult[]) => {
        this.level5Results = data;
        //console.log(data);
        this.level5ResultstotalRecords = data.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }
  getAverageUserScores(){
    // Get results for different levels
    this.assessmentService.getAllUserResults(this.kpa[this.allkpaNum].id.toString(),this.level[0].id.toString(), this.assessID).subscribe(
      (res1:LResult[]) => {
        this.allLevel1Results = res1;
        //console.log(r1);
        this.allLevel1ResultstotalRecords = res1.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.assessmentService.getAllUserResults(this.kpa[this.allkpaNum].id.toString(),this.level[1].id.toString(), this.assessID).subscribe(
      (res2:LResult[]) => {
        this.allLevel2Results = res2;
        //console.log(data);
        this.allLevel2ResultstotalRecords = res2.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.assessmentService.getAllUserResults(this.kpa[this.allkpaNum].id.toString(),this.level[2].id.toString(), this.assessID).subscribe(
      (res3:LResult[]) => {
        this.allLevel3Results = res3;
        //console.log(data);
        this.allLevel3ResultstotalRecords = res3.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.assessmentService.getAllUserResults(this.kpa[this.allkpaNum].id.toString(),this.level[3].id.toString(), this.assessID).subscribe(
      (res4:LResult[]) => {
        this.allLevel4Results = res4;
        //console.log(data);
        this.allLevel4ResultstotalRecords = res4.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    this.assessmentService.getAllUserResults(this.kpa[this.allkpaNum].id.toString(),this.level[4].id.toString(), this.assessID).subscribe(
      (res5:LResult[]) => {
        this.allLevel5Results = res5;
        //console.log(data);
        this.allLevel5ResultstotalRecords = res5.length;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

  back(){
    this._router.navigate(['/binmak/exec-assessment-landing']);
  }

}
