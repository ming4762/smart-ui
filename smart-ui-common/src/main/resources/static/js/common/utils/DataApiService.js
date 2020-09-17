define(["require", "exports", "./ApiService"], function (require, exports, ApiService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataApiService = (function () {
        function DataApiService() {
        }
        DataApiService.postAjax = function (url, parameter, customParameter) {
            return ApiService_1.default.postAjax(url, parameter, customParameter)
                .then(function (result) {
                return result.data;
            });
        };
        return DataApiService;
    }());
    exports.default = DataApiService;
});
