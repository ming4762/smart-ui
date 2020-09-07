import SideMenu from 'system/layout/menu/SideMenu'
import MainLayout from 'system/layout/main/MainLayout'

import ThemeMixins from 'system/mixins/ThemeMixins'

const testUserMenuList: Array<any> = [
	{
		key: '1',
		title: '系统管理',
		icon: 'setting',
		parentKey: '0'
	},
	{
		key: '2',
		title: '用户管理',
		icon: 'user',
		path: '/ui/common?page=system/pages/user/UserManagerPage',
		parentKey: '1'
	},
	{
		key: '3',
		title: '测试2',
		icon: 'setting',
		parentKey: '0'
	},
	{
		key: '4',
		title: '测试3',
		icon: 'setting',
		parentKey: '0'
	},
	{
		key: '5',
		title: '测试3-1',
		icon: 'setting',
		parentKey: '4'
	},
	{
		key: '6',
		title: '测试3-1-1',
		icon: 'setting',
		parentKey: '5'
	},
	{
		key: '7',
		title: '测试3-1-2',
		icon: 'setting',
		parentKey: '5'
	},
]

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
	mounted () {
		// @ts-ignore
		this.loadUserMenus()
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
	methods: {
		/**
		 * 加载用户菜单信息
		 */
		loadUserMenus () {
			return new Promise(() => {
				// @ts-ignore
				this.computedBus.userMenuList = testUserMenuList
			})
		}
	},
	// language=html
	template: `
      <a-layout :class="['layout', 'smart-base-layout']">
          <SideMenu
            :collapsed="computedCollapsed"/>
          <MainLayout
            :style="{ paddingLeft: computedSidebarWidth + 'px', minHeight: '100vh' }"/>
      </a-layout>
	`
}
