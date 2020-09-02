define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var API_URL_KEY = 'API_URL';
    var STORE_TOKEN_KEY = 'SMART_AUTHORIATION';
    var TOKEN_KEY = 'Authorization';
    function getApiUrl() {
        return localStorage.getItem(API_URL_KEY) || '/';
    }
    var API_SERVICE = axios.create({
        baseURL: getApiUrl(),
        timeout: 100000
    });
    var ApiService = (function () {
        function ApiService() {
        }
        ApiService.getApiUrl = function () {
            return getApiUrl();
        };
        ApiService.getToken = function () {
            return sessionStorage.getItem(STORE_TOKEN_KEY);
        };
        ApiService.ajax = function (url, ajaxType, parameter, customParameter) {
            var serverParameter = Object.assign({
                method: ajaxType,
                url: url,
                data: parameter || {},
                headers: {},
                validateStatus: function (status) { return status >= 200 && status < 300; },
            }, customParameter);
            var token = this.getToken();
            if (token) {
                serverParameter.headers[TOKEN_KEY] = token;
            }
            return API_SERVICE(serverParameter)
                .then(function (result) {
                return result;
            });
        };
        ApiService.postAjax = function (url, parameter, customParameter) {
            return this.ajax(url, this.POST, parameter, customParameter);
        };
        ApiService.getAjax = function (url, parameter, customParameter) {
            return this.ajax(url, this.GET, parameter, customParameter);
        };
        ApiService.POST = 'POST';
        ApiService.GET = 'GET';
        return ApiService;
    }());
    exports.default = ApiService;
});
