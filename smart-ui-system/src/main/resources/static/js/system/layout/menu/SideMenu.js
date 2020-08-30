define(["require", "exports", "system/layout/menu/SMenu"], function (require, exports, SMenu_1) {
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
        data: function () {
            return {
                menuList: [
                    {
                        key: 1,
                        title: '测试1',
                        children: []
                    },
                    {
                        key: 2,
                        title: '测试2',
                    },
                    {
                        key: 3,
                        title: '测试3',
                        children: [
                            {
                                key: 31,
                                title: '测试3-1',
                                children: [
                                    {
                                        key: 32,
                                        title: '测试3-1-1',
                                    },
                                    {
                                        key: 33,
                                        title: '测试3-1-2',
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
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
        template: "\n<a-layout-sider\n  :class=\"['sider', 'ant-fixed-sidemenu']\"\n  width=\"256px\"\n  v-model=\"collapsed\"\n  :collapsible=\"collapsible\"\n  :trigger=\"null\">\n  <Logo/>\n  <SMenu style=\"padding: 16px 0\" :menuList=\"menuList\"></SMenu>\n</a-layout-sider>\n  "
    };
});
