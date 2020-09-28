import { Mapper } from './mapper';
import { InputType } from '../enums/input-type.enum';
export let MachineNotificationSettingMapper = {
     id : new Mapper ({ type:InputType.number.toString(),display:'Id', visible:false,defaultValue:0 }), 
     machineId : new Mapper ({type:InputType.select.toString(),display:'Machine', visible:true,required:true,defaultValue:"",}),
     numberOfAlarms : new Mapper ({type:InputType.number.toString(),display:'Alarms', visible:true,required:true,defaultValue:"",}),
     numberOfAlerts : new Mapper ({type:InputType.number.toString(),display:'Alerts', visible:true,required:true,defaultValue:"",}),
     numberOfAcknowledgementAlerts : new Mapper ({type:InputType.number.toString(),display:'Acknowledgement Alerts', visible:true,required:true,defaultValue:"",}),
     numberOfAcknowledgementAlarms : new Mapper ({type:InputType.number.toString(),display:'Acknowledgement Alarms', visible:true,required:true,defaultValue:"",}),
     rmsAlert : new Mapper ({type:InputType.number.toString(),display:'RMS Alert', visible:true,required:true,defaultValue:"",}),
     rmsAlarm : new Mapper ({type:InputType.number.toString(),display:'RMS Alarm', visible:true,required:true,defaultValue:"",}),
    }