define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SystemUtils {
        static enableLoading(loading) {
            this.getBusVue().control.allLoading = loading;
        }
        static enablePageLoading(loading) {
            this.getBusVue().control.pageLoading = loading;
        }
        static getBusVue() {
            return window.busVue;
        }
    }
    exports.default = SystemUtils;
});
