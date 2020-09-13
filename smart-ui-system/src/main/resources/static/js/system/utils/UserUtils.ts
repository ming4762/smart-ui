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
		this.saveUser(user)
		this.saveUserPermissions(permissions)
		this.saveUserRoles(roles)
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
		return StoreUtil.getStore(STORE_KEYS.USER_PERMISSIONS)
	}
}