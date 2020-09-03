define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        props: {
            menuList: {
                type: Array,
                default: function () { return ([]); }
            },
            value: String
        },
        template: "\n\t<div class=\"content-tabs\">\n\t\t\t<button>\n          <a-icon type=\"backward\" />\n\t\t\t</button>\n\t</div>\n\t"
    };
});
