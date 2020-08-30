define(["require", "exports", "system/layout/menu/SideMenu", "system/layout/main/MainLayout", "system/mixins/ThemeMixins"], function (require, exports, SideMenu_1, MainLayout_1, ThemeMixins_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        mixins: [
            ThemeMixins_1.default
        ],
        components: {
            SideMenu: SideMenu_1.default,
            MainLayout: MainLayout_1.default
        },
        computed: {
            computedBus: function () {
                return window.busVue;
            },
            computedCollapsed: function () {
                return !this.computedBus.sidebar.opened;
            }
        },
        template: "\n      <a-layout :class=\"['layout']\">\n          <SideMenu\n            :collapsed=\"computedCollapsed\"/>\n          <MainLayout\n            :style=\"{ paddingLeft: computedSidebarWidth + 'px', minHeight: '100vh' }\"/>\n      </a-layout>\n\t"
    };
});
