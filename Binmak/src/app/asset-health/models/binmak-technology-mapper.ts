import { Mapper } from './mapper';
import { InputType } from '../enums/input-type.enum';
export let BinmakTechnologyMapper = {
     id : new Mapper ({ type:InputType.number.toString(),display:'Id', visible:false,defaultValue:0 }), 
     name : new Mapper ({type:InputType.text.toString(),display:'Name', visible:true,
     required:true,defaultValue:"",}),
}