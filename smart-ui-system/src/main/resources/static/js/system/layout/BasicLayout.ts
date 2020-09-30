import SideMenu from 'js/system/layout/menu/SideMenu'
import MainLayout from 'js/system/layout/main/MainLayout'

import ThemeMixins from 'js/system/mixins/ThemeMixins'
// @ts-ignore
import DataApiService from 'js/common/utils/DataApiService'

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
		path: '/ui/common?page=js/system/pages/user/UserManagerPage',
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
			if (this.computedBus.userMenuList.length === 0) {
				DataApiService.postAjax('sys/user/listUserMenu')
					.then(data => {
						this.computedBus.setUserMenu(
							data.map(item => {
								return {
									key: item.functionId + '',
									title: item.functionName,
									icon: item.icon,
									path: item.url,
									parentKey: item.parentId + '',
									data: item
								}
							})
						)
					}).catch(error => {
					console.error(error)
					this.$message.error('加载用户菜单失败')
				})
			}
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
