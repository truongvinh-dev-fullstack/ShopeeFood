import { ApisauceInstance, ApiResponse } from 'apisauce'
// import { Storage, StorageKey } from "../storage/index";
// import { StorageKey, asyncStorageService } from 'src/controllers/storage'
export class CuaHangApi {
    private _apisauce: ApisauceInstance
    // private _storage = asyncStorageService;
    constructor(apisauce: ApisauceInstance) {
        this._apisauce = apisauce
    }

    async danhSachCuaHang(payload: any): Promise<any> {
        try {
            const response = await this._apisauce.post(`Restaurant/GetListRestaurant`, payload)
            console.log("response: ", response)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}
