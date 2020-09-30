define(["require", "exports", "./ApiService"], function (require, exports, ApiService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let warningShow = false;
    const loginPath = contextPath + 'ui/system/login';
    const goLogin = () => {
        const win = window.parent.parent;
        if (!!win['antd']) {
            if (!warningShow) {
                warningShow = true;
                win['antd'].Modal.warning({
                    title: '警告',
                    content: '登录超时，请重新登录！',
                    keyboard: false,
                    onOk: () => {
                        warningShow = false;
                        win.location.href = loginPath;
                    }
                });
            }
        }
        else {
            win.location.href = loginPath;
        }
    };
    const errorHandler = (error) => {
        if (!!error && error.code === 401) {
            goLogin();
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
                    return this.errorHandler(error);
                }
                else {
                    return Promise.reject(error);
                }
            });
        }
        static init401ErrorHandler() {
            this.errorHandler = errorHandler;
        }
        static validateLogin() {
            this.postAjax('auth/isLogin')
                .then(data => {
                if (!data) {
                    goLogin();
                }
            }).catch(error => {
                goLogin();
            });
        }
    }
    exports.default = DataApiService;
    DataApiService.errorHandler = null;
});
