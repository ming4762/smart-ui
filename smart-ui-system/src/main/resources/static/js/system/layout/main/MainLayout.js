define(["require", "exports", "./MainHeader", "./MultiTab", "./PageContainer"], function (require, exports, MainHeader_1, MultiTab_1, PageContainer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        components: {
            MainHeader: MainHeader_1.default,
            MultiTab: MultiTab_1.default,
            PageContainer: PageContainer_1.default
        },
        data: function () {
            return {
                fixedHeader: true
            };
        },
        computed: {
            computedBus: function () {
                return window.busVue;
            },
            computedOpenMenuList: function () {
                return this.computedBus.openMenuList;
            }
        },
        template: "\n\t\t<a-layout>\n\t\t\t\t<!--\t\t\u5934\u90E8\t\t-->\n\t\t\t\t<MainHeader/>\n\t\t\t\t<!--\t\t\u4E3B\u4F53\t\t-->\n\t\t\t\t<a-layout-content :style=\"{  margin: '24px 0 0', paddingTop: fixedHeader ? '0' : '0' }\">\n\t\t\t\t\t\t<MultiTab\n\t\t\t\t\t\t\t:menuList=\"computedOpenMenuList\"/>\n\t\t\t\t\t\t<PageContainer\n\t\t\t\t\t\t\t:activeMenu=\"computedBus.activeMenu\"\n\t\t\t\t\t\t\t:openMenuList=\"computedBus.openMenuList\"/>\n\t\t\t\t</a-layout-content>\n\t\t</a-layout>\n\t"
    };
});
