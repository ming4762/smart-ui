define(["require", "exports", "common/utils/StoreUtil", "system/constants/Constants"], function (require, exports, StoreUtil_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug = true;
    var initBus = function () {
        return new Vue({
            data: {
                sidebar: {
                    opened: true
                },
                openMenuList: StoreUtil_1.default.getStore(Constants_1.STORE_KEYS.OPEN_MENU_LIST, debug) || [],
                activeMenu: StoreUtil_1.default.getStore(Constants_1.STORE_KEYS.ACTIVE_MENU, debug) || {},
                userMenuList: StoreUtil_1.default.getStore(Constants_1.STORE_KEYS.USER_MENU_LIST, debug) || [],
            },
            methods: {
                addMenu: function (menuId, active) {
                    var _this = this;
                    if (active === void 0) { active = true; }
                    return new Promise(function () {
                        var menu = null;
                        for (var _i = 0, _a = _this.userMenuList; _i < _a.length; _i++) {
                            var item = _a[_i];
                            if (item.key === menuId) {
                                menu = item;
                                break;
                            }
                        }
                        if (menu === null) {
                            throw new Error('菜单信息失败');
                        }
                        if (active) {
                            _this.setActiveMenu(menu);
                        }
                        var notHasMenu = _this.openMenuList.every(function (value) {
                            return value.key !== menu.key;
                        });
                        if (notHasMenu) {
                            _this.openMenuList.push(menu);
                            StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.OPEN_MENU_LIST, _this.openMenuList, StoreUtil_1.default.SESSION_TYPE);
                        }
                    });
                },
                setActiveMenu: function (menu) {
                    this.activeMenu = menu;
                    StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.ACTIVE_MENU, menu, StoreUtil_1.default.SESSION_TYPE);
                },
                removeAllMenu: function (removeCurrent) {
                    var _this = this;
                    if (removeCurrent === void 0) { removeCurrent = true; }
                    return new Promise(function () {
                        if (_this.openMenuList.length > 1) {
                            var menuList = [];
                            menuList.push(_this.openMenuList[0]);
                            if (!removeCurrent && _this.openMenuList[0].key !== _this.activeMenu.key) {
                                menuList.push(_this.activeMenu);
                            }
                            if (removeCurrent) {
                                _this.setActiveMenu(menuList[0]);
                            }
                            _this.openMenuList = menuList;
                            StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.OPEN_MENU_LIST, menuList, StoreUtil_1.default.SESSION_TYPE);
                        }
                    });
                },
                removeMenu: function (menuKey) {
                    var _this = this;
                    return new Promise(function () {
                        for (var i = 0; i < _this.openMenuList.length; i++) {
                            var menu = _this.openMenuList[i];
                            if (menu.key === menuKey) {
                                _this.openMenuList.splice(i, 1);
                                break;
                            }
                        }
                        StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.OPEN_MENU_LIST, _this.openMenuList, StoreUtil_1.default.SESSION_TYPE);
                        if (_this.activeMenu.key === menuKey) {
                            var activeMenu = _this.openMenuList.slice(-1)[0];
                            _this.setActiveMenu(activeMenu);
                        }
                    });
                }
            }
        });
    };
    exports.default = initBus;
});
