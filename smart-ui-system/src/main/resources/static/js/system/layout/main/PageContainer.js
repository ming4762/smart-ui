define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        props: {
            openMenuList: {
                type: Array,
                required: true
            },
            activeMenu: {
                type: Object,
                required: true
            }
        },
        watch: {},
        methods: {
            getMenuPath: function (menu) {
                return menu.path;
            }
        },
        template: "\n\t<div class=\"page-container\">\n      <iframe\n        :class=\"menu.key === activeMenu.key ? 'active' : ''\"\n        class=\"animation-fade page-frame\"\n        v-for=\"menu in openMenuList\"\n        :src=\"getMenuPath(menu)\"\n        :key=\"menu.key\"/>\n\t</div>\n\t"
    };
});
