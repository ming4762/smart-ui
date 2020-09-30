define(["require", "exports", "js/common/utils/StoreUtil", "js/system/constants/Constants"], function (require, exports, StoreUtil_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const debug = true;
    const initBus = () => {
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
                addMenu(menuId, active = true) {
                    return new Promise(() => {
                        let menu = null;
                        for (const item of this.userMenuList) {
                            if (item.key === menuId) {
                                menu = item;
                                break;
                            }
                        }
                        if (menu === null) {
                            throw new Error('菜单信息失败');
                        }
                        if (active) {
                            this.setActiveMenu(menu);
                        }
                        const notHasMenu = this.openMenuList.every((value) => {
                            return value.key !== menu.key;
                        });
                        if (notHasMenu) {
                            this.openMenuList.push(menu);
                            StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.OPEN_MENU_LIST, this.openMenuList, StoreUtil_1.default.SESSION_TYPE);
                        }
                    });
                },
                setActiveMenu(menu) {
                    this.activeMenu = menu;
                    StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.ACTIVE_MENU, menu, StoreUtil_1.default.SESSION_TYPE);
                },
                setUserMenu(menuList) {
                    this.userMenuList = menuList;
                    StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.USER_MENU_LIST, menuList, StoreUtil_1.default.SESSION_TYPE);
                },
                removeAllMenu(removeCurrent = true) {
                    return new Promise(() => {
                        if (this.openMenuList.length > 1) {
                            const menuList = [];
                            menuList.push(this.openMenuList[0]);
                            if (!removeCurrent && this.openMenuList[0].key !== this.activeMenu.key) {
                                menuList.push(this.activeMenu);
                            }
                            if (removeCurrent) {
                                this.setActiveMenu(menuList[0]);
                            }
                            this.openMenuList = menuList;
                            StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.OPEN_MENU_LIST, menuList, StoreUtil_1.default.SESSION_TYPE);
                        }
                    });
                },
                removeMenu(menuKey) {
                    return new Promise(() => {
                        for (let i = 0; i < this.openMenuList.length; i++) {
                            const menu = this.openMenuList[i];
                            if (menu.key === menuKey) {
                                this.openMenuList.splice(i, 1);
                                break;
                            }
                        }
                        StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.OPEN_MENU_LIST, this.openMenuList, StoreUtil_1.default.SESSION_TYPE);
                        if (this.activeMenu.key === menuKey) {
                            const activeMenu = this.openMenuList.slice(-1)[0];
                            this.setActiveMenu(activeMenu);
                        }
                    });
                }
            }
        });
    };
    exports.default = initBus;
});
