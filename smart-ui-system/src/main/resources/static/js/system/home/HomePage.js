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
define(["require", "exports", "common/PageBuilder", "system/SysBus", "system/layout/BasicLayout"], function (require, exports, PageBuilder_1, SysBus_1, BasicLayout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HomePage = (function (_super) {
        __extends(HomePage, _super);
        function HomePage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HomePage.prototype.initPage = function () {
            window['busVue'] = SysBus_1.default();
            this.init();
        };
        HomePage.prototype.build = function () {
            return page;
        };
        return HomePage;
    }(PageBuilder_1.default));
    exports.default = HomePage;
    var page = {
        components: {
            BasicLayout: BasicLayout_1.default
        },
        template: "\n<div class=\"full-height\">\n    <BasicLayout/>\n</div>        \n    "
    };
});
