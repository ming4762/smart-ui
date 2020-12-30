define(["require", "exports", "js/common/utils/DataApiService", "./SystemUtils"], function (require, exports, DataApiService_1, SystemUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApiOperation {
        static logout() {
            SystemUtils_1.default.enableLoading(true);
            return DataApiService_1.default.postAjax('auth/logout')
                .finally(() => {
                SystemUtils_1.default.enableLoading(false);
                sessionStorage.clear();
                window.parent.parent.location.href = contextPath + 'ui/login';
            });
        }
    }
    exports.default = ApiOperation;
});
