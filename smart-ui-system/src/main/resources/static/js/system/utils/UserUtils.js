define(["require", "exports", "js/common/utils/StoreUtil", "../constants/Constants"], function (require, exports, StoreUtil_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UserUtils {
        static saveUserData({ user, roles, permissions }) {
            UserUtils.saveUser(user);
            UserUtils.saveUserPermissions(permissions);
            UserUtils.saveUserRoles(roles);
        }
        static saveUser(user) {
            StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.USER_KEY, user, StoreUtil_1.default.SESSION_TYPE);
        }
        static getUser() {
            return StoreUtil_1.default.getStore(Constants_1.STORE_KEYS.USER_KEY);
        }
        static saveUserRoles(roles) {
            StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.USER_ROLES, roles, StoreUtil_1.default.SESSION_TYPE);
        }
        static getUserRoles() {
            return StoreUtil_1.default.getStore(Constants_1.STORE_KEYS.USER_ROLES);
        }
        static saveUserPermissions(permissions) {
            StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.USER_PERMISSIONS, permissions, StoreUtil_1.default.SESSION_TYPE);
        }
        static getUserPermissions() {
            return StoreUtil_1.default.getStore(Constants_1.STORE_KEYS.USER_PERMISSIONS) || [];
        }
        static hasPermission(all = true, ...permissions) {
            const userPermissions = UserUtils.getUserPermissions();
            if (userPermissions.length === 0) {
                return false;
            }
            if (permissions.length === 0) {
                return true;
            }
            if (all) {
                return permissions.every(permission => {
                    return userPermissions.includes(permission);
                });
            }
            else {
                return permissions.some(permission => {
                    return userPermissions.includes(permission);
                });
            }
        }
    }
    exports.default = UserUtils;
});
