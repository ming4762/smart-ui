// @ts-ignore
import StoreUtil from 'common/utils/StoreUtil'

import { STORE_KEYS } from 'system/constants/Constants'

declare const Vue: any

// 标识开发模式 TODO: 可配置
const debug = true
/**
 * 消息总线
 * @author shizhongming
 * 2020/8/30 8:03 下午
 */
const initBus = () => {
	return new Vue({
		data: {
			// 侧边栏
			sidebar: {
				opened: true
			},
			// 打开的菜单列表
			openMenuList: StoreUtil.getStore(STORE_KEYS.OPEN_MENU_LIST, debug) || [],
			// 激活的菜单
			activeMenu: StoreUtil.getStore(STORE_KEYS.ACTIVE_MENU, debug) || {},
			// 用户菜单列表
			userMenuList: StoreUtil.getStore(STORE_KEYS.USER_MENU_LIST, debug) || [],

		},
		methods: {
			/**
			 * 添加菜单
			 * @param menuId 菜单ID
			 * @param active 是否激活
			 */
			addMenu(menuId: string, active: boolean = true): Promise<any> {
				return new Promise<any>(() => {
					// 获取用户菜单信息
					let menu: any = null
					// @ts-ignore
					for (const item of this.userMenuList) {
						if (item.key === menuId) {
							menu = item
							break
						}
					}
					if (menu === null) {
						throw new Error('菜单信息失败')
					}
					// 设置激活菜单
					if (active) {
						this.setActiveMenu(menu)
					}
					// 判断菜单是否已经存在
					// @ts-ignore
					const notHasMenu: boolean = this.openMenuList.every((value: any) => {
						return value.key !== menu.key;
					})
					if (notHasMenu) {
						// @ts-ignore
						this.openMenuList.push(menu)
						// @ts-ignore
						StoreUtil.setStore(STORE_KEYS.OPEN_MENU_LIST, this.openMenuList, StoreUtil.SESSION_TYPE)
					}
				})
			},
			/**
			 * 设置激活菜单
			 * @param menu
			 */
			setActiveMenu(menu: any) {
				// @ts-ignore
				this.activeMenu = menu
				StoreUtil.setStore(STORE_KEYS.ACTIVE_MENU, menu, StoreUtil.SESSION_TYPE)
			}
		}
	})
}


export default initBus
