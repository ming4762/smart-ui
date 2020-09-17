import ApiService from './ApiService'

/**
 *
 * @author shizhongming
 * 2020/9/13 5:12 下午
 */
export default class DataApiService {
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
			})
	}
}