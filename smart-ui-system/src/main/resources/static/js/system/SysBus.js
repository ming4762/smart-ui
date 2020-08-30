define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var initBus = function () {
        return new Vue({
            data: {
                sidebar: {
                    opened: true
                }
            }
        });
    };
    exports.default = initBus;
});
