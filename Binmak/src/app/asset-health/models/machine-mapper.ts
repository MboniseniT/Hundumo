import { Mapper } from './mapper';
import { InputType } from '../enums/input-type.enum';
export let MachineMapper = {
     id : new Mapper ({ type:InputType.number.toString(),display:'Id', visible:false,defaultValue:0 }), 
     name : new Mapper ({type:InputType.text.toString(),display:'Name', visible:true,required:true,defaultValue:"",sourceName:"firmwareVersion"}),
     deviceId : new Mapper ({type:InputType.text.toString(),display:'Sensor ID', visible:false,required:true,defaultValue:"",sourceName:"firmwareVersion"}),
     bbssDeviceId : new Mapper ({type:InputType.select.toString(),display:'Sensor', visible:true,required:true,defaultValue:"",sourceName:"firmwareVersion"}),
     assetNodeId : new Mapper ({type:InputType.select.toString(),display:'Asset', visible:true,required:true,defaultValue:"",sourceId:"assetNodeId"}),
     sizeCategoryId : new Mapper ({type:InputType.select.toString(),display:'Category', visible:true,required:true,defaultValue:"",}),
     machineTypeId : new Mapper ({type:InputType.select.toString(),display:'Type', visible:true,required:true,defaultValue:"",}),
     revolutionPerMinute : new Mapper ({type:InputType.number.toString(),display:'Revolution Per Minute', visible:true,required:true,defaultValue:"",}),
     insulationLevelId : new Mapper ({type:InputType.select.toString(),display:'Insulation Level', visible:true,required:true,defaultValue:"",}),
     frequencyPeriodId : new Mapper ({type:InputType.select.toString(),display:'Frequency Period', visible:true,required:true,defaultValue:"",}),
     machineLoadId : new Mapper ({type:InputType.select.toString(),display:'Machine Load', visible:false,required:true,defaultValue:"",}),
     nonDrivingEnd : new Mapper ({type:InputType.text.toString(),display:'Non driving end', visible:false,required:true,defaultValue:"",}),
     drivingEnd : new Mapper ({type:InputType.text.toString(),display:'Driving end', visible:false,required:true,defaultValue:"",}),
     criticality : new Mapper ({type:InputType.text.toString(),display:'Criticality', visible:false,required:true,defaultValue:"",}),
    }