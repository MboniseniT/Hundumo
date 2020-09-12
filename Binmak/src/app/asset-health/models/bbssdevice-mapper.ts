import { Mapper } from './mapper';
import { InputType } from '../enums/input-type.enum';
export let BbssdeviceMapper = {
     id : new Mapper ({ type:InputType.number.toString(),display:'Id', visible:false,defaultValue:0 }), 
     binmakTechnologyId : new Mapper ({type:InputType.select.toString(),display:'Binmak Technology', visible:true,
     required:true,defaultValue:"",}),
     applicationId : new Mapper ({type:InputType.select.toString(),display:'Application', visible:true,
     required:true,defaultValue:"",}),
     firmwareVersion : new Mapper ({type:InputType.text.toString(),display:'Firmware Version', visible:true,
     required:true,defaultValue:"",}),
     hardwareVersion : new Mapper ({type:InputType.textarea.toString(),display:'Hardware Version', visible:true,
     required:true,defaultValue:"",}),
     releaseDate : new Mapper ({type:InputType.date.toString(),display:'Date', visible:true,
     required:true,defaultValue:"",}),
}