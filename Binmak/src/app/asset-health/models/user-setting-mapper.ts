import { Mapper } from './mapper';
import { InputType } from '../enums/input-type.enum';
export let UserSettingMapper = {
     id : new Mapper ({ type:InputType.number.toString(),display:'Id', visible:false,defaultValue:0 }), 
     userId : new Mapper ({type:InputType.select.toString(),display:'User', visible:true, required:true,defaultValue:"",}),
     messageMeasurement : new Mapper ({type:InputType.checkbox.toString(),display:'Message Measurement', visible:true,required:true,defaultValue:"",}),
     messageAlert : new Mapper ({type:InputType.checkbox.toString(),display:'Message Alert', visible:true,required:true,defaultValue:"",}),
     messageAlarm : new Mapper ({type:InputType.checkbox.toString(),display:'Message Alarm', visible:true,required:true,defaultValue:"",}),
     messageBatteryLow : new Mapper ({type:InputType.checkbox.toString(),display:'Message Battery Low', visible:true,required:true,defaultValue:"",}),
     messageDaily : new Mapper ({type:InputType.checkbox.toString(),display:'Message Daily', visible:true,required:true,defaultValue:"",}),
     wAMeasurement : new Mapper ({type:InputType.checkbox.toString(),display:'Wa Measurement', visible:true,required:true,defaultValue:"",}),
     wAAlert : new Mapper ({type:InputType.checkbox.toString(),display:'Wa Alert', visible:true,required:true,defaultValue:"",}),
     wAAlarm : new Mapper ({type:InputType.checkbox.toString(),display:'Wa Alarm', visible:true,required:true,defaultValue:"",}),
     wABatteryLow : new Mapper ({type:InputType.checkbox.toString(),display:'Wa Battery Low', visible:true,required:true,defaultValue:"",}),
     wADaily : new Mapper ({type:InputType.checkbox.toString(),display:'WA Daily', visible:true,required:true,defaultValue:"",}),
     emailMeasurement : new Mapper ({type:InputType.checkbox.toString(),display:'Email Measurement', visible:true,required:true,defaultValue:"",}),
     emailAlert : new Mapper ({type:InputType.checkbox.toString(),display:'Email Alert', visible:true,required:true,defaultValue:"",}),
     emailAlarm : new Mapper ({type:InputType.checkbox.toString(),display:'Email Alarm', visible:true,required:true,defaultValue:"",}),
     emailBatteryLow : new Mapper ({type:InputType.checkbox.toString(),display:'Email Battery Low', visible:true,required:true,defaultValue:"",}),
     emailDaily : new Mapper ({type:InputType.checkbox.toString(),display:'Email Daily', visible:true,required:true,defaultValue:"",}),
     callAlert : new Mapper ({type:InputType.checkbox.toString(),display:'Call Alert', visible:true,required:true,defaultValue:"",}),
     callAlarm : new Mapper ({type:InputType.checkbox.toString(),display:'Call Alarm', visible:true,required:true,defaultValue:"",}),

    }