define(["require", "exports", "js/common/utils/DataApiService"], function (require, exports, DataApiService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApiOperation {
        static logout() {
            return DataApiService_1.default.postAjax('auth/logout')
                .finally(() => {
                sessionStorage.clear();
                window.parent.parent.location.href = contextPath + 'ui/system/login';
            });
        }
    }
    exports.default = ApiOperation;
});
