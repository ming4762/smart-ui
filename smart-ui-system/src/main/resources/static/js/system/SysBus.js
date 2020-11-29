define(["require", "exports", "js/common/utils/StoreUtil", "js/common/utils/TreeUtils", "js/system/constants/Constants"], function (require, exports, StoreUtil_1, TreeUtils_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const debug = true;
    const setTopMenuId = (menuList, topId) => {
        menuList.forEach(item => {
            item.topKey = topId;
            if (item.children && item.children.length > 0) {
                setTopMenuId(item.children, topId);
            }
        });
    };
    const defaultTheme = {
        navigationColor: 'rgb(0, 125, 186)',
        menuTheme: 'dark',
        themeColor: '#2593FC',
        sideWidth: 200,
        tabsHeight: 30,
        footerVisible: true
    };
    const initBus = () => {
        return new Vue({
            data: {
                sidebar: {
                    opened: true
                },
                openMenuList: StoreUtil_1.default.getStore(Constants_1.STORE_KEYS.OPEN_MENU_LIST, debug) || [],
                activeMenu: StoreUtil_1.default.getStore(Constants_1.STORE_KEYS.ACTIVE_MENU, debug) || {},
                userMenuList: StoreUtil_1.default.getStore(Constants_1.STORE_KEYS.USER_MENU_LIST, debug) || [],
                userMenuTree: StoreUtil_1.default.getStore(Constants_1.STORE_KEYS.USER_MENU_TREE, debug) || [],
                activeTopMenu: StoreUtil_1.default.getStore(Constants_1.STORE_KEYS.ACTIVE_TOP_MENU, debug) || {},
                theme: defaultTheme,
                control: {
                    allLoading: false,
                    pageLoading: false
                }
            },
            methods: {
                setTopActiveMenu(key) {
                    const topMenu = this.userMenuTree.find(item => {
                        return item.topKey === key;
                    }) || {};
                    this.activeTopMenu = topMenu;
                    StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.ACTIVE_TOP_MENU, topMenu, StoreUtil_1.default.SESSION_TYPE);
                },
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
                setUserMenuTree(menuList) {
                    this.setUserMenu(menuList);
                    if (menuList.length > 0) {
                        const menuTree = TreeUtils_1.default.convertList2Tree(menuList, ['key', 'parentKey'], '0');
                        menuTree.forEach(item => {
                            if (item.children && item.children.length > 0) {
                                item.topKey = item.key;
                                setTopMenuId(item.children, item.key);
                            }
                        });
                        this.userMenuTree = menuTree;
                        StoreUtil_1.default.setStore(Constants_1.STORE_KEYS.USER_MENU_TREE, menuTree, StoreUtil_1.default.SESSION_TYPE);
                    }
                },
                setActiveMenu(menu) {
                    this.activeMenu = menu;
                    this.setTopActiveMenu(menu.topKey);
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
