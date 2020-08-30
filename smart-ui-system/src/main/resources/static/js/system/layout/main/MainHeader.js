define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        computed: {
            computedBus: function () {
                return window.busVue;
            }
        },
        methods: {
            toggle: function () {
                this.computedBus.sidebar.opened = !this.computedBus.sidebar.opened;
            }
        },
        template: "\n\t<transition>\n\t\t\t<div class=\"header-animat\">\n\t\t\t\t\t<a-layout-header\n            :style=\"{ padding: '0' }\">\n\t\t\t\t\t\t<div class=\"header\">\n              <a-icon class=\"trigger\" :type=\"computedBus.sidebar.opened ? 'menu-fold' : 'menu-unfold'\" @click=\"toggle\"/>\n\t\t\t\t\t\t</div>\t\n\t\t\t\t\t</a-layout-header>\n\t\t\t</div>\n\t</transition>\n\t"
    };
});
