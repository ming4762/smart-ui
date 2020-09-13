define(["require", "exports", "js/common/utils/StoreUtil", "../constants/Constants"], function (require, exports, StoreUtil_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserUtils = (function () {
        function UserUtils() {
        }
        UserUtils.saveUserData = function (_a) {
            var user = _a.user, roles = _a.roles, permissions = _a.permissions;
            this.saveUser(user);
            this.saveUserPermissions(permissions);
            this.saveUserRoles(roles);
        };
        UserUtils.saveUser = function (user) {
            StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.USER_KEY, user, StoreUtil_1.default.SESSION_TYPE);
        };
        UserUtils.getUser = function () {
            return StoreUtil_1.default.getStore(Constants_1.STORE_KEYS.USER_KEY);
        };
        UserUtils.saveUserRoles = function (roles) {
            StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.USER_ROLES, roles, StoreUtil_1.default.SESSION_TYPE);
        };
        UserUtils.getUserRoles = function () {
            return StoreUtil_1.default.getStore(Constants_1.STORE_KEYS.USER_ROLES);
        };
        UserUtils.saveUserPermissions = function (permissions) {
            StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.USER_PERMISSIONS, permissions, StoreUtil_1.default.SESSION_TYPE);
        };
        UserUtils.getUserPermissions = function () {
            return StoreUtil_1.default.getStore(Constants_1.STORE_KEYS.USER_PERMISSIONS);
        };
        return UserUtils;
    }());
    exports.default = UserUtils;
});
