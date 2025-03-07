import { ApisauceInstance, ApiResponse } from 'apisauce'
// import { Storage, StorageKey } from "../storage/index";
// import { StorageKey, asyncStorageService } from 'src/controllers/storage'
export class ThucDonApi {
    private _apisauce: ApisauceInstance
    // private _storage = asyncStorageService;
    constructor(apisauce: ApisauceInstance) {
        this._apisauce = apisauce
    }

    async danhSachThucDon(payload: any): Promise<any> {
        try {
            const response = await this._apisauce.post(`ThucDon/GetListThucDon`, payload)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}
