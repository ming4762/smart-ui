define(["require", "exports", "system/layout/menu/SideMenu", "system/layout/main/MainLayout", "system/mixins/ThemeMixins"], function (require, exports, SideMenu_1, MainLayout_1, ThemeMixins_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var testUserMenuList = [
        {
            key: 1,
            title: '系统管理',
            icon: 'setting',
            parentKey: 0
        },
        {
            key: 2,
            title: '用户管理',
            icon: 'user',
            path: '/ui/common?page=system/pages/user/UserManagerPage',
            parentKey: 1
        },
        {
            key: 3,
            title: '测试2',
            icon: 'setting',
            parentKey: 0
        },
        {
            key: 4,
            title: '测试3',
            icon: 'setting',
            parentKey: 0
        },
        {
            key: 5,
            title: '测试3-1',
            icon: 'setting',
            parentKey: 4
        },
        {
            key: 6,
            title: '测试3-1-1',
            icon: 'setting',
            parentKey: 5
        },
        {
            key: 7,
            title: '测试3-1-2',
            icon: 'setting',
            parentKey: 5
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
        mounted: function () {
            this.loadUserMenus();
        },
        computed: {
            computedBus: function () {
                return window.busVue;
            },
            computedCollapsed: function () {
                return !this.computedBus.sidebar.opened;
            }
        },
        methods: {
            loadUserMenus: function () {
                var _this = this;
                return new Promise(function () {
                    _this.computedBus.userMenuList = testUserMenuList;
                });
            }
        },
        template: "\n      <a-layout :class=\"['layout', 'smart-base-layout']\">\n          <SideMenu\n            :collapsed=\"computedCollapsed\"/>\n          <MainLayout\n            :style=\"{ paddingLeft: computedSidebarWidth + 'px', minHeight: '100vh' }\"/>\n      </a-layout>\n\t"
    };
});
