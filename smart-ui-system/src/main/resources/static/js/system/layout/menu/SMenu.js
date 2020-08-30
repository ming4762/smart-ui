define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var subMenu = {
        isSubMenu: true,
        props: {
            menu: {
                type: Object,
                required: true
            }
        },
        mounted: function () {
            console.log(this);
        },
        template: "\n<a-sub-menu\n  v-bind=\"$attrs\"\n  v-on=\"$listeners\"\n  :key=\"menu.key\">\n\t<span slot=\"title\">\n    <a-icon type=\"mail\" />\n\t\t<span>{{ menu.title }}</span>\n  </span>\n  <template v-for=\"item in menu.children\">\n      <a-menu-item v-if=\"!item.children\" :key=\"item.key\">\n          <a-icon type=\"pie-chart\" />\n          <span>{{ item.title }}</span>\n      </a-menu-item>\n      <SubMenu v-else :key=\"item.key\" :menu=\"item\" />\n  </template>\n</a-sub-menu>\t\t\n\t"
    };
    exports.default = {
        components: {
            SubMenu: subMenu
        },
        props: {
            menuList: {
                type: Array,
                default: function () { return ([]); }
            }
        },
        methods: {
            hasChildren: function (menu) {
                return menu.children && menu.children.length > 0;
            }
        },
        template: "\n<a-menu\n  mode=\"inline\"\n  theme=\"dark\">\n\t<template\n\t\tv-for=\"item in menuList\">\n      <a-menu-item v-if=\"!hasChildren(item)\" :key=\"item.key\">\n        <a-icon type=\"pie-chart\" />\n        <span>{{ item.title }}</span>\n      </a-menu-item>\n\t\t\t<a-sub-menu\n\t\t\t\tv-else\n\t\t\t\t:key=\"item.key\">\n\t\t\t\t<span slot=\"title\">\n\t\t\t    <a-icon type=\"mail\" />\n\t\t\t\t\t<span>{{ item.title }}</span>\n\t\t\t  </span>\n\t\t\t\t<template v-for=\"menu2 in item.children\">\n            <a-menu-item v-if=\"!hasChildren(menu2)\" :key=\"menu2.key\">\n                <a-icon type=\"pie-chart\" />\n                <span>{{ menu2.title }}</span>\n            </a-menu-item>\n\t\t\t\t\t\t<a-sub-menu v-else :key=\"menu2.key\">\n\t\t\t\t\t\t\t\t<span slot=\"title\">\n\t\t\t\t\t\t\t    <a-icon type=\"mail\" />\n\t\t\t\t\t\t\t\t\t<span>{{ menu2.title }}</span>\n\t\t\t\t\t\t\t  </span>\n\t\t\t\t\t\t\t\t<template v-for=\"menu3 in menu2.children\">\n                    <a-menu-item v-if=\"!hasChildren(menu3)\" :key=\"menu3.key\">\n                        <a-icon type=\"pie-chart\" />\n                        <span>{{ menu3.title }}</span>\n                    </a-menu-item>\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t</a-sub-menu>\n\t\t\t\t</template>\n\t\t\t</a-sub-menu>\n\t</template>\t\n</a-menu>\n\t"
    };
});
