import SideMenu from 'system/layout/menu/SideMenu'
import MainLayout from 'system/layout/main/MainLayout'

import ThemeMixins from 'system/mixins/ThemeMixins'

/**
 * 主框架
 * @author shizhongming
 * 2020/8/29 8:11 下午
 */
export default {
	mixins: [
		ThemeMixins
	],
	components: {
		SideMenu: SideMenu,
		MainLayout
	},
	computed: {
		computedBus () {
			return window.busVue
		},
		computedCollapsed () {
			// @ts-ignore
			return !this.computedBus.sidebar.opened
		}
	},
	// language=html
	template: `
      <a-layout :class="['layout']">
          <SideMenu
            :collapsed="computedCollapsed"/>
          <MainLayout
            :style="{ paddingLeft: computedSidebarWidth + 'px', minHeight: '100vh' }"/>
      </a-layout>
	`
}