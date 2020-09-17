declare const axios: any

const API_URL_KEY = 'API_URL'

const STORE_TOKEN_KEY = 'SMART_AUTHORIATION'

const TOKEN_KEY: string = 'Authorization'

function getApiUrl (): string {
	return localStorage.getItem(API_URL_KEY) || '/'
}

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const API_SERVICE = axios.create({
	baseURL: getApiUrl(),
	timeout: 100000
})

/**
 * API服务类
 */
export default class ApiService {

	public static POST: string = 'POST'

	public static GET: string = 'GET'

	/**
	 * 获取后台地址
	 */
	public static getApiUrl(): string {
		return getApiUrl()
	}

	/**
	 * 获取token信息
	 * @private
	 */
	private static getToken (): string | null {
		return sessionStorage.getItem(STORE_TOKEN_KEY)
	}

	public static saveToken (token: string): void {
		sessionStorage.setItem(STORE_TOKEN_KEY, token)
	}

	/**
	 * 发送ajax请求
	 * @param url 请求地址
	 * @param ajaxType 请求类型
	 * @param parameter 参数
	 * @param customParameter 自定义参数
	 * @private
	 */
	private static ajax (url: string, ajaxType: string, parameter?: {[index: string]: any}, customParameter?: {[index: string]: any}) {
		// @ts-ignore
		const serverParameter = Object.assign({
			method: ajaxType,
			url: url,
			data: parameter || {},
			headers: {},
			validateStatus: (status: number) => status >= 200 && status < 300,
		}, customParameter)
		const token = this.getToken()
		if (token) {
			serverParameter.headers[TOKEN_KEY] = token
		}
		return API_SERVICE(serverParameter)
			.then((result: any) => {
				const data = result.data
				if (data.success === false) {
					return Promise.reject(data)
				}
				return result.data
			})
	}

	/**
	 * 发送post请求
	 * @param url
	 * @param parameter
	 * @param customParameter
	 */
	public static postAjax(url: string, parameter?: any, customParameter?: any) {
		return this.ajax(url, this.POST, parameter, customParameter)
	}

	/**
	 * 发送get请求
	 * @param url
	 * @param parameter
	 * @param customParameter
	 */
	public static getAjax(url: string, parameter?: any, customParameter?: any) {
		return this.ajax(url, this.GET, parameter, customParameter)
	}

}
