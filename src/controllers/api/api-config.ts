import { API_URL, TIMEOUT } from "../../config"
/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  url: string
  timeout: number
}

 export const DEFAULT_API_CONFIG: ApiConfig = {
  url: `${API_URL}/api/`,
  timeout: Number(TIMEOUT),
}

