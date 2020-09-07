define(["require", "exports", "common/utils/TreeUtils", "system/layout/menu/SMenu"], function (require, exports, TreeUtils_1, SMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Logo = {
        props: {
            title: {
                type: String,
                default: 'Ant Design Pro',
                required: false
            },
            showTitle: {
                type: Boolean,
                default: true,
                required: false
            }
        },
        template: "\n  <div class=\"system-logo\">\n    <a>\n      <h1 v-if=\"showTitle\">{{ title }}</h1>\n    </a>\n  </div>\n  "
    };
    exports.default = {
        components: {
            SMenu: SMenu_1.default,
            Logo: Logo
        },
        props: {
            mode: {
                type: String,
                required: false,
                default: 'inline'
            },
            collapsible: {
                type: Boolean,
                required: false,
                default: false
            },
            collapsed: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data: function () {
            return {};
        },
        computed: {
            computedUserMenuTree: function () {
                var userMenuList = window.busVue.userMenuList || [];
                return TreeUtils_1.default.convertList2Tree(userMenuList, ['key', 'parentKey'], '0');
            }
        },
        template: "\n<a-layout-sider\n  :class=\"['sider', 'ant-fixed-sidemenu']\"\n  width=\"256px\"\n  v-model=\"collapsed\"\n  :collapsible=\"collapsible\"\n  :trigger=\"null\">\n  <Logo/>\n  <SMenu style=\"padding: 16px 0\" :menuList=\"computedUserMenuTree\"></SMenu>\n</a-layout-sider>\n  "
    };
});
