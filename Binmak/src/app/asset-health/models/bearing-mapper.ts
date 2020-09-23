import { Mapper } from './mapper';
import { InputType } from '../enums/input-type.enum';
export let BearingMapper = {
     id : new Mapper ({ type:InputType.number.toString(),display:'Id', visible:false,defaultValue:0 }), 
     name : new Mapper ({type:InputType.text.toString(),display:'Name', visible:true,required:true,defaultValue:"",}),
     bearingId : new Mapper ({type:InputType.text.toString(),display:'Bearing ID', visible:true,required:true,defaultValue:"",}),
     bpfo : new Mapper ({type:InputType.number.toString(),display:'BPFO', visible:true,required:true,defaultValue:"",}),
     bpfoAlert : new Mapper ({type:InputType.number.toString(),display:'BPFO Alert', visible:true,required:true,defaultValue:"",}),
     bpfoAlarm : new Mapper ({type:InputType.number.toString(),display:'BPFO Alarm', visible:true,required:true,defaultValue:"",}),
     bpfi : new Mapper ({type:InputType.number.toString(),display:'BPFI', visible:true,required:true,defaultValue:"",}),
     bpfiAlert : new Mapper ({type:InputType.number.toString(),display:'BPFI Alert', visible:true,required:true,defaultValue:"",}),
     bpfiAlarm : new Mapper ({type:InputType.number.toString(),display:'BPFI Alarm', visible:true,required:true,defaultValue:"",}),
     bsf : new Mapper ({type:InputType.number.toString(),display:'BSF', visible:true,required:true,defaultValue:"",}),
     bsfAlert : new Mapper ({type:InputType.number.toString(),display:'BSF Alert', visible:true,required:true,defaultValue:"",}),
     bsfAlarm : new Mapper ({type:InputType.number.toString(),display:'BSF Alarm', visible:true,required:true,defaultValue:"",}),
}