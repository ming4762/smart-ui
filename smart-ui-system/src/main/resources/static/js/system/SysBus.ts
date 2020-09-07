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
						// todo 待确认
						return value.path !== menu.path;
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
			},
			/**
			 * 关闭全部菜单
			 */
			removeAllMenu (removeCurrent: boolean = true): Promise<any> {
				return new Promise<any>(() => {
					// @ts-ignore
					if (this.openMenuList.length > 1) {
						const menuList = []
						// @ts-ignore
						menuList.push(this.openMenuList[0])
						// @ts-ignore
						if (!removeCurrent && this.openMenuList[0].key !== this.activeMenu.key) {
							// @ts-ignore
							menuList.push(this.activeMenu)
						}
						// 如果移除当前，则设置激活菜单为第一个
						if (removeCurrent) {
							this.setActiveMenu(menuList[0])
						}
						// 设置菜单
						// @ts-ignore
						this.openMenuList = menuList
						StoreUtil.setStore(STORE_KEYS.OPEN_MENU_LIST, menuList, StoreUtil.SESSION_TYPE)
					}
				})
			},
			/**
			 * 移除菜单
			 * @param menuKey 菜单的key
			 */
			removeMenu (menuKey: string): Promise<any> {
				return new Promise<any>(() => {
					// @ts-ignore
					for (let i=0; i<this.openMenuList.length; i++) {
						// @ts-ignore
						const menu = this.openMenuList[i]
						if (menu.key === menuKey) {
							// @ts-ignore
							this.openMenuList.splice(i, 1)
							break
						}
					}
					// @ts-ignore
					StoreUtil.setStore(STORE_KEYS.OPEN_MENU_LIST, this.openMenuList, StoreUtil.SESSION_TYPE)
					// 如果关闭的是激活的菜单，则设置下一个激活的菜单
					// @ts-ignore
					if (this.activeMenu.key === menuKey) {
						// @ts-ignore
						const activeMenu = this.openMenuList.slice(-1)[0]
						// 设置激活的菜单 TODO: 判断activeMenu是否存在
						this.setActiveMenu(activeMenu)
					}
				})
			}
		}
	})
}


export default initBus
