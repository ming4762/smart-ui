define(["require", "exports", "./ApiService"], function (require, exports, ApiService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let warningShow = false;
    const loginPath = contextPath + 'login';
    const WARING_LOGIN_SHOW = 'warning_login_show';
    if (localStorage.getItem(WARING_LOGIN_SHOW) === null) {
        localStorage.setItem(WARING_LOGIN_SHOW, 'false');
    }
    const goLogin = (warning = true) => {
        const win = window.parent.parent;
        if (!!win['antd'] && warning) {
            if (localStorage.getItem(WARING_LOGIN_SHOW) === 'false') {
                localStorage.setItem(WARING_LOGIN_SHOW, 'true');
                win['antd'].Modal.warning({
                    title: '警告',
                    content: '登录超时，请重新登录！',
                    keyboard: false,
                    onOk: () => {
                        sessionStorage.clear();
                        localStorage.setItem(WARING_LOGIN_SHOW, 'false');
                        win.location.href = loginPath;
                    }
                });
            }
        }
        else {
            sessionStorage.clear();
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
        static validateLogin(warning = true) {
            return this.postAjax('auth/isLogin')
                .then(data => {
                if (!data) {
                    goLogin(warning);
                }
                else {
                    return data;
                }
            }).catch(error => {
                console.error(error);
                goLogin(warning);
            });
        }
    }
    exports.default = DataApiService;
    DataApiService.errorHandler = null;
});
