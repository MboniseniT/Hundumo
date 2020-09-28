import { Mapper } from './mapper';
import { InputType } from '../enums/input-type.enum';
export let SensorDataMapper = {
     id : new Mapper ({ type:InputType.number.toString(),display:'Id', visible:false,defaultValue:0 }), 
     machineId : new Mapper ({type:InputType.select.toString(),display:'Machine', visible:true, required:true,defaultValue:"",}),
     deviceId : new Mapper ({type:InputType.text.toString(),display:'Device', visible:true, required:true,defaultValue:"",}),
     timeStamp : new Mapper ({type:InputType.number.toString(),display:'TImestamp', visible:true,required:true,defaultValue:"",}),
     waveform : new Mapper ({type:InputType.checkbox.toString(),display:'Waveform', visible:true,required:true,defaultValue:"",}),
     fFT : new Mapper ({type:InputType.checkbox.toString(),display:'Fast Fourier Transform', visible:true,required:true,defaultValue:"",}),
     temperature : new Mapper ({type:InputType.text.toString(),display:'Temperature', visible:true,required:true,defaultValue:"",}),
     axialRMS : new Mapper ({type:InputType.number.toString(),display:'Axial RMS', visible:true,required:true,defaultValue:"",}),
     radialRMS : new Mapper ({type:InputType.number.toString(),display:'Radial RMS', visible:true,required:true,defaultValue:"",}),
     tangentialRMS : new Mapper ({type:InputType.number.toString(),display:'Tangential RMS', visible:true,required:true,defaultValue:"",}),
     overallRMS : new Mapper ({type:InputType.number.toString(),display:'Overall RMS', visible:true,required:true,defaultValue:"",}),
     batCap : new Mapper ({type:InputType.number.toString(),display:'Battery Cap', visible:true,required:true,defaultValue:"",}),
     batSOC : new Mapper ({type:InputType.number.toString(),display:'Battery SOC', visible:true,required:true,defaultValue:"",}),
     batTTE : new Mapper ({type:InputType.number.toString(),display:'Battery TTE', visible:true,required:true,defaultValue:"",}),
     alog : new Mapper ({type:InputType.text.toString(),display:'Alog', visible:true,required:true,defaultValue:"",}),
     regiDate : new Mapper ({type:InputType.date.toString(),display:'Date', visible:true,required:true,defaultValue:"",}),

    }