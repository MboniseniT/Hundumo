import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AssessmentsConfigService } from 'src/app/services/Assessments/assessmentsConfig.service';
import { MDBModalService, ToastService, MDBModalRef } from 'ng-uikit-pro-standard';
import { AreYouSureComponent } from '../../are-you-sure/are-you-sure.component';

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
  selector: 'app-view-consensus-results',
  templateUrl: './view-consensus-results.component.html',
  styleUrls: ['./view-consensus-results.component.scss']
})
export class ViewConsensusResultsComponent implements OnInit {

  isSaved:number;
  assessName:string = "";
  assessmentID: string;
  hasSections:boolean;
  kpiProgressInfor:any;
  bpProgressInfor:any;
  kpiProgress:number;
  kpiProgressOther:number;
  bpProgress:number;
  bpProgressOther:number;
  kpiTotalScore:number;
  kpiTotalScoreOther:number;
  bpTotalScore:number;
  bpTotalScoreOther:number;

  bubbleSM: any;
	bubbleIM:any;
	bubbleTI:any;
	bubbleOD:any;
	bubbleCM:any;
	bubbleFM:any;
	bubblesRM:any;
	bubbleHSSE:any;
	bubbleASP:any;
	bubbleWM:any;
	bubbleOAC:any;
	bubbleMM:any;
	bubbleSFT:any;
	bubbleLCM:any;
	bubbleSOM:any;
	bubblePM:any;
	bubbleFI:any;

  modalRef: MDBModalRef;


  ctgrs:any = [];
  bpdata:any = [];
  kpidata:any = [];
  kpabubbledata:any = [];

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
      name: 'BP Results',
      data: this.bpdata,
      color: '#032c57'
    },
    {
      name: 'KPI Results',
      data: this.kpidata,
      color: '#FF9900'
    }]
  }




  constructor(
              private assessmentService: AssessmentsConfigService,
              private modalService: MDBModalService,
              private toastrService: ToastService,
              public _router: Router,
              public _location: Location
  ) { }

  ngOnInit() {
    this.isSaved = Number(JSON.parse(localStorage.getItem('currentAssessment')).isSaved);
    this.assessName = JSON.parse(localStorage.getItem('currentAssessment')).assess_name;
    this.assessmentID = JSON.parse(localStorage.getItem('currentAssessment')).id;
    this.setHasSections();
    this.SavedProtect();
    this.NotAssignedProtect();
    this.GetProgress();
  }

  SetCategories(){
    this.SetBpKpiBubble()
    if(!this.DeactivateKPA1()){
      this.ctgrs.push(this.GetAssessment().kpa1);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa1Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa1Progress)));
      this.kpabubbledata.push(this.bubbleSM);
    }
    if(!this.DeactivateKPA2()){
      this.ctgrs.push(this.GetAssessment().kpa2);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa2Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa2Progress)));
      this.kpabubbledata.push(this.bubbleIM);
    }
    if(!this.DeactivateKPA3()){
      this.ctgrs.push(this.GetAssessment().kpa3);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa3Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa3Progress)));
      this.kpabubbledata.push(this.bubbleTI);
    }
    if(!this.DeactivateKPA4()){
      this.ctgrs.push(this.GetAssessment().kpa4);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa4Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa4Progress)));
      this.kpabubbledata.push(this.bubbleOD);
    }
    if(!this.DeactivateKPA5()){
      this.ctgrs.push(this.GetAssessment().kpa5);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa5Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa5Progress)));
      this.kpabubbledata.push(this.bubbleCM);
    }
    if(!this.DeactivateKPA6()){
      this.ctgrs.push(this.GetAssessment().kpa6);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa6Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa6Progress)));
      this.kpabubbledata.push(this.bubbleFM);
    }
    if(!this.DeactivateKPA7()){
      this.ctgrs.push(this.GetAssessment().kpa7);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa7Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa7Progress)));
      this.kpabubbledata.push(this.bubblesRM);
    }
    if(!this.DeactivateKPA8()){
      this.ctgrs.push(this.GetAssessment().kpa8);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa8Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa8Progress)));
      this.kpabubbledata.push(this.bubbleHSSE);
    }
    if(!this.DeactivateKPA9()){
      this.ctgrs.push(this.GetAssessment().kpa9);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa9Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa9Progress)));
      this.kpabubbledata.push(this.bubbleASP);
    }
    if(!this.DeactivateKPA10()){
      this.ctgrs.push(this.GetAssessment().kpa10);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa10Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa10Progress)));
      this.kpabubbledata.push(this.bubbleWM);
    }
    if(!this.DeactivateKPA11()){
      this.ctgrs.push(this.GetAssessment().kpa11);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa11Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa11Progress)));
      this.kpabubbledata.push(this.bubbleOAC);
    }
    if(!this.DeactivateKPA12()){
      this.ctgrs.push(this.GetAssessment().kpa12);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa12Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa12Progress)));
      this.kpabubbledata.push(this.bubbleMM);
    }
    if(!this.DeactivateKPA13()){
      this.ctgrs.push(this.GetAssessment().kpa13);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa13Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa13Progress)));
      this.kpabubbledata.push(this.bubbleSFT);
    }
    if(!this.DeactivateKPA14()){
      this.ctgrs.push(this.GetAssessment().kpa14);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa14Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa14Progress)));
      this.kpabubbledata.push(this.bubbleLCM);
    }
    if(!this.DeactivateKPA15()){
      this.ctgrs.push(this.GetAssessment().kpa15);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa15Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa15Progress)));
      this.kpabubbledata.push(this.bubbleSOM);
    }
    if(!this.DeactivateKPA16()){
      this.ctgrs.push(this.GetAssessment().kpa16);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa16Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa16Progress)));
      this.kpabubbledata.push(this.bubblePM);
    }
    if(!this.DeactivateKPA17()){
      this.ctgrs.push(this.GetAssessment().kpa17);
      this.kpidata.push(Math.round(Number(this.kpiProgressInfor[0].kpa17Progress)));
      this.bpdata.push(Math.round(Number(this.bpProgressInfor[0].kpa17Progress)));
      this.kpabubbledata.push(this.bubbleFI);
    }
    //console.log(this.kpidata);
  }

  SetBpKpiBubble(){
   this.bubbleSM = {
      x: Math.round(Number(this.bpProgressInfor[0].kpa1Progress)),
      y: Math.round(Number(this.kpiProgressInfor[0].kpa1Progress)),
      z: 2,
      name: 'SM',
      kpa: this.GetAssessment().kpa1
    };
   this.bubbleIM = {
    x: Math.round(Number(this.bpProgressInfor[0].kpa2Progress)),
    y: Math.round(Number(this.kpiProgressInfor[0].kpa2Progress)),
    z: 2,
    name: 'IM',
    kpa: this.GetAssessment().kpa2
    };
   this.bubbleTI = {
    x: Math.round(Number(this.bpProgressInfor[0].kpa3Progress)),
    y: Math.round(Number(this.kpiProgressInfor[0].kpa3Progress)),
    z: 2,
    name: 'TI',
    kpa: this.GetAssessment().kpa3
    };
   this.bubbleOD = {
    x: Math.round(Number(this.bpProgressInfor[0].kpa4Progress)),
    y: Math.round(Number(this.kpiProgressInfor[0].kpa4Progress)),
    z: 2,
    name: 'OD',
    kpa: this.GetAssessment().kpa4
    };
   this.bubbleCM = {
    x: Math.round(Number(this.bpProgressInfor[0].kpa5Progress)),
    y: Math.round(Number(this.kpiProgressInfor[0].kpa5Progress)),
    z: 2,
    name: 'CM',
    kpa: this.GetAssessment().kpa5
    };
   this.bubbleFM = {
    x: Math.round(Number(this.bpProgressInfor[0].kpa6Progress)),
    y: Math.round(Number(this.kpiProgressInfor[0].kpa6Progress)),
    z: 2,
    name: 'FM',
    kpa: this.GetAssessment().kpa6
    };
   this.bubblesRM = {
    x: Math.round(Number(this.bpProgressInfor[0].kpa7Progress)),
    y: Math.round(Number(this.kpiProgressInfor[0].kpa7Progress)),
    z: 2,
    name: 'RM',
    kpa: this.GetAssessment().kpa7
    };
   this.bubbleHSSE = {
    x: Math.round(Number(this.bpProgressInfor[0].kpa8Progress)),
    y: Math.round(Number(this.kpiProgressInfor[0].kpa8Progress)),
    z: 2,
    name: 'HSSE',
    kpa: this.GetAssessment().kpa8
    };
   this.bubbleASP = {
    x: Math.round(Number(this.bpProgressInfor[0].kpa9Progress)),
    y: Math.round(Number(this.kpiProgressInfor[0].kpa9Progress)),
    z: 2,
    name: 'ASP',
    kpa: this.GetAssessment().kpa9
    };
   this.bubbleWM = {
    x: Math.round(Number(this.bpProgressInfor[0].kpa10Progress)),
    y: Math.round(Number(this.kpiProgressInfor[0].kpa10Progress)),
    z: 2,
    name: 'WM',
    kpa: this.GetAssessment().kpa10
    };
   this.bubbleOAC = {
    x: Math.round(Number(this.bpProgressInfor[0].kpa11Progress)),
    y: Math.round(Number(this.kpiProgressInfor[0].kpa11Progress)),
    z: 2,
    name: 'OAC',
    kpa: this.GetAssessment().kpa11
    };
   this.bubbleMM = {
    x: Math.round(Number(this.bpProgressInfor[0].kpa12Progress)),
    y: Math.round(Number(this.kpiProgressInfor[0].kpa12Progress)),
    z: 2,
    name: 'MM',
    kpa: this.GetAssessment().kpa12
    };
   this.bubbleSFT = {
    x: Math.round(Number(this.bpProgressInfor[0].kpa13Progress)),
    y: Math.round(Number(this.kpiProgressInfor[0].kpa13Progress)),
    z: 2,
    name: 'SFT',
    kpa: this.GetAssessment().kpa13
    };
   this.bubbleLCM = {
    x: Math.round(Number(this.bpProgressInfor[0].kpa14Progress)),
    y: Math.round(Number(this.kpiProgressInfor[0].kpa14Progress)),
    z: 2,
    name: 'LCM',
    kpa: this.GetAssessment().kpa14
    };
   this.bubbleSOM = {
    x: Math.round(Number(this.bpProgressInfor[0].kpa15Progress)),
    y: Math.round(Number(this.kpiProgressInfor[0].kpa15Progress)),
    z: 2,
    name: 'SOM',
    kpa: this.GetAssessment().kpa15
    };
   this.bubblePM = {
    x: Math.round(Number(this.bpProgressInfor[0].kpa16Progress)),
    y: Math.round(Number(this.kpiProgressInfor[0].kpa16Progress)),
    z: 2,
    name: 'PM',
    kpa: this.GetAssessment().kpa16
    };
   this.bubbleFI = {
    x: Math.round(Number(this.bpProgressInfor[0].kpa17Progress)),
    y: Math.round(Number(this.kpiProgressInfor[0].kpa17Progress)),
    z: 2,
    name: 'FI',
    kpa: this.GetAssessment().kpa17
    };
  }

  setHasSections(){
    if(JSON.parse(localStorage.getItem("currentAssessment"))[0]){
      this.hasSections = true;
      //console.log(this.hasSections);
    }else{
      this.hasSections = false;
      this._router.navigate(['/binmak/assessment-landing']);
      //console.log(this.hasSections);
    }
  }

  SavedProtect(){
    if (this.isSaved == 1) {
      console.log('here');
      this._router.navigate(['/binmak/assessment-landing']);
    }
  }

  GetAssessmentName(){
    if(this.assessName){
      return this.assessName;
    }else{
      return "";
    }

  }

  GetProgress(){
    //retrieve kpiProgress values/Results from Database
    this.assessmentService.GetKpiProgress(this.GetAssessment()).subscribe(
      (data:any) => {
        this.kpiProgressInfor = data;
        //console.log(data);


      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    //retrieve bpProgress values/Results from Database
    this.assessmentService.GetBpProgress(this.GetAssessment()).subscribe(
      (data:any) => {
        this.bpProgressInfor = data;
        console.log(data);
        this.SetCategories();
        setTimeout(() => {
          this.loadChart();
          this.calcTotalScore();
        });
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

  GetAssessment(){
    return JSON.parse(localStorage.getItem("currentAssessment"));
  }

  loadChart(){
    let options:any = {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Key Performance Area (KPA)<br><br>' + this.GetAssessmentName()
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
        name: 'BP Results',
        data: this.bpdata,
        color: '#032c57'
      },
      {
        name: 'KPI Results',
        data: this.kpidata,
        color: '#FF9900'
      }]
    }
    let options1:any = {
      chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
      },
      legend: {
        enabled: false
      },
      title: {
                      text: 'BP and KPI per KPA<br><br>' + this.GetAssessmentName()
      },
      subtitle: {
        text: 'Source: <a href="#">BP Assessment</a> and <a href="#">KPI Assessment</a>'
      },
      accessibility: {
        point: {
          valueDescriptionFormat: '{index}. {point.name}, BP: {point.x}%, KPI: {point.y}%, Nothing: {point.z}%.'
        }
      },
      xAxis: {
        min: 0,
        max: 100,
        tickInterval: 20,
        gridLineWidth: 1,
        title: {
          text: 'Best Practice'
        },
        labels: {
          format: '{value} %'
        },
        plotLines: [{
          color: 'red',
          dashStyle: 'dot',
          width: 2,
          value: 20,
          label: {
            rotation: 0,
            y: 337,
            x: -75,
            style: {
              fontStyle: 'italic'
            },
            text: '', //'Innocence'
          },
          zIndex: 3
        }, {
            color: 'orange',
            dashStyle: 'dot',
            width: 2,
            value: 40,
            label: {
              rotation: 0,
              y: 15,
              style: {
                fontStyle: 'italic'
              },
              text: ''
            },
            zIndex: 3
          }, {
            color: 'yellow',
            dashStyle: 'dot',
            width: 2,
            value: 60,
            label: {
              rotation: 0,
              y: 15,
              style: {
                fontStyle: 'italic'
              },
              text: ''
            },
            zIndex: 3
          }, {
            color: 'green',
            dashStyle: 'dot',
            width: 2,
            value: 80,
            label: {
              rotation: 0,
              y: 15,
              style: {
                fontStyle: 'italic'
              },
              text: ''
            },
            zIndex: 3
          }, {
            color: 'blue',
            dashStyle: 'dot',
            width: 2,
            value: 100,
            label: {
              rotation: 0,
              y: 15,
              style: {
                fontStyle: 'italic'
              },
              text: ''
            },
            zIndex: 3
          }],
        accessibility: {
          rangeDescription: 'Range: 0 to 100 %.'
        }
      },
      yAxis: {
        min: 0,
        max: 100,
        tickInterval: 20,
        startOnTick: false,
        endOnTick: false,
        title: {
                          text: 'Key Performance Indicator<br><br>'
        },
        labels: {
          format: '{value} %'
        },
        maxPadding: 0.2,
        plotLines: [{
          color: 'red',
          dashStyle: 'dot',
          width: 2,
          value: 20,
          label: {
            align: 'right',
            style: {
              fontStyle: 'italic'
            },
            text: '',
            x: -10
          },
          zIndex: 3
        }, {
            color: 'orange',
            dashStyle: 'dot',
            width: 2,
            value: 40,
            label: {
              align: 'right',
              style: {
                fontStyle: 'italic'
              },
              text: '', //'Awareness',
              x: -254,
              y:42
            },
            zIndex: 3
          }, {
            color: 'yellow',
            dashStyle: 'dot',
            width: 2,
            value: 60,
            label: {
              align: 'right',
              style: {
                fontStyle: 'italic'
              },
              text: '', //'Understanding',
              x: -158,
              y:39
            },
            zIndex: 3
          }, {
            color: 'green',
            dashStyle: 'dot',
            width: 2,
            value: 80,
            label: {
              align: 'right',
              style: {
                fontStyle: 'italic'
              },
              text: '', //'Competence',
              x: -86,
              y:39
            },
            zIndex: 3
          }, {
            color: 'blue',
            dashStyle: 'dot',
            width: 2,
            value: 100,
            label: {
              align: 'right',
              style: {
                fontStyle: 'italic'
              },
              text: '', //'Excellence',
              x: -10,
              y:39
            },
            zIndex: 3
          }],
        accessibility: {
          rangeDescription: 'Range: 0 to 100 %.'
        }
      },
      tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><h3>{point.kpa}</h3></th></tr>' +
          '<tr><th>BP:</th><td>{point.x}%</td></tr>' +
          '<tr><th>KPI:</th><td>{point.y}%</td></tr>',
        footerFormat: '</table>',
        followPointer: true
      },
      plotOptions: {
        series: {
          maxSize: '12%',
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          }
        }
      },
      series: [{
        data: this.kpabubbledata,
        color: '#FF9900'

      }]
    }
    Highcharts.chart('container', options);
    Highcharts.chart('container5', options1);
    setTimeout(() => {
      this.calcProgress();
      Highcharts.chart('container1',
      {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
        title: {
          text: 'KPI<br><br>',
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
              y: this.kpiProgress,
              color: '#FF9900'
            },
            {
              name: 'Remaining',
              y: this.kpiProgressOther,
              color: '#ccccb3',
              dataLabels: {
                enabled: false
              }
            }
          ]
        }]
      });
      Highcharts.chart('container3',
      {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
        title: {
          text: 'BP<br><br>',
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
              y: this.bpProgress,
              color: '#032c57'
            },
            {
              name: 'Remaining',
              y: this.bpProgressOther,
              color: '#ccccb3',
              dataLabels: {
                enabled: false
              }
            }
          ]
        }]
      });
    },100);
  }

  calcProgress(){
    this.kpiProgress = Math.round(Number(this.kpiProgressInfor[0].assessProgress));
    this.kpiProgressOther = 100 - Math.round(Number(this.kpiProgressInfor[0].assessProgress));
    this.bpProgress = Math.round(Number(this.bpProgressInfor[0].assessProgress));
    this.bpProgressOther = 100 - Math.round(Number(this.bpProgressInfor[0].assessProgress));
  }

  calcTotalScore(){

    setTimeout(() => {
      this.kpiTotalScore = Math.round(Number(this.kpiProgressInfor[0].totalScore));
      this.kpiTotalScoreOther = 100 - Math.round(Number(this.kpiProgressInfor[0].totalScore));
      this.bpTotalScore = Math.round(Number(this.bpProgressInfor[0].totalScore));
      this.bpTotalScoreOther = 100 - Math.round(Number(this.bpProgressInfor[0].totalScore));
      //console.log("The total score is: "+this.totalScore.toString());
      setTimeout(() => {
        Highcharts.chart('container2',
         {
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
                y: this.kpiTotalScore,
                color: '#FF9900'
              },
              {
                name: 'Remaining',
                y: this.kpiTotalScoreOther,
                color: '#ccccb3',
                dataLabels: {
                  enabled: false
                }
              }
            ]
          }]
        });
        Highcharts.chart('container4',
         {
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
                y: this.bpTotalScore,
                color: '#032c57'
              },
              {
                name: 'Remaining',
                y: this.bpTotalScoreOther,
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

  NotAssignedProtect(){
    if(!this.Visible()){
      this._router.navigate(['/binmak/assessment-landing']);
    }
  }

  back(){
    this._router.navigate(['/binmak/assessment-landing']);
  }

  Visible(){
    if(this.assessName){
      return true;
    }else{
      return false;
    }
  }

  onClear(el: any){
    const modalOptions = {
      data: {
        editableRow: {message:"Are you sure you want to CLEAR all results associated with assessment: " + el.assess_name + "?"}
      }
    };
    this.modalRef = this.modalService.show(AreYouSureComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database
      this.assessmentService.clearAssessment(el).toPromise().then((data: any) => {
        // success notification
        this.toastrService.success('Cleared Successfully!');

      }, error => {
        console.log('httperror: ');
          console.log(error);
          // error notification
          //this.formError = JSON.stringify(error.error.Message + " " +error.error.ModelState['']);
          this.toastrService.error(JSON.stringify(error));
      });

    });
  }

  onSave(el: any){
    const modalOptions = {
      data: {
        editableRow: {message:"Are you sure you want to SAVE your results for assessment: " + el.assess_name + "? You will not be able to edit the assessment anymore."}
      }
    };
    this.modalRef = this.modalService.show(AreYouSureComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      //Call funtion to update database
      this.assessmentService.SaveAssessment(el).toPromise().then((data: any) => {
        // success notification
        this.toastrService.success('Saved Successfully!');

      }, error => {
        console.log('httperror: ');
          console.log(error);
          // error notification
          //this.formError = JSON.stringify(error.error.Message + " " +error.error.ModelState['']);
          this.toastrService.error(JSON.stringify(error));
      });

    });
  }

  DeactivateKPA1(){
    if(this.GetAssessment().kpa1 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA2(){
    //console.log(this.GetAssessment().kpa2);
    if(this.GetAssessment().kpa2 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA3(){
    //console.log(this.GetAssessment().kpa3);
    if(this.GetAssessment().kpa3 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA4(){
    //console.log(this.GetAssessment().kpa4);
    if(this.GetAssessment().kpa4 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA5(){
    //console.log(this.GetAssessment().kpa5);
    if(this.GetAssessment().kpa5 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA6(){
    //console.log(this.GetAssessment().kpa6);
    if(this.GetAssessment().kpa6 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA7(){
    //console.log(this.GetAssessment().kpa7);
    if(this.GetAssessment().kpa7 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA8(){
    //console.log(this.GetAssessment().kpa8);
    if(this.GetAssessment().kpa8 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA9(){
    //console.log(this.GetAssessment().kpa9);
    if(this.GetAssessment().kpa9 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA10(){
    //console.log(this.GetAssessment().kpa10);
    if(this.GetAssessment().kpa10 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA11(){
    //console.log(this.GetAssessment().kpa11);
    if(this.GetAssessment().kpa11 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA12(){
    //console.log(this.GetAssessment().kpa12);
    if(this.GetAssessment().kpa12 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA13(){
    //console.log(this.GetAssessment().kpa13);
    if(this.GetAssessment().kpa13 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA14(){
    //console.log(this.GetAssessment().kpa14);
    if(this.GetAssessment().kpa14 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA15(){
    //console.log(this.GetAssessment().kpa15);
    if(this.GetAssessment().kpa15 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA16(){
    //console.log(this.GetAssessment().kpa16);
    if(this.GetAssessment().kpa16 == ""){
      return true;
    }else{
      return false;
    }
  }
  DeactivateKPA17(){
    //console.log(this.GetAssessment().kpa17);
    if(this.GetAssessment().kpa17 == ""){
      return true;
    }else{
      return false;
    }
  }

}
