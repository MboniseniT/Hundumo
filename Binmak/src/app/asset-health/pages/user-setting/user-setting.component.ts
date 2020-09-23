import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { AssetHealthService } from 'src/app/services/asset-health.service';
import { PreffixUrl } from '../../enums/preffix-url.enum';
import { UserSetting } from '../../interface/user-setting';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss']
})
export class UserSettingComponent implements OnInit {
  data:UserSetting={
    callAlarm : false,
    callAlert : false,
    waAlarm : false,
    waAlert : false,
    waBatteryLow : false,
    waDaily : false,
    waMeasurement : false,
    messageAlarm : false,
    messageAlert : false,
    messageBatteryLow : false,
    messageDaily : false,
    messageMeasurement : false,
    emailAlarm : false,
    emailAlert : false,
    emailBatteryLow : false,
    emailDaily : false,
    emailMeasurement : false,
    userId : "",
    id:0
  };
  constructor(private request: AssetHealthService,private toastService: ToastService) { 
    this.request.get(JSON.parse(localStorage.getItem('currentUser')).userId,PreffixUrl.UserSettingUser).subscribe(userSettingResult => {
      this.data=userSettingResult;
    }, error => {
      this.toastService.error(error.error);
     });
  }

  ngOnInit(): void {
   
  }
  submit(data){
    console.log(data);
    this.request.put(data.id, data, PreffixUrl.UserSetting).subscribe(response => {
      this.toastService.success(response.message);
    },error=>{      
    this.toastService.error(error.error);
    });
  }

}
