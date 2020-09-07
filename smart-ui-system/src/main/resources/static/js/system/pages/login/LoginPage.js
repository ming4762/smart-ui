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
define(["require", "exports", "js/common/PageBuilder"], function (require, exports, PageBuilder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LoginPage = (function (_super) {
        __extends(LoginPage, _super);
        function LoginPage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LoginPage.prototype.build = function () {
            console.log('=====');
            return page;
        };
        return LoginPage;
    }(PageBuilder_1.default));
    exports.default = LoginPage;
    var page = {
        template: "\n\t<div>\n\t\t\t\u8FD9\u662F\u767B\u5F55\u9875daffa\n\t</div>\t\n\t"
    };
});
