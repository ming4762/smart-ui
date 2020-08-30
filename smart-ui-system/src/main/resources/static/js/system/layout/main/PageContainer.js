define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        template: "\n\t<div class=\"page-container\">\n      <iframe\n        :class=\"menu.id === computedActiveMenu.id ? 'active' : ''\"\n        class=\"animation-fade page-frame\"\n        v-for=\"menu in computedOpenMenuList\"\n        :src=\"getMenuPath(menu)\"\n        :key=\"menu.id\"/>\n\t</div>\n\t"
    };
});
