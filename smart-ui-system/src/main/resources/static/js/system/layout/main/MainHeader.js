define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        computed: {
            computedBus: function () {
                return window.busVue;
            },
            computedStyle: function () {
                return {
                    padding: '0',
                    right: '0',
                    position: 'fixed',
                    top: '0',
                    width: "calc(100% - " + (this.computedBus.sidebar.opened ? '256' : '80') + "px)"
                };
            }
        },
        methods: {
            toggle: function () {
                this.computedBus.sidebar.opened = !this.computedBus.sidebar.opened;
            }
        },
        template: "\n\t<transition>\n\t\t\t<div class=\"header-animat\">\n\t\t\t\t\t<a-layout-header/>\n\t\t\t\t\t<a-layout-header\n\t\t\t\t\t\t:class=\"['ant-pro-fixed-header']\"\n            :style=\"computedStyle\">\n\t\t\t\t\t\t<div class=\"header\">\n              <a-icon class=\"trigger\" :type=\"computedBus.sidebar.opened ? 'menu-fold' : 'menu-unfold'\" @click=\"toggle\"/>\n\t\t\t\t\t\t</div>\t\n\t\t\t\t\t</a-layout-header>\n\t\t\t</div>\n\t</transition>\n\t"
    };
});
