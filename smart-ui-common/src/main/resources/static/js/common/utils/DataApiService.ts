import ApiService from './ApiService'

declare const contextPath

const errorHandler = (error) => {
	if (!!error && error.code === 401) {
		if (!!window['antd']) {
			window['antd'].Modal.warning({
				title: '警告',
				content: '登录超时，请重新登录！',
				keyboard: false,
				onOk: () => {
					window.location.href = contextPath + 'ui/system/login'
				}
			})
		} else {
			window.location.href = contextPath + 'ui/system/login'
		}
	} else {
		return Promise.reject(error)
	}
}

/**
 *
 * @author shizhongming
 * 2020/9/13 5:12 下午
 */
export default class DataApiService {

	private static errorHandler = null

	/**
	 * 发送post请求
	 * @param url
	 * @param parameter
	 * @param customParameter
	 */
	public static postAjax(url: string, parameter?: any, customParameter?: any) {
		return ApiService.postAjax(url,  parameter, customParameter)
			.then(result => {
				return result.data
			}).catch(error => {
				if (!!this.errorHandler) {
					this.errorHandler(error)
				} else {
					return Promise.reject(error)
				}
			})
	}

	public static init401ErrorHandler (): void {
		this.errorHandler = errorHandler
	}
}