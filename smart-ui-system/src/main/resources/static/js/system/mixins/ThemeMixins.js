define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        computed: {
            computedBus() {
                return window.busVue;
            },
            computedSidebarWidth() {
                return this.computedBus.sidebar.opened ? 256 : 80;
            }
        }
    };
});
