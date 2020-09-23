define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const API_URL_KEY = 'API_URL';
    const STORE_TOKEN_KEY = 'SMART_AUTHORIATION';
    const TOKEN_KEY = 'Authorization';
    function getApiUrl() {
        return localStorage.getItem(API_URL_KEY) || '/';
    }
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
    const API_SERVICE = axios.create({
        baseURL: getApiUrl(),
        timeout: 100000
    });
    class ApiService {
        static getApiUrl() {
            return getApiUrl();
        }
        static getToken() {
            return sessionStorage.getItem(STORE_TOKEN_KEY);
        }
        static saveToken(token) {
            sessionStorage.setItem(STORE_TOKEN_KEY, token);
        }
        static ajax(url, ajaxType, parameter, customParameter) {
            const serverParameter = Object.assign({
                method: ajaxType,
                url: url,
                data: parameter || {},
                headers: {},
                validateStatus: (status) => status >= 200 && status < 300,
            }, customParameter);
            const token = this.getToken();
            if (token) {
                serverParameter.headers[TOKEN_KEY] = token;
            }
            return API_SERVICE(serverParameter)
                .then((result) => {
                const data = result.data;
                if (data.success === false) {
                    return Promise.reject(data);
                }
                return result.data;
            });
        }
        static postAjax(url, parameter, customParameter) {
            return this.ajax(url, this.POST, parameter, customParameter);
        }
        static getAjax(url, parameter, customParameter) {
            return this.ajax(url, this.GET, parameter, customParameter);
        }
    }
    exports.default = ApiService;
    ApiService.POST = 'POST';
    ApiService.GET = 'GET';
});
