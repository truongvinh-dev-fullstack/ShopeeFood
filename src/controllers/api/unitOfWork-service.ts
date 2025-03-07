import { ApisauceInstance, create } from 'apisauce'
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config'
import { ThucDonApi } from './thucDon-api'
import { CuaHangApi } from './cuaHang-api'
/**
 * Manages all requests to the API.
 */
export class UnitOfWorkService {
	private _thucdonApi: ThucDonApi | undefined
	private _cuaHangApi: CuaHangApi | undefined

	private apisauce: ApisauceInstance
	/**
	 * Configurable options.
	 */
	private config: ApiConfig = DEFAULT_API_CONFIG

	/**
	 * Creates the api.
	 *
	 * @param config The configuration to use.
	 */
	constructor() {
		this.apisauce = create({
			baseURL: this.config.url,
			timeout: this.config.timeout,
			headers: {
				Accept: 'application/json',
				// 'Origin': 'http://103.138.113.158:9909',
				// Origin: ORIGIN,
				'Content-Type': 'application/json',
				// 'Abp.TenantId': 3,
			},
		})
	}

	/**
	 * Sets up the API.  This will be called during the bootup
	 * sequence and will happen before the first React component
	 * is mounted.
	 *
	 * Be as quick as possible in here.
	 */
	get thucDon(): ThucDonApi {
		return (this._thucdonApi = new ThucDonApi(this.apisauce))
	}

	get cuaHang(): CuaHangApi {
		return (this._cuaHangApi = new CuaHangApi(this.apisauce))
	}

	// get storage(): AsyncStorageService {
	// 	return (this._storage = new AsyncStorageService())
	// }
}
