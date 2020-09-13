define(["require", "exports", "js/component/navigation/Navigation"], function (require, exports, Navigation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        components: {
            Navigation: Navigation_1.default
        },
        props: {
            menuList: Array
        },
        data: function () {
            return {};
        },
        computed: {
            computedBus: function () {
                return window.busVue;
            },
            computedActiveMenu: function () {
                return this.computedBus.activeMenu;
            }
        },
        methods: {
            handleRemove: function (key) {
                this.computedBus.removeMenu(key);
            },
            handleNavChange: function (key) {
                this.computedBus.addMenu(key);
            },
            handleClickDropdownMenu: function (_a) {
                var key = _a.key;
                switch (key) {
                    case 'location': {
                        break;
                    }
                    case 'closeAll': {
                        this.computedBus.removeAllMenu();
                        break;
                    }
                    case 'closeOther': {
                        this.computedBus.removeAllMenu(false);
                        break;
                    }
                }
            }
        },
        template: "\n\t\t<div style=\"margin-bottom: 0px; margin-left: 0\" class=\"ant-pro-multi-tab\">\n\t\t\t\t<div class=\"ant-pro-multi-tab-wrapper\">\n\t\t\t\t\t\t<Navigation\n\t\t\t\t\t\t\t\t:menuList=\"menuList\"\n\t\t\t\t\t\t\t\t@remove=\"handleRemove\"\n\t\t\t\t\t\t\t\t:value=\"computedActiveMenu.key\"\n\t\t\t\t\t\t\t\t@input=\"handleNavChange\">\n                <a-menu @click=\"handleClickDropdownMenu\" slot=\"dropdown-menu\">\n                    <a-menu-item key=\"location\">\u5B9A\u4F4D\u5F53\u524D\u9009\u9879\u5361 </a-menu-item>\n                    <a-divider />\n                    <a-menu-item key=\"closeAll\">\u5173\u95ED\u5168\u90E8\u9009\u9879\u5361 </a-menu-item>\n                    <a-menu-item key=\"closeOther\">\u5173\u95ED\u5176\u4ED6\u9009\u9879\u5361 </a-menu-item>\n                </a-menu>\n\t\t\t\t\t\t</Navigation>\n\t\t\t\t</div>\n\t\t</div>\n\t\n\t"
    };
});
