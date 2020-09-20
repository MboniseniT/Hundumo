import { Mapper } from './mapper';
import { InputType } from '../enums/input-type.enum';
export let AcknowledgementMapper = {
    id : new Mapper ({ type:InputType.number.toString(),display:'Id', visible:false,defaultValue:0 }), 
     machineId : new Mapper ({type:InputType.select.toString(),display:'Machine', visible:true,
     required:true,defaultValue:"",}),
     userId : new Mapper ({type:InputType.select.toString(),display:'User', visible:true,
     required:true,defaultValue:JSON.parse(localStorage.getItem('currentUser'))?.userId, disabled:true}),
     conditionId : new Mapper ({type:InputType.select.toString(),display:'Condition', visible:true,
     required:true,defaultValue:"",}),
     action : new Mapper ({type:InputType.select.toString(),display:'Action', visible:true,
     required:true,defaultValue:"",}),
     regiDate : new Mapper ({type:InputType.date.toString(),display:'Date', visible:true,
     required:true,defaultValue:"",}),
}