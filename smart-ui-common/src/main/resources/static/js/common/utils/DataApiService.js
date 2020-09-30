define(["require", "exports", "./ApiService"], function (require, exports, ApiService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const errorHandler = (error) => {
        if (!!error && error.code === 401) {
            if (!!window['antd']) {
                window['antd'].Modal.warning({
                    title: '警告',
                    content: '登录超时，请重新登录！',
                    keyboard: false,
                    onOk: () => {
                        window.location.href = contextPath + 'ui/system/login';
                    }
                });
            }
            else {
                window.location.href = contextPath + 'ui/system/login';
            }
        }
        else {
            return Promise.reject(error);
        }
    };
    class DataApiService {
        static postAjax(url, parameter, customParameter) {
            return ApiService_1.default.postAjax(url, parameter, customParameter)
                .then(result => {
                return result.data;
            }).catch(error => {
                if (!!this.errorHandler) {
                    this.errorHandler(error);
                }
                else {
                    return Promise.reject(error);
                }
            });
        }
        static init401ErrorHandler() {
            this.errorHandler = errorHandler;
        }
    }
    exports.default = DataApiService;
    DataApiService.errorHandler = null;
});
