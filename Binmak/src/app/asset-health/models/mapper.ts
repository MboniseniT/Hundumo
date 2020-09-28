export class Mapper {
    constructor(data: Partial<Mapper>){
        Object.assign(this, data);
    }
    type: string;
    visible: boolean;
    display: string;
    source: any;
    regex: string;
    required: boolean;
    errorMessage: string;
    sourceName: string;
    nested: boolean;
    nestedName: string;
    nestedId: string;
    nestedObjectName: string;
    sourceId: string;
    defaultValue: any;
    extraAction: boolean;
    disabled:boolean;
    hideOnAdd:boolean
}
