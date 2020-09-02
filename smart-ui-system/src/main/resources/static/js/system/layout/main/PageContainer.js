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
        watch: {
            openMenuList: function () {
                console.log(this.openMenuList);
            }
        },
        methods: {
            getMenuPath: function (menu) {
                return menu.path;
            }
        },
        template: "\n\t<div class=\"page-container\">\n      <iframe\n        :class=\"menu.id === activeMenu.id ? 'active' : ''\"\n        class=\"animation-fade page-frame\"\n        v-for=\"menu in openMenuList\"\n        :src=\"getMenuPath(menu)\"\n        :key=\"menu.id\"/>\n\t</div>\n\t"
    };
});
