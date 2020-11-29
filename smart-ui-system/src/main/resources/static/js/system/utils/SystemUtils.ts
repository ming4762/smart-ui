/**
 *
 * @author shizhongming
 * 2020/11/29 8:29 下午
 */
export default class SystemUtils {

	/**
	 * 是否开启全局加载
	 * @param loading 全局加载
	 */
	public static enableLoading (loading: boolean) {
		this.getBusVue().control.allLoading = loading
	}

	/**
	 * 页面区域加载装填
	 * @param loading 加载状态
	 */
	public static enablePageLoading (loading: boolean) {
		this.getBusVue().control.pageLoading = loading
	}

	/**
	 * 获取bus vue
	 * @private
	 */
	private static getBusVue(): any {
		return window.busVue
	}
}