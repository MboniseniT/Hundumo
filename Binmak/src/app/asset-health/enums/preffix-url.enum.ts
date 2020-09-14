import { BaseUrl } from './base-url.enum';

export let PreffixUrl = {
    Acknowledgement: { variable: 'api/v1/Acknowledgement', key: BaseUrl.Main },
    BBSSDevice: { variable: 'api/v1/BBSSDevice', key: BaseUrl.Main },
    Application: { variable: 'api/v1/Application', key: BaseUrl.Main },
    BinmakTechnology: { variable: 'api/v1/BinmakTechnology', key: BaseUrl.Main }, 
    SensorCondtion: { variable: 'api/v1/SensorCondition', key: BaseUrl.Main },
    MachineType: { variable:'api/v1/MachineType', key: BaseUrl.Main },
    SizeCategory: { variable:'api/v1/SizeCategory', key: BaseUrl.Main },
    Machine: { variable:'api/v1/Machine', key: BaseUrl.Main },
    MachineNotificationSetting: { variable:'api/v1/MachineNotificationSetting', key: BaseUrl.Main },
    SensorData: { variable: 'api/v1/SensorData', key: BaseUrl.Main },
    UserSetting: { variable:'api/v1/UserSetting', key: BaseUrl.Main },
    InsulationLevel: { variable:'api/v1/InsulationLevel', key: BaseUrl.Main },
    FrequencyPeriod: { variable:'api/v1/FrequencyPeriod', key: BaseUrl.Main },
    MachineLoad: { variable:'api/v1/MachineLoad', key: BaseUrl.Main },
    BearingCondition: { variable:'api/v1/BearingCondition', key: BaseUrl.Main },
    AssetNode: { variable: 'api/assetSetup/assetNodesTable?reference='+JSON.parse(localStorage.getItem('currentUser')).userId, key: BaseUrl.Main},
}