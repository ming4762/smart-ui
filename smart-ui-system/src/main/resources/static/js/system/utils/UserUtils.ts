// @ts-ignore
import StoreUtil from 'js/common/utils/StoreUtil'

import { STORE_KEYS } from '../constants/Constants'

/**
 *
 * @author shizhongming
 * 2020/9/12 10:15 下午
 */
export default class UserUtils {

	public static saveUserData({user, roles, permissions}: any) {
		UserUtils.saveUser(user)
		UserUtils.saveUserPermissions(permissions)
		UserUtils.saveUserRoles(roles)
	}

	public static saveUser(user: any): void {
		StoreUtil.setStore(STORE_KEYS.USER_KEY, user, StoreUtil.SESSION_TYPE)
	}

	public static getUser(): any {
		return StoreUtil.getStore(STORE_KEYS.USER_KEY)
	}

	public static saveUserRoles(roles: Array<string>): void {
		StoreUtil.setStore(STORE_KEYS.USER_ROLES, roles, StoreUtil.SESSION_TYPE)
	}

	public static getUserRoles(): any {
		return StoreUtil.getStore(STORE_KEYS.USER_ROLES)
	}

	public static saveUserPermissions(permissions: Array<string>): void {
		StoreUtil.setStore(STORE_KEYS.USER_PERMISSIONS, permissions, StoreUtil.SESSION_TYPE)
	}

	public static getUserPermissions(): any {
		return StoreUtil.getStore(STORE_KEYS.USER_PERMISSIONS) || []
	}

	/**
	 * 判断用户是否拥有权限
	 * @param all 是否保存所有权限
	 * @param permissions 权限信息
	 */
	public static hasPermission (all: boolean = true, ...permissions: Array<string>): boolean {
		const userPermissions = UserUtils.getUserPermissions()
		if (userPermissions.length === 0) {
			return false
		}
		if (permissions.length === 0) {
			return true
		}
		if (all) {
			return permissions.every(permission => {
				return userPermissions.includes(permission)
			})
		} else {
			return permissions.some(permission => {
				return userPermissions.includes(permission)
			})
		}
	}
}