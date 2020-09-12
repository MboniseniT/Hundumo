import { Mapper } from './mapper';
import { InputType } from '../enums/input-type.enum';
export let MachineMapper = {
     id : new Mapper ({ type:InputType.number.toString(),display:'Id', visible:false,defaultValue:0 }), 
     deviceId : new Mapper ({type:InputType.select.toString(),display:'Device', visible:true,required:true,defaultValue:"",sourceName:"firmwareVersion"}),
     assetNodeId : new Mapper ({type:InputType.select.toString(),display:'Asset', visible:true,required:true,defaultValue:"",}),
     sizeCategoryId : new Mapper ({type:InputType.select.toString(),display:'Category', visible:true,required:true,defaultValue:"",}),
     machineTypeId : new Mapper ({type:InputType.select.toString(),display:'Type', visible:true,required:true,defaultValue:"",}),
     fastFourierTransformPeriod : new Mapper ({type:InputType.number.toString(),display:'Fast Fourier Transform Period', visible:true,required:true,defaultValue:"",}),
     revolutionPerMinute : new Mapper ({type:InputType.number.toString(),display:'Revolution Per Minute', visible:true,required:true,defaultValue:"",}),
     insulationLevel : new Mapper ({type:InputType.text.toString(),display:'Insulation Level', visible:true,required:true,defaultValue:"",}),
    }