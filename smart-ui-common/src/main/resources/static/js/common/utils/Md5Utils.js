define(["require", "exports", "./Md5"], function (require, exports, Md5_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Md5Utils = (function () {
        function Md5Utils() {
        }
        Md5Utils.md5 = function (value, hashIterations) {
            if (hashIterations === void 0) { hashIterations = 1; }
            var hash = Md5_1.default.hashStr(value).toString();
            if (hashIterations > 1) {
                for (var i = 1; i < hashIterations; i++) {
                    hash = Md5_1.default.hashStr(hash).toString();
                }
            }
            return hash;
        };
        return Md5Utils;
    }());
    exports.default = Md5Utils;
});
