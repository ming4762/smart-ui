/**
 *
 * @author shizhongming
 * 2020/8/30 8:14 下午
 */
export default {
	computed: {
		/**
		 * 获取bus
		 */
		computedBus () {
			return window.busVue
		},
		/**
		 * 侧边栏宽度
		 */
		computedSidebarWidth () {
			// @ts-ignore
			return this.computedBus.sidebar.opened ? 256 : 80
		}
	}
}