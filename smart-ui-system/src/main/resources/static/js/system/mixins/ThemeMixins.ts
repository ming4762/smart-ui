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
		},
		/**
		 * 主题计算属性
		 */
		computedTheme () {
			const menuThemeColor = this.computedBus.theme.menuTheme === 'dark' ? '#273238' : '#FFFFFF'
			return {
				...this.computedBus.theme,
				menuThemeColor: menuThemeColor
			}
		},
		computedRightHeaderStyle () {
			return {
				'background-color': this.computedTheme.navigationColor
			}
		},
		computedLeftHeaderStyle () {
			const width = this.computedTheme.sideWidth + 'px'
			return {
				'background-color': this.computedTheme.navigationColor,
				width: width,
				'min-width': width
			}
		},
		/**
		 * tab 高度计算属性
		 */
		computedTabsHeight () {
			return {
				height: this.computedTheme.tabsHeight + 'px'
			}
		},
		/**
		 * 侧边栏style
		 */
		computedSideMenuStyle () {
			return {
				'background-color': this.computedTheme.menuThemeColor,
				width: this.computedTheme.sideWidth + 'px'
			}
		}
	}
}