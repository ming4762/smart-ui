define(["require", "exports", "./ApiService"], function (require, exports, ApiService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DataApiService {
        static postAjax(url, parameter, customParameter) {
            return ApiService_1.default.postAjax(url, parameter, customParameter)
                .then(result => {
                return result.data;
            });
        }
    }
    exports.default = DataApiService;
});
