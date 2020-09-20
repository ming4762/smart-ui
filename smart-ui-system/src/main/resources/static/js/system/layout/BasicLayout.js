define(["require", "exports", "js/system/layout/menu/SideMenu", "js/system/layout/main/MainLayout", "js/system/mixins/ThemeMixins"], function (require, exports, SideMenu_1, MainLayout_1, ThemeMixins_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const testUserMenuList = [
        {
            key: '1',
            title: '系统管理',
            icon: 'setting',
            parentKey: '0'
        },
        {
            key: '2',
            title: '用户管理',
            icon: 'user',
            path: '/ui/common?page=system/pages/user/UserManagerPage',
            parentKey: '1'
        },
        {
            key: '3',
            title: '测试2',
            icon: 'setting',
            parentKey: '0'
        },
        {
            key: '4',
            title: '测试3',
            icon: 'setting',
            parentKey: '0'
        },
        {
            key: '5',
            title: '测试3-1',
            icon: 'setting',
            parentKey: '4'
        },
        {
            key: '6',
            title: '测试3-1-1',
            icon: 'setting',
            parentKey: '5'
        },
        {
            key: '7',
            title: '测试3-1-2',
            icon: 'setting',
            parentKey: '5'
        },
    ];
    exports.default = {
        mixins: [
            ThemeMixins_1.default
        ],
        components: {
            SideMenu: SideMenu_1.default,
            MainLayout: MainLayout_1.default
        },
        mounted() {
            this.loadUserMenus();
        },
        computed: {
            computedBus() {
                return window.busVue;
            },
            computedCollapsed() {
                return !this.computedBus.sidebar.opened;
            }
        },
        methods: {
            loadUserMenus() {
                return new Promise(() => {
                    this.computedBus.userMenuList = testUserMenuList;
                });
            }
        },
        template: `
      <a-layout :class="['layout', 'smart-base-layout']">
          <SideMenu
            :collapsed="computedCollapsed"/>
          <MainLayout
            :style="{ paddingLeft: computedSidebarWidth + 'px', minHeight: '100vh' }"/>
      </a-layout>
	`
    };
});
