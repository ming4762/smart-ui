import ApiService from './ApiService'

declare const contextPath

let warningShow = false

const loginPath = contextPath + 'login'


const WARING_LOGIN_SHOW = 'warning_login_show'

if (localStorage.getItem(WARING_LOGIN_SHOW) === null) {
	localStorage.setItem(WARING_LOGIN_SHOW, 'false')
}

/**
 * 跳转到登录页面
 */
const goLogin = (warning: boolean = true) => {
	const win = window.parent.parent
	if (!!win['antd'] && warning) {
		if (localStorage.getItem(WARING_LOGIN_SHOW) === 'false') {
			localStorage.setItem(WARING_LOGIN_SHOW, 'true')
			win['antd'].Modal.warning({
				title: '警告',
				content: '登录超时，请重新登录！',
				keyboard: false,
				onOk: () => {
					sessionStorage.clear()
					localStorage.setItem(WARING_LOGIN_SHOW, 'false')
					win.location.href = loginPath
				}
			})
		}
	} else {
		sessionStorage.clear()
		win.location.href = loginPath
	}
}

const errorHandler = (error) => {
	if (!!error && error.code === 401) {
		goLogin()
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
		return ApiService.postAjax(url, parameter, customParameter)
			.then(result => {
				return result.data
			}).catch(error => {
				if (!!this.errorHandler) {
					return this.errorHandler(error)
				} else {
					return Promise.reject(error)
				}
			})
	}

	public static init401ErrorHandler(): void {
		this.errorHandler = errorHandler
	}

	/**
	 * 验证是否登录
	 */
	public static validateLogin(warning: boolean = true) {
		this.postAjax('auth/isLogin')
			.then(data => {
				if (!data) {
					goLogin(warning)
				} else {
					return data
				}
			}).catch(error => {
		    console.error(error)
			goLogin(warning)
		})
	}
}
