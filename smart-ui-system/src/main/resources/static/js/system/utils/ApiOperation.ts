// @ts-ignore
import DataApiService from 'js/common/utils/DataApiService'

declare const contextPath

/**
 *
 * @author shizhongming
 * 2020/10/1 6:26 下午
 */
export default class ApiOperation {

	/**
	 * 退出登录操作
	 */
	public static logout (): Promise<any> {
		return DataApiService.postAjax('auth/logout')
			.finally(() => {
				sessionStorage.clear()
				window.parent.parent.location.href = contextPath + 'ui/system/login'
			})
	}
}