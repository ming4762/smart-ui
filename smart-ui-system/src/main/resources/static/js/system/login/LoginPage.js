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
    var LoginPage = (function (_super) {
        __extends(LoginPage, _super);
        function LoginPage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LoginPage.prototype.build = function () {
            return page;
        };
        return LoginPage;
    }(PageBuilder_1.default));
    exports.default = LoginPage;
    var page = {
        template: "\n    <div>\n        <span>\n            abc\n        </span>\n    </div>\n    "
    };
});
