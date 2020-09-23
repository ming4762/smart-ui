define(["require", "exports", "js/common/utils/StoreUtil", "../constants/Constants"], function (require, exports, StoreUtil_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UserUtils {
        static saveUserData({ user, roles, permissions }) {
            this.saveUser(user);
            this.saveUserPermissions(permissions);
            this.saveUserRoles(roles);
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
            return StoreUtil_1.default.getStore(Constants_1.STORE_KEYS.USER_PERMISSIONS);
        }
    }
    exports.default = UserUtils;
});
