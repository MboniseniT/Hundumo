import { Mapper } from './mapper';
import { InputType } from '../enums/input-type.enum';
export let AcknowledgementMapper = {
    id : new Mapper ({ type:InputType.number.toString(),display:'Id', visible:false,defaultValue:0 }), 
     machineId : new Mapper ({type:InputType.including.toString(),display:'Machine', visible:true,
     required:true,defaultValue:"",}),
     userId : new Mapper ({type:InputType.including.toString(),display:'User', visible:true,
     required:true,defaultValue:"",}),
     conditionId : new Mapper ({type:InputType.including.toString(),display:'Condition', visible:true,
     required:true,defaultValue:"",}),
     regiDate : new Mapper ({type:InputType.date.toString(),display:'Date', visible:true,
     required:true,defaultValue:"",}),
}