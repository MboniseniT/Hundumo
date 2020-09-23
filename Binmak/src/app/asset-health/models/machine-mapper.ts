import { Mapper } from './mapper';
import { InputType } from '../enums/input-type.enum';
export let MachineMapper = {
     id : new Mapper ({ type:InputType.number.toString(),display:'Id', visible:false,defaultValue:0 }), 
     imageUrl : new Mapper ({type:InputType.image.toString(),display:'Image', visible:true,required:true,defaultValue:"",}),
     name : new Mapper ({type:InputType.text.toString(),display:'Name', visible:true,required:true,defaultValue:"",}),
     deviceId : new Mapper ({type:InputType.text.toString(),display:'Device ID', visible:false,required:true,defaultValue:"",}),
     bbssDeviceId : new Mapper ({type:InputType.select.toString(),display:'Sensor', visible:true,required:true,defaultValue:"",}),
     assetNodeId : new Mapper ({type:InputType.select.toString(),display:'Asset', visible:false,required:true,defaultValue:"",sourceId:"assetNodeId"}),
     sizeCategoryId : new Mapper ({type:InputType.select.toString(),display:'Category', visible:true,required:true,defaultValue:"",}),
     machineTypeId : new Mapper ({type:InputType.select.toString(),display:'Type', visible:true,required:true,defaultValue:"",}),
     revolutionPerMinute : new Mapper ({type:InputType.number.toString(),display:'Revolution Per Minute', visible:true,required:true,defaultValue:"",}),
     rmsAlert : new Mapper ({type:InputType.number.toString(),display:'RMS Alert', visible:true,required:true,defaultValue:"",}),
     rmsAlarm : new Mapper ({type:InputType.number.toString(),display:'RMS Alarm', visible:true,required:true,defaultValue:"",}),
     temperatureAlarm : new Mapper ({type:InputType.number.toString(),display:'Temperature Alarm', visible:true,required:true,defaultValue:"",}),
     temperatureAlert : new Mapper ({type:InputType.number.toString(),display:'Temperature Alert', visible:true,required:true,defaultValue:"",}),
     insulationLevelId : new Mapper ({type:InputType.select.toString(),display:'Insulation Level', visible:true,required:true,defaultValue:"",}),
     frequencyPeriodId : new Mapper ({type:InputType.select.toString(),display:'Frequency Period', visible:true,required:true,defaultValue:"",}),
     machineLoadId : new Mapper ({type:InputType.select.toString(),display:'Machine Load', visible:true,required:true,defaultValue:"",}),
     nonDrivingEndId : new Mapper ({type:InputType.select.toString(),display:'Non driving end', visible:true,required:true,defaultValue:"",}),
     drivingEndId : new Mapper ({type:InputType.select.toString(),display:'Driving end', visible:true,required:true,defaultValue:"",}),
     criticality : new Mapper ({type:InputType.text.toString(),display:'Criticality', visible:true,required:true,defaultValue:"",}),
     conditionId : new Mapper ({type:InputType.select.toString(),display:'Condition', visible:true,required:true,defaultValue:"",}),
    }