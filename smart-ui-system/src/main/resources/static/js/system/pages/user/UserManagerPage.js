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
define(["require", "exports", "js/common/utils/ModuleLoader", "js/common/PageBuilder", "js/common/utils/ApiService"], function (require, exports, ModuleLoader_1, PageBuilder_1, ApiService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserManagerPage = (function (_super) {
        __extends(UserManagerPage, _super);
        function UserManagerPage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UserManagerPage.prototype.init = function () {
            var _this = this;
            ModuleLoader_1.default(['vue-ant-table']).then(function () {
                _this.initVue();
            });
        };
        UserManagerPage.prototype.build = function () {
            return page;
        };
        return UserManagerPage;
    }(PageBuilder_1.default));
    exports.default = UserManagerPage;
    var page = {
        data: function () {
            return {
                columns: [
                    {
                        label: '用户名',
                        prop: 'username'
                    }
                ],
                apiService: ApiService_1.default
            };
        },
        template: "\n\t<div style=\"padding: 10px; background:  rgba(0, 21, 41, 0.08)\" >\n      <div style=\"height: 1000px; background: white; overflow:auto\">\n          <s-table-crud\n          \t:keys=\"['userId']\"\n\t          size=\"middle\"\n            showIndex\n\t          :api-service=\"apiService\"\n            query-url=\"sys/user/list\"\n            text-row-button\n\t          :bordered=\"false\"\n            :columns=\"columns\"></s-table-crud>\n      </div>\t\n\t</div>\n\t"
    };
});
