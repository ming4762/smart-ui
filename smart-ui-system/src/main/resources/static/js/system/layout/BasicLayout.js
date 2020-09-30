define(["require", "exports", "js/system/layout/menu/SideMenu", "js/system/layout/main/MainLayout", "js/system/mixins/ThemeMixins", "js/common/utils/DataApiService"], function (require, exports, SideMenu_1, MainLayout_1, ThemeMixins_1, DataApiService_1) {
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
            path: '/ui/common?page=js/system/pages/user/UserManagerPage',
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
                if (this.computedBus.userMenuList.length === 0) {
                    DataApiService_1.default.postAjax('sys/user/listUserMenu')
                        .then(data => {
                        this.computedBus.setUserMenu(data.map(item => {
                            return {
                                key: item.functionId + '',
                                title: item.functionName,
                                icon: item.icon,
                                path: item.url,
                                parentKey: item.parentId + '',
                                data: item
                            };
                        }));
                    }).catch(error => {
                        console.error(error);
                        this.$message.error('加载用户菜单失败');
                    });
                }
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
