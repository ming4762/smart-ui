var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "common/PageBuilder"], function (require, exports, PageBuilder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserManagerPage = (function (_super) {
        __extends(UserManagerPage, _super);
        function UserManagerPage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UserManagerPage.prototype.build = function () {
            return page;
        };
        return UserManagerPage;
    }(PageBuilder_1.default));
    exports.default = UserManagerPage;
    var page = {
        template: "\n\t<div style=\"height: 1000px\">\n\t\t\u8FD9\u662F\u7528\u6237\u7BA1\u7406\u9875\u9762\n\t</div>\n\t"
    };
});
